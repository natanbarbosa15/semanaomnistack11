exports.up = function (knex) {
  return knex.schema.createTable("ongs", function (table) {
    table.string("id").primary();
    table.string("name", 80).notNullable();
    table.string("email", 254).notNullable();
    table.string("whatsapp", 14).notNullable();
    table.string("cep", 9).notNullable();
    table.string("city", 64).notNullable();
    table.string("state", 2).notNullable();
    table.string("neighborhood", 254).notNullable();
    table.string("street", 254).notNullable();
    table.string("streetNumber", 64).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("ongs");
};
