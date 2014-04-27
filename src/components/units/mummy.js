Crafty.c('Mummy', {
  stats: {
    attack: 3,
    defense: 4,
    body: 2,
    mind: 0,
    moves: 4,
  },

  attributes: {
    monster: true,
    type: 'undead',
    name: 'Mummy',
    flavor: 'preserved via lost arts, they retain strength in undeath',
    owner: 'Zargon',
    controlledBy: 'Zargon'
  },

  init: function() {
    this.requires('Unit, NPC');

    this.addComponent('spr_mummy')
        .animate('PlayerMovingDown', 0, 8, 3)
        .animate('PlayerMovingLeft', 0, 9, 3)
        .animate('PlayerMovingRight', 0, 10, 3)
        .animate('PlayerMovingUp', 0, 11, 3);
  }
});
