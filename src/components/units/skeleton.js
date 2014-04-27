Crafty.c('Skeleton', {
  _attack: 2,
  _defense: 2,
  _body: 1,
  _mind: 0,
  _moves: 6,
  _type: 'undead',
  _monster: true,
  _flavor: "relentless warrior in the army of the undead",

  stats: {
    attack: 2,
    defense: 2,
    body: 1,
    mind: 0,
    moves: 6,
  },

  attributes: {
    monster: true,
    type: 'undead',
    name: 'Skeleton',
    flavor: 'a relentless warrior in the army of the undead',
    owner: 'Zargon',
    controlledBy: 'Zargon'
  },

  init: function() {
    this.requires('Unit, NPC');

    this.addComponent('spr_skeleton')
        .animate('PlayerMovingDown',4, 4, 7)
        .animate('PlayerMovingLeft',4, 5, 7)
        .animate('PlayerMovingRight', 4, 6, 7)
        .animate('PlayerMovingUp', 4, 7, 7);
  }
});
