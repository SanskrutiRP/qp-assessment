exports.up = async function (knex) {
  await knex.schema
    .createTable('order', (table) => {
      table
        .uuid('public_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'));
      table
        .uuid('user_id')
        .references('public_id')
        .inTable('user')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('order_details', (table) => {
      table
        .uuid('public_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'));
      table
        .uuid('order_id')
        .references('public_id')
        .inTable('order')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
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
  await knex.schema.dropTable('order').dropTable('order_details');
};
