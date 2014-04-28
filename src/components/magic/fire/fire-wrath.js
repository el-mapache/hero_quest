Crafty.c('FireOfWrath', {
  init: function() {
    // Type of spell.
    this.school = 'Fire';

    // Has the spell been cast already?
    this.used = false;

    this.name = 'Fire Of Wrath';

    this.id = "FireOfWrath";
    // Type indicates targeted or area spell.
    this.type = 'target';
    this.restriction = false;
    // Duration indicates if the spell effect is persistant or not.
    this.duration = 'instant';
    this.effectType = 'elemental';
    this.description = 'This spell may be case on any one monster, blasting them with flames. The monster must make a saving throw of six or immediately suffer 1 body point of damage.';
  },

  cast: function(target) {
    if (!target.getAttribute('monster')) {
      Crafty.console.log('system', target.getAttribute('name') + ' cannot be targeted by ' + this.name);
      return false;
    }
    this.used = true;

    // The target rolled a six and thus saved.
    // Maybe move this into the character?
    if ((Math.random() * 6 + 1 | 0) === 6) {
      Crafty.console.writeLine('system', target.getAttribute('name') + ' resisted your spell!');
      return true;
    }

    Crafty.console.writeLine('system', this.name + ' cast upon ' + target.getAttribute('name'));

    target.trigger('TakeDamage', -1);

    return true;
  },
});
