Crafty.c('RockSkin',{
  init: function() {
    this.school = 'Earth';
    this.used = false;
    this.name = 'Rock Skin';
    this.id = 'RockSkin';
    this.type = 'target';
    this.restriction = 'hero';
    this.duration = 'persistant';
    this.effectType = 'elemental';
    this.description = 'This spell may be cast on any hero, including yourself. That hero gains a +1 bonus to defense. The spell is broken when the hero suffers 1 body point of damage.'
  },

  cast: function(target) {
    if (target.getAttribute('monster')) {
      Crafty.console.writeLine('system', 'Only heroes may be targeted by ' + this.name);
      return false;
    }

    // Store these in scope for the callback.
    var id = this.id,
        name = this.name;

    // Add the modifier to the modifiers table in the stats object
    target.stats.addModifier(this.id, this.modifier());

    // This spell is removed when a trigger condition is met, in this case when the unit
    // takes damage.
    target.addEVentHook('TakeDamage', function() {
      Crafty.console.writeLine('system', name + ' has been removed from ' + target.getAttribute('name'));
      target.stats.removeModifier(id);
    });

    Crafty.console.writeLine('system', this.name + " cast upon " + target.getAttribute('name') + ".");

    // Mark this spell as cast.
    this.used = true;

    return true;
  },

  modifier: function() {
    return {
      add: {
        'defense': 1
      }
    };
  }
});
