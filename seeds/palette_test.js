exports.seed = function(knex, Promise) {
  return knex('color_palettes').del()
    .then(() => knex('projects').del())
    .then(() =>
      Promise.all([knex('projects').insert([
        {title: 'first'},
        {title: 'second'}
      ], 'id')
        .then(projects =>
          knex('color_palettes').insert([
            {id: 1, color0: '#ff0066', color1: '#000000', color2: '#ff00cc', color3: '#ff0099', color4:'#D50C48'},
            {id: 2, color0: '#FFFFFF', color1: '#000000', color2: '#ff00cc', color3: '#ff0099', color4:'#D50C48'},
            {id: 3, color0: '#000000', color1: '#000000', color2: '#ff00cc', color3: '#ff0099', color4:'#D50C48'}
          ])
        .catch(error => console.log(`Error seeding data: ${error}`))
        )
      ])
    );
};
