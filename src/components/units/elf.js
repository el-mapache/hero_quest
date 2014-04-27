Crafty.c('Elf', {
  _attack: 2,
  _defense: 2,
  _body: 6,
  _mind: 4,
  _moves: '2',
  _type: 'elf',
  _name: 'Elf',
  _flavor: 'you are the elf, a master of magic and combat both.',

  stats: {
    attack: 2,
    defense: 2,
    body: 6,
    mind: 4,
    moves: '2',
  },

  attributes: {
    type: 'elf',
    name: 'Elf',
    flavor: 'you are the elf, a master of magic and combat both.',
    monster: false,
    owner: 'The Right Honorable Sir Pennyfarthing',
    controlledBy: 'The Right Honorable Sir Pennyfarthing'
  },

  init: function() {
    this.requires('Unit, Magic');

    this.addComponent('spr_elf')
        .animate('PlayerMovingDown', 4, 0, 7)
        .animate('PlayerMovingLeft', 4, 1, 7)
        .animate('PlayerMovingRight', 4, 2, 7)
        .animate('PlayerMovingUp', 4, 3, 7);

    this.spellbook.addSchools(['Earth']);
  }
});
