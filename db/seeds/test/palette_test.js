
exports.seed = function(knex, Promise) {
  return knex('color_palettes').del()
    .then(() => knex('projects').del())
    .then(() => Promise.all([
      knex('projects').insert([
        {title: 'test project'}
      ], 'id')
      .then(project => {
        return knex('color_palettes').insert([
          {
            title: 'some palette',
            color0: 'black',
            color1: 'black',
            color2: 'black',
            color3: 'black',
            color4: 'black',
            project_id: project[0]
          }
        ])
      })
    ]))
    .catch(error => console.log({error}));
};
