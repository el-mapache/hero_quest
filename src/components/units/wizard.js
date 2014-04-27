Crafty.c('Wizard', {
  _attack: 1,
  _defense: 2,
  _body: 4,
  _mind: 6,
  _moves: '2',
  _type: 'human',
  _magicUser: true,

  stats: {
    attack: 1,
    defense: 2,
    body: 4,
    mind: 6,
    moves: '2',
  },

  attributes: {
    type: 'human',
    name: 'Wizard',
    flavor: 'you are the wizard, a mage of incomparable power.',
    monster: false,
    owner: 'The Right Honorable Sir Pennyfarthing',
    controlledBy: 'The Right Honorable Sir Pennyfarthing'
  },

  init: function() {
    this.requires('Unit, Magic');

    this.addComponent('spr_wizard')
        .animate('PlayerMovingDown', 2, 0, 2)
        .animate('PlayerMovingLeft', 2, 1, 2)
        .animate('PlayerMovingRight', 2, 2, 2)
        .animate('PlayerMovingUp', 2, 3, 2);

    this.spellbook.addSchools(['Fire', 'Water']);
  }
});
