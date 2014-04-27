/*
 * Defines a super basic item component. Basically abstract.
**/
Crafty.c('Item', {
  init: function() {
    this.quantity = 0;
    this.maxQuantity = 0;
    this.name = null;
    this.desc = null;
    this.consumable = null;
    this.equippable = null;
    this.id = null;
  },

  generateId: function(prefix) {
    this.id = prefix + (HeroQuest.maths.random() | 0);
  }
});

Crafty.c('Potion', {
  init: function() {
    this.requires('Item');
    this.maxQuantity = 3;
    this.consumable = true;
  }
});

Crafty.c('HealingPotion', {
  init: function() {
    this.requires('Potion');
    this.id = 'PtnHeal';
    this.name = 'Healing Potion';
    this.desc = 'Restores 1d6 body points to the imbiber.'
    this.quantity = 1;
  },

  drink: function(unit) {
    Crafty.console.writeLine('system', unit.getAttribute('name') + ' drinks the ' + this.name);
    unit.heal((Math.random() * 6 + 1) | 0);
    this.destroy();
  }
});

Crafty.c('HeroismPotion', {
  init: function() {
    this.requires('Potion');
    this.name = 'Potion of Heroism';
    this.id = 'PtnHero';
    this.desc = 'Allows the imbiber to attack twice during their next attack.'
    this.quantity = 1;
  },

  drink: function(unit) {
    Crafty.console.writeLine('system', unit.getAttribute('name') + ' drinks the ' + this.name);
    unit.addEventHook('AfterAttack', function() {
      unit.secondAction = 'attack';
    });

    this.destroy();
  }
});

Crafty.c('StrengthPotion', {
  init: function() {
    this.requires('Potion');
    this.name = 'Potion of Strength';
    this.id = 'PtnAtck';
    this.desc = 'Allows the imbiber to add 2 extra dice to their next attack roll.'
    this.quantity = 1;
  },

  drink: function(unit) {
    var id = this.id;

    function add() {
      unit.stats.addModifier(id, {
        add: {
          'attack': 2
        }
      });

      // Ensure that this won't keep getting called before every attack.
      unit.unbind('BeforeAttack', add);
    }

    function remove() {
      unit.stats.removeModifier(id);
      // Make sure to remove this check after an attack.
      unit.unbind('AfterAttack', remove);
    }

    Crafty.console.writeLine('system', unit.getAttribute('name') + ' drinks the ' + this.name);
    unit.addEventHook('BeforeAttack', add);
    unit.addEventHook('AfterAttack', remove);

    this.destroy();
  }
});

Crafty.c('DefensePotion', {
  init: function() {
    this.requires('Potion');
    this.name = 'Potion of Defense';
    this.id = 'PtnDef';
    this.desc = 'Allows the imbiber to add 2 extra dice to their next defense roll.'
    this.quantity = 1;
  },

  drink: function(unit) {
    var id = this.id;

    function add() {
      unit.stats.addModifier(id, {
        add: {
          'defense': 2
        }
      });

      unit.unbind('BeforeDefend', add);
    }

    function remove() {
      unit.stats.removeModifier(id);
      unit.unbind('AfterAttack', remove);
    }

    Crafty.console.writeLine('system', unit.getAttribute('name') + ' drinks the ' + this.name);
    unit.addEventHook('BeforeAttack', add);
    unit.addEventHook('AfterAttack', remove);

    this.destroy();
  }
});

// TODO this should almost certainly be changed
Crafty.c('ResistancePotion', {
  init: function() {
    this.requires('Potion');
    this.name = 'Potion of Magic Resistance';
    this.id = 'PtnMgRes';
    this.desc = 'Allows imbiber to ignore the effect of the next spell cast upon them.'
    this.quantity = 1;
  },

  drink: function(unit) {
    unit['hasResistance'] = function() {
      delete unit['hasResistance'];
      return true;
    };

    this.destroy();
  }
});
