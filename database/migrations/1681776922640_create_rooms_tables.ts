import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('description')
      table.boolean('private').defaultTo(false)
      table.boolean('anonymous').defaultTo(false)
      table.string('invite_code')
      table.timestamps(true)
      table.dateTime("deleted_at").defaultTo(null);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
