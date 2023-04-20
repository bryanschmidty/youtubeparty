import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ValidateRoomCreation {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const roomSchema = schema.create({
      name: schema.string({ trim: true }, [rules.minLength(4)]),
      description: schema.string.optional({ trim: true }),
      private: schema.boolean.optional(),
      anonymous: schema.boolean.optional(),
    })

    const { request } = ctx
    const payload = await request.validate({ schema: roomSchema })

    request.updateBody(payload)
    await next()
  }
}
