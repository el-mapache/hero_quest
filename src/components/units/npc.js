/*
 * NPC
 *
 * Extremely simple component to restrict NPC actions.
 * All NPC classes (ie controlled by Zargon), need to implement this.
 *
**/

Crafty.c('NPC', {
  init: function() {
    this.npc = true
    this.restrictions = ['search', 'inventory', 'disarm', 'castSpell'];
  }
});
