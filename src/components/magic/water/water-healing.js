Crafty.c('WaterOfHealing', {
  init: function() {
    // Type of spell.
    this.school = 'Water';

    // Has the spell been cast already?
    this.used = false;

    this.name = 'Water Of Healing';

    this.id = "WaterOfHealing";

    // Type indicates targeted or area spell.
    this.type = 'target';
    this.restriction = false;
    // Duration indicates if the spell effect is persistant or not.
    this.duration = 'instant';

    this.effectType = 'elemental';
    this.description = 'This spell may be cast on any one hero. A rain of soothing water washes over the target, restoring 4 body points. This spell will not grant a hero more body points than their starting number.';
  },

  cast: function(target) {
    if (target.getAttribute('monster')) {
      Crafty.console.writeLine('system', target.getAttribute('name') + ' cannot be targeted by ' + this.name);
      return false;
    }

    Crafty.console.writeLine('system', this.name + ' cast upon ' + target.getAttribute('name') + '.');

    this.used = true;
    target.trigger('Heal', 4);

    return true;
  },
});
