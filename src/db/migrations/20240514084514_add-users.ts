const users = [
  {
    name: 'admin user',
    email_id: 'admin@gmail.com',
    type: 'admin',
  },
  {
    name: 'joe bullard',
    email_id: 'joe@gmail.com',
    type: 'user',
  },
];

exports.up = async function (knex) {
  await knex('user').insert(users);
};

exports.down = async function (knex) {
  await knex.schema.dropTable('user');
};
