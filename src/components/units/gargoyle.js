Crafty.c('Gargoyle', {
  stats: {
    attack: 4,
    defense: 5,
    body: 3,
    mind: 4,
    moves: 6,
  },

  attributes: {
    monster: true,
    type: 'gargoyle',
    name: 'Gargoyle',
    flavor: 'stone given life by chaos magic, and resistant to every attack',
    owner: 'Zargon',
    controlledBy: 'Zargon'
  },

  init: function() {
    this.requires('Unit, NPC');

    this.addComponent('spr_gargoyle')
        .animate('PlayerMovingDown', 4, 8, 7)
        .animate('PlayerMovingLeft', 4, 9, 7)
        .animate('PlayerMovingRight', 4, 10, 7)
        .animate('PlayerMovingUp', 4, 11, 7);
  }
});
