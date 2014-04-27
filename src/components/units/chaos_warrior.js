Crafty.c('ChaosWarrior', {
  stats: {
    attack: 4,
    defense: 4,
    body: 3,
    mind: 3,
    moves: 7,
  },

  attributes: {
    monster: true,
    type: 'human',
    name: 'Chaos Warrior',
    flavor: 'zargon\'s elite warriors, mortal men infused with chaos magic',
    owner: 'Zargon',
    controlledBy: 'Zargon'
  },

  init: function() {
    this.requires('Unit, NPC');

    this.addComponent('spr_chaos_warrior')
        .animate('PlayerMovingDown', 2, 8, 3)
        .animate('PlayerMovingLeft', 2, 9, 3)
        .animate('PlayerMovingRight', 2, 10, 3)
        .animate('PlayerMovingUp', 2, 11, 3);
  }
});
