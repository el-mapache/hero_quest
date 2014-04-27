Crafty.c('Dwarf', {
  _attack: 2,
  _defense: 2,
  _body: 7,
  _mind: 3,
  _moves: "2",
  _type: 'dwarf',
  restrictions: ['castSpell'],

  stats: {
    attack: 2,
    defense: 2,
    body: 7,
    mind: 3,
    moves: "2"
  },

  attributes: {
    type: 'dwarf',
    name: 'Dwarf',
    flavor: 'you are the dwarf, a hale and hardy adventurer',
    monster: false,
    owner: 'The Right Honorable Sir Pennyfarthing',
    controlledBy: 'The Right Honorable Sir Pennyfarthing'
  },

  init: function() {
    this.requires('Unit');

    this.addComponent('spr_dwarf')
        .animate('PlayerMovingDown', 0, 0, 2)
        .animate('PlayerMovingLeft', 0, 1, 2)
        .animate('PlayerMovingRight', 0, 2, 2)
        .animate('PlayerMovingUp', 0, 3, 2);
  }
});
