Crafty.c('Barbarian', {
  restrictions: ['castSpell'],

  stats: {
    attack: 3,
    defense: 2,
    body: 7,
    mind: 2,
    moves: '2',
  },

  attributes: {
    type: 'human',
    name: 'Barbarian',
    flavor: 'you are the barbarian, the greatest warrior of all.',
    owner: 'The Right Honorable Sir Pennyfarthing',
    controlledBy: 'The Right Honorable Sir Pennyfarthing'
  },

  init: function() {
    this.requires('Unit');
    this.addComponent('spr_barbarian')
        .animate('PlayerMovingUp', 0, 3, 2)
        .animate('PlayerMovingRight', 0, 2, 2)
        .animate('PlayerMovingDown',0, 0, 2)
        .animate('PlayerMovingLeft',0, 1, 2);
  }
});
