import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Room from "App/Models/Room";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string | null

  @column()
  public googleId: string | null

  @column()
  public name: string

  @column()
  public avatar: string | null

  @column()
  public accessToken: string

  @column()
  public isVerified: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Room, {
    foreignKey: 'userId',
  })
  public rooms: HasMany<typeof Room>
}
