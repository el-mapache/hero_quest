/*
 * Water SCHOOL
 *
 * Component representing the 'Water' school of spells.
 *
 * Collection component that has a number of spells. Added to a spellbook component
 * for organizational purposes.
**/
Crafty.c('Water', {
  name: 'Water',

  init: function() {
    this.spells = {
      'VeilOfMist': Crafty.e('VeilOfMist'),
      'WaterOfHealing': Crafty.e('WaterOfHealing'),
      'Sleep': Crafty.e('Sleep')
    }
  },

  cast: function(caster, spell, target) {
    if (!this.spells[spell]) {
      Crafty.console.writeLine('system', 'This unit doesn\'t know that spell.');
    }

    if (this.spell[spell].used) {
      Crafty.console.writeLine('system', spell + ' has already been cast.');
    }

    this.spells[spell].cast(target);
  }
 });
