Crafty.c('Goblin', {
  stats: {
    attack: 2,
    defense: 1,
    body: 1,
    mind: 1,
    moves: 10,
  },

  attributes: {
    monster: true,
    type: 'orc',
    name: 'Goblin',
    flavor: 'lacking in strength and size, unparalled in speed and ferocity',
    owner: 'Zargon',
    controlledBy: 'Zargon'
  },

  init: function() {
    this.requires('Unit, NPC');

    this.addComponent('spr_goblin')
        .animate('PlayerMovingDown', 6, 0, 9)
        .animate('PlayerMovingLeft', 6, 1, 9)
        .animate('PlayerMovingRight', 6, 2, 9)
        .animate('PlayerMovingUp', 6, 3, 9);
  }
});
