
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('color_palettes', function (table) {
      table.renameColumn('colorOne', 'color0')
      table.renameColumn('colorTwo', 'color1')
      table.renameColumn('colorThree', 'color2')
      table.renameColumn('colorFour', 'color3')
      table.renameColumn('colorFive', 'color4')
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('color_palettes', function (table) {
      table.renameColumn('colorOne', 'color0')
      table.renameColumn('colorTwo', 'color1')
      table.renameColumn('colorThree', 'color2')
      table.renameColumn('colorFour', 'color3')
      table.renameColumn('colorFive', 'color4')
    })
  ]);
};
