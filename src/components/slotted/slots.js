function Slots(name) {
  this.capacity = 10;
  this.name = name;
  this.slots = {};
  this.isOpen = false;
  this.length = 0;
};

Slots.prototype.constructor = Slots;

Slots.prototype = {
  _isFull: function() {
    if (this.length === 0) return;

    var count = 0;

    TL.forEachIn(this.slots, function(slot) {
      count += slot.length;
    });

    return count === this.length;
  },

  // Item should be passed in the form of a Crafty object.
  add: function(item) {
    if (this._isFull()) {
      return this.isFullMessage();
    }

    // If there is no record of an item, create one a new one.
    //TODO switch around ifs to clean up this method.
    if (!this.slots[item.id]) {
      this.slots[item.id] = [[item]];
      this.length += 1;
    } else {
      for (var i = 0; i < this.slots[item.id].length; i++) {
        // Stack exists, and have space in it.
        if (this.slots[item.id][i].length < item.maxQuantity) {
          this.slots[item.id][i].push(item);
          return this;
        }
      }

      // Stack is full, make a new one.
      this.slots[item.id].push([item]);
      this.length += 1;
    }

    return this;
  },

  /*
   * Remove an item from the stack it's currently in.
   * @param{id} String the is of the item e.g. 'PtnHeal'
   * @param{stack} Number the stack the item is in.
   * @param{idx} Number the index of the item in the stack.
  **/
  remove: function(id, stack) {
    var toRemove = this.get(id, stack);

    if (this.slots[id][stack].length === 0) {
      // This stack is empty, so delete it.
      this.slots[id].splice(stack, 1);
      this.length -= 1;
    }

    if (this.slots[id].length === 0) {
      // Th final stack is empty, delete it and decrement the length.
      delete this.slots[id];
      this.length -= 1;
    }

    return this;
  },

  get: function(id, stack) {
    return this.slots[id][stack].pop();
  },

  all: function(slots) {
    return this.slots;
  },

  isFullMessage: function() {
    Crafty.console.writeLine('system', 'Your inventory is full, and you cannot carry another item.');
    return;
  },

  open: function() {
    this.isOpen = true;
  },

  close: function() {
    this.isOpen = false;
  },

  toJSON: function() {
    var output = [];

    for (var slot in this.slots) {
      for (var i = 0; i < this.slots[slot].length; i++) {
        output.push({
          id: slot,
          length: this.slots[slot][i].length,
          name: this.slots[slot][0][0].name,
          stack: i
        });
      }
    }

    return output;
  }
};
