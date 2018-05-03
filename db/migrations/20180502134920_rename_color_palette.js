exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('color-palettes', 'color_palettes')
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('color-palettes', 'color_palettes')
  ]);
};
