
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', function(table) {
      table.increments('id').primary();
      table.string('title');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('color-palettes', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('colorOne');
      table.string('colorTwo');
      table.string('colorThree');
      table.string('colorFour');
      table.string('colorFive');
      table.integer('project_id').unsigned()
      table.foreign('project_id')
        .references('projects.id');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('color-palettes'),
    knex.schema.dropTable('projects')
  ]);
};
