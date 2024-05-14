exports.up = async function (knex) {
  await knex.schema
    .createTable('user', (table) => {
      table
        .uuid('public_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'));
      table.string('name').notNull();
      table.string('email_id').notNull();
      table.enum('type', ['admin', 'user']);
      table.timestamps(true, true);
    })
    .createTable('grocery', (table) => {
      table
        .uuid('public_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'));
      table.string('name').unique().notNull();
      table.enum('category', [
        'fruits',
        'vegetables',
        'dairy',
        'snacks',
        'meats',
        'other',
      ]);
      table.string('description');
      table.decimal('price', 6, 2).notNull();
      table.timestamps(true, true);
    })
    .createTable('inventory', (table) => {
      table
        .uuid('public_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'));
      table
        .uuid('grocery_id')
        .references('public_id')
        .inTable('grocery')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('quantity').notNull();
      table.timestamps(true, true);
    });
};

exports.down = async function (knex) {
  await knex.schema
    .dropTable('user')
    .dropTable('grocery')
    .dropTable('inventory');
};
