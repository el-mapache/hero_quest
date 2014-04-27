



Crafty.c('Inventory', {  
  init: function() {
    // Alias this to make it really clear what's going on
    var Inventory = this;

    Inventory.requires('Slots');

    Inventory.bind('AddToInventory', function(item) {
      // This seems to autoverwrite the last item in the slots.  Maybe not a good idea
      if(Inventory._isFull) Inventory.remove();

      Inventory.add(item, 'slots');
    });
  }
});

/* 
 * Override slotted component methods setCapactiy and isFull
 * so characters can maintain separate capacities for each.
 *
*/
Crafty.c('Weapons', {
  weapons: [],
  activeWeapon: null,
  
  init: function() {
    var capacity = 2
    this.requires('Slots');
    
    this.setCapacity = function(capacity) {
      capacity = capacity;
    };

    this._isFull = function(slots) {
      var container = typeof slots === undefined ? this.weapons : this[slots];
      return container.length === capacity;
    }
  },
  
  setDefaultWeapon: function(weapon) {
    this.activeWeapon = weapon;
    this.weapons.push(weapon);
    this.addComponent(this.activeWeapon);
  },
  
  useWeapon: function(slot) {
    if(this.activeWeapon !== null) this.removeComponent(this.activeWeapon);
  
    this.activeWeapon = this.slots[slot];
    this.addComponent(this.activeWeapon);
  },
  
  disarm: function() {
    this.removeComponent(this.activeWeapon);
    this.activeWeapon = null;
  }
});

/* 
 * Generic component for any slotted object, such as the contents of 
 * a character's backpack or the available weapons they are carrying.
 *
*/
Crafty.c('Slots', {
  slots: [],
  
  init: function() {
    var capactiy = 6
    
    this.setCapacity = function(capacity) {
      capacity = capacity;
    };
    
    this._isFull = function(slots) {
      var container = typeof slots === 'undefined' ? this.slots : this[slots];
      return container.length === capacity;
    }
  },

  add: function(item, slots) {
    if(!this._isFull(slots)) {
      this[slots].push(item);
    } else {
      console.log('Sorry, you cannot carry any more.');
    }
  },

  remove: function(item, slots) {
    return typeof item === 'undefined' ? this[slots].pop() :
           this[slots].slice(this[slots].indexOf(item),1);
  },

  all: function(slots) {
    return this[slots];
  }

});

Crafty.c('Equipment', {
  shield: null,
  helmet: null,
  chest: null,
  hands: null,
  feet: null,
  
  equip: function(item,type) {
    var oldGear = null;
    
		// If the equipment type doesn't exist, return false
    if(this[type] === undefined) return false;
    
    // If the character already has an item in the slot, update the slot
    // and signal the inventory to accept an item
    if(this[type] !== null) this.unequip(this[type]);
    
    this[type] = item;
    this.addComponent(item);
  },
  
  unequip: function(gear) {
    this.removeComponent(gear,true);
    this.trigger('AddToInventory', gear);
  }
});

Crafty.c('Broadsword', {
  _USABLE_BY: {
    'Babarian': true,
    'Dwarf': true,
    'Elf': true,
    'Wizard': false
  },
  
  init: function() {
    var unmodifiedAttack = this.__attack;
    
    this.__attack += 1;
    this.bind('RemoveComponent', function(id) {
      this.__attack = unmodifiedAttack;
    });
  },

  canUse: function(unitType) {
    return unitType in _USABLE_BY;
  }
});