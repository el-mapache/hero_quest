/*
 * LIFE
 *
 * Defines the body points interface.
 * Component binds an increment and decrement function on init, as well as s reference
 * to the original body point value.
 *
**/


Crafty.c('Life', {
  init: function() {
    this.bind('TakeDamage', this.damage);
    this.bind('Heal', this.heal);
  },

  maxLife: function() {
    return this.stats.getBaseStat('baseBody');
  },

  damage: function(amount) {
    this.stats.overrideBase({'body': this.stats.getBaseStat('body') + amount});

    Crafty.console.writeLine('system', this.getAttribute('name') + ' has lost '+ Math.abs(amount) + ' body points.');
    //TODO adjust stats
    // TODO trigger grizzly deaths if the character is really stomped?
    if(this.stats.getBaseStat('body') <= 0) {
      this.trigger('Death');
    }
  },

  heal: function(amount) {
    if ((this.stats.getBaseStat('body') + amount) > this.maxLife()) {
      this.stats.overrideBase({'body': this.maxLife()});
      Crafty.console.writeLine('system', this.getAttribute('name') + ' has been fully healed.');

      return;
    }

    this.stats.overrideBase({'body': this.getBaseStat('body') + amount });
    Crafty.console.writeLine('system', this.getAttribute('name') + ' had '+ amount + ' body points restored.');
  }
});
