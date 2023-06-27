import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from './User'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public private: boolean

  @column()
  public anonymous: boolean

  @column()
  public inviteCode: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null})
  public deletedAt: DateTime

  @belongsTo(() => User)
  public host: BelongsTo<typeof User>

  @beforeCreate()
  public static async generateId(room: Room) {
    room.id = uuidv4()
  }
}
