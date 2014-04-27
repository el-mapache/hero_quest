Crafty.c('Zombie', {
  _attack: 2,
  _defense: 3,
  _body: 1,
  _mind: 0,
  _moves: 5,
  _type: 'undead',
  _monster: true,

  stats: {
    attack: 2,
    defense: 3,
    body: 1,
    mind: 0,
    moves: 5,
  },

  attributes: {
    monster: true,
    type: 'undead',
    name: 'Zombie',
    flavor: 'mindless walking corpses that carry the stench of undeath',
    owner: 'Zargon',
    controlledBy: 'Zargon'
  },

  init: function() {
    this.requires('Unit, NPC');

    this.addComponent('spr_zombie')
        .animate('PlayerMovingDown', 6, 4, 9)
        .animate('PlayerMovingLeft', 6, 5, 9)
        .animate('PlayerMovingRight', 6, 6, 9)
        .animate('PlayerMovingUp', 6, 7, 9);
  }
});
