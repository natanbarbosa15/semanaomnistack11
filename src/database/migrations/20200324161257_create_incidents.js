exports.up = function (knex) {
  return knex.schema.createTable("incidents", function (table) {
    table.increments();

    table.string("title", 80).notNullable();
    table.string("description", 5242880).notNullable();
    table.decimal("value").notNullable();

    table.string("ong_id").notNullable();

    table.foreign("ong_id").references("id").inTable("ongs");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("incidents");
};
