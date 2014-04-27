/*
 * SPELLBOOK
 *
 * This is a subclass of the 'Slots component'.
 * It defines all the schools the unit knows and and what
 * spells are included in each.
**/
Crafty.c('SpellBook', {
  init: function() {
    this.requires('Slots');
    this.open = false;

    this.slots = {};
  },

  /*
   * Add spell schools to a unit's spellbook.
   *
   * @param {schools} Array strings representing the school components to add.
   * @return this
  **/

  addSchools: function(schools) {
    for (var ii = 0; ii < schools.length; ii++) {
      if (this.slots[schools[ii]]) {
        // The school has already been registered with this unit
        Crafty.console.writeLine('system', this.getAttribute('name') + ' already has that spell school.');
        continue;
      }

      this.slots[schools[ii]] = Crafty.e(schools[ii]);
    }

    return this;
  },

  /*
   * @param{spellData} Object:
   * name: spell name
   * school: spell school
  **/
  cast: function(spellData) {
    var spell = this.slots[spellData.school].spells[spellData.name];

    if (spell.hasBeenCast) {
      Crafty.console.writeLine('system', this.getAttribute('name') + ' has already cast ' + spell.name + '.');
    }

    // Tell the player turn component to inject the spell interface into the unit.
    this.trigger('oncast', {
      component: 'act',
      method: 'setSpell',
      interfaceList: ['UnitCastSpell'],
      args: [spell]
    });
  },

  // Make and return a copy of the spell entities.
  // TODO: may want to also return json copies of each of the spells as well.
  toJSON: function() {
    var schools = this.slots,
        spells = {};

    for (var school in schools) {
      spells[school] = [];

      for (var spell in schools[school].spells) {
        var currentSpell = schools[school].spells[spell];

        spells[school].push({
          'name': currentSpell.name,
          'id': currentSpell.id,
          'school': currentSpell.school
        });
      }
    }

    return spells;
  },

  set: function(attr, value) {
    if (typeof this[attr] === 'undefined') return false;

    this[attr] = value;

    this.trigger('change:' + attr, this);
  }
});
