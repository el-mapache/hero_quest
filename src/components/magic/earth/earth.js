/*
 * EARTH SCHOOL
 *
 * Component representing the 'Earth' school of spells.
 *
 * Collection component that has a number of spells. Added to a spellbook component
 * for organizational purposes.
**/
Crafty.c('Earth', {
  name: 'Earth',

  init: function() {
    this.spells = {
      'RockSkin': Crafty.e('RockSkin'),
      'PassThroughRock': Crafty.e('PassThroughWalls'),
      'HealBody': Crafty.e('HealBody')
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
