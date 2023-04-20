import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Ws from 'App/Services/Ws'
const axios = require('axios')

export default class AuthController {
  public async redirectToGoogle({ ally }: HttpContextContract) {
    return ally.use('google').redirect()
  }

  public async handleGoogleCallback({ ally, auth, response }: HttpContextContract) {
    const googleUser = await ally.use('google').user()

    if (googleUser) {
      let avatar;
      if (googleUser.avatarUrl) {
        const response = await axios.get(googleUser.avatarUrl, {
          responseType: 'arraybuffer',
        });
        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        avatar = `data:${response.headers['content-type']};base64,${base64}`;
      }

      let user = await User.firstOrCreate({
          email: googleUser.email,
      }, {
          googleId: googleUser.id,
          name: googleUser.name,
          avatar: avatar,
          isVerified: googleUser.emailVerificationState === 'verified',
      })

      if (googleUser.token) {
          user.accessToken = googleUser.token.token
          await user.save()
      }
      await auth.login(user)
      Ws.io.emit('news', { 'logged in': user.name })
      Ws.io.emit('my other event', { 'logged in': user.name })
      return response.redirect('/')
    } else {
        return response.status(401).send('Unauthorized')
    }
  }

  public async logout({auth, response}: HttpContextContract) {
    const user = auth.user
    await auth.logout()
    if (user) {
      Ws.io.emit('user-logout', user.googleId)
    }
    return response.redirect('/')
  }
}
