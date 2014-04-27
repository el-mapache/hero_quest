Crafty.c('Fimir', {
  stats: {
    attack: 3,
    defense: 3,
    body: 2,
    mind: 3,
    moves: 6,
  },

  attributes: {
    monster: true,
    type: 'orc',
    name: 'Fimir',
    flavor: 'strongest of the orc family, they lead their cousins to battle',
    owner: 'Zargon',
    controlledBy: 'Zargon'
  },

  init: function() {
    this.requires('Unit, NPC');

    this.addComponent('spr_fimir')
        .animate('PlayerMovingDown', 0, 4, 2)
        .animate('PlayerMovingLeft', 0, 5, 2)
        .animate('PlayerMovingRight', 0, 6, 2)
        .animate('PlayerMovingUp', 0, 7, 2);
  }
});
