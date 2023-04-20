// app/Controllers/Http/RoomsController.ts
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import crypto from 'crypto'

export default class RoomsController {
  public async create({ view }: HttpContextContract) {
    return view.render('rooms/create')
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const data:{
      name: string,
      description: string,
      private: boolean,
      anonymous: boolean,
      inviteCode?: string
    } = request.only(['name', 'description', 'private', 'anonymous'])

    try {
      const user = auth.user
      if (!user) {
        throw new Error('User not authenticated')
      }

      if (data.private) {
        data.inviteCode = crypto.randomBytes(4).toString('hex')
      }

      const room = await user.related('rooms').create(data)
      session.flash({ success: 'Room created successfully!' })
      response.redirect(`/rooms/${room.id}`)
    } catch (error) {
      session.flash({ error: error.message })
      response.redirect('back')
    }
  }
}
