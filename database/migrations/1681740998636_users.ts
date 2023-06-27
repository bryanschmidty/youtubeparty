import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('google_id', 255).nullable()
      table.string('name', 255).notNullable()
      table.text('avatar', 'longtext').nullable()
      table.string('access_token', 255).nullable()
      table.boolean('is_verified').defaultTo(false)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
