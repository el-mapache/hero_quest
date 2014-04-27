Crafty.c('Orc', {
  stats: {
    attack: 3,
    defense: 2,
    body: 1,
    mind: 2,
    moves: 8,
  },

  attributes: {
    monster: true,
    type: 'orc',
    name: 'Orc',
    flavor: 'clever rank and file soldiers, they delight in cruelty and slaughter',
    owner: 'Zargon',
    controlledBy: 'Zargon'
  },

  init: function() {
    this.requires('Unit, NPC');

    this.addComponent('spr_orc')
        .animate('PlayerMovingDown', 0, 12, 3)
        .animate('PlayerMovingLeft', 0, 13, 3)
        .animate('PlayerMovingRight', 0, 14, 3)
        .animate('PlayerMovingUp', 0, 15, 3);
  }
});
