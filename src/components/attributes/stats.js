function Stats(stats) {
  this.base = {};
  this.modified = {};

  this._copy(stats);
}

Stats.prototype.constructor = Stats;

Stats.prototype._copy = function(stats) {
  for (var stat in stats) {
    if (stat === 'body') this.base['baseBody'] = stats[stat];
    this.base[stat] = stats[stat];
  }
};

// Override a base stat.  Useful for subclassing and for health.
Stats.prototype.overrideBase = function(stats) {
  for (var stat in stats) {
    this.base[stat] = stats[stat];
  }

  return this;
};

// Get a base stat.
Stats.prototype.getBaseStat = function(statID) {
  return this.base[statID];
};

/* Pass in the id of the modifier, i.e., 'MagicRing', and an object
 * in the form of 'modifierMethod': { 'stat': 'modifierNumber' }.
 *
 * Say, for example, the magic ring adds 2 to a unit's intellect.
 * The object passed to addModifier would be: { 'add': 2 }.
*/

Stats.prototype.addModifier = function(modifierID, modifier) {
  this.modified[modifierID] = this.modified[modifierID] || {};
  this.modified[modifierID] = modifier;
};

Stats.prototype.removeModifier = function(modifierID) {
  delete this.modified[modifierID];

  return true;
};

// Get a single modified stat.
Stats.prototype.get = function(statID) {
  var total = this.getBaseStat(statID) || 0;

  // Loop through every registered modifier
  for (var mod in this.modified) {
    var modifier = this.modified[mod];

    // If the modifier has an 'add' method that corresponds to the
    // requested stat, perform the calculation and return the modified value.
    for (var operation in modifier) {
      if (modifier[operation][statID]) {
        total = total + modifier[operation][statID];
      }
    }
  }

  return total;
};

// Return a set of all modified stats, i.e., the current value of each stat.
Stats.prototype.getAll = function() {
  var modifiedStats = {};

  for (var stat in this.base) {
    modifiedStats[stat] = this.get(stat)
  }

  return modifiedStats;
};
