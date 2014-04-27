Crafty.c('HealBody', {
  init: function() {
    // Type of spell.
    this.school = 'Earth';

    // Has the spell been cast already?
    this.used = false;

    this.name = 'Heal Body';

    this.id = "HealBody";
    // Type indicates targeted or area spell.
    this.type = 'target';
    this.restriction = false;
    // Duration indicates if the spell effect is persistant or not.
    this.duration = 'instant';
    this.effectType = 'elemental';
    this.description = 'Restore 4 body points to any target. This spell will not grant the target more then their maximum number of body points.';
  },

  cast: function(target) {
    if (typeof target.heal !== 'function') {
      Crafty.console.log('system', target.getAttribute('name') + ' cannot be targeted by ' + this.name);
      return false;
    }
    
    target.heal(4);

    Crafty.console.writeLine('system', this.name + ' cast upon ' + target.getAttribute('name') + '. Four body points were restored.');
    this.used = true;

    return true;
  },
});
