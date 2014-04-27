/*
 * UNIT
 *
 * The basic template for a unit component.
**/

Crafty.c('Unit', {
  init: function() {
    if (!this.stats || ! this.attributes) {
      throw new Error('Unit must be implemented with stats and attribute objects.')
    }

    // Save a reference for subclassed character names.
    this.parentClass = this.getAttribute('name');

    this.requires('Actor, Collision, Life, SpriteAnimation, Mouse, Moveable').stopOnSolids();
    this.sourcePos = this.at();

    // Model State
    this._moved = false;
    this._acted = false;
    this._isMoving = false;
    this._isActing = false;
    this._locked = false; // Can the character perform actions?

    this.facing = 'down';

    // A list of the zones a player has searched in
    this.searches = [];

    // The action(s) taken by a unit this turn.
    this.actionTaken = [];

    // Defines whether a unit can perform a given action a second time this round,
    // for example, attacking or moving twice.
    this.secondAction = null;

    this.bind('Death', this.slain);
    this.bind('DoubleClick', this.slain);
    this.bind('AddAction', this.injectActionInterface);

    this.stats = new Stats(this.stats);

    this.inventory = new Slots('Backpack');

    // Unit is always impassable and always occupies this layer, at least for now.
    this.attr({z: 2});
  },

  extendEntity: function(obj) {
    if (obj.attributes) {
      this.attributes = TL.extend(this.attributes, obj.attributes);
    }

    if (obj.stats) {
      this.stats.overrideBase(obj.stats);
    }
  },

  // Inject a component interface into the unit.
  // @param {actionData} Object contains interfaceList, component, method, and argument keys.
  //        These specify a list of modules to mix into the unit,
  //        the component group the aforementioned modules fall under, and
  //        the method that should be executed on the interface, respectively.
  //        If arguments are supplied, the method will be executed with those arguments.
  injectActionInterface: function(actionData) {
    var args = actionData.args || [];

    Crafty.addInterface(this, actionData.interfaceList);

    if (actionData.method) {
      this[actionData.method].apply(this, args);
    }
  },

  toJSON: function() {
    var attributes = this.attributes;
    var stats = this.stats.getAll();
    var output = {};

    for (var attr in attributes) {
      output[attr] = attributes[attr];
    }

    for (var stat in stats) {
      output[stat] = stats[stat];
    }

    return output;
  },

  // Return current position as a string.
  reportPosition: function() {
    return this.at().x + ',' + this.at().y;
  },

  // Return the coords of the first instance of the sprite on the sprite sheet
  getSpriteCoords: function() {
    return {
      x: this._reels['PlayerMovingDown'][0][0] / 16,
      y: this._reels['PlayerMovingDown'][0][1] / 16
    };
  },

  unbindAll: function() {
    this.unbind('AfterMove');
    this.unbind('AfterAction');
    this.unbind('BeforeAttack');
    this.unbind('AfterAttack');
    this.unbind('BeforeDefend');
  },

  slain: function() {
    Crafty.console.writeLine(this.getAttribute('owner'), 'Your ' + this.getAttribute('name') + ' has died.');

    // remove the unit from its place on the board.
    this.vacate(this.at().x, this.at().y);
    this.trigger('Destroy', this);

    this.destroy();
  },

  moveComplete: function() {
    this._isMoving = false;
    this._moved = true;

    this.trigger('AfterMove');
  },

  // @param{actionName} String name of the action that was just taken.
  actionComplete: function(actionName) {
    this._isActing = false;
    this._acted = true;

    this.actionTaken.push(actionName);

    this.trigger('AfterAction', actionName);
  },

  resetActionState: function() {
    this._isMoving = false;
    this._isActing = false;
    this._moved = false;
    this._acted = false;

    // Remove any actions that may have been taken.
    this.actionTaken.length = 0;
  },

  setActedState: function() {
    this._isMoving = false;
    this._isActing = false;
    this._moved = true;
    this._acted = true;
  },

  addEventHook: function(event, callback) {
    this.bind(event, callback);
  },

  // Is this unit engaged in an action?
  // @return Boolean.
  acting: function() {
    return this._isActing;
  },

  moving: function() {
    return this._isMoving;
  },

  moved: function() {
    return this._moved;
  },

  acted: function() {
    return this._acted;
  },

  canAct: function() {
    return !this._acted || !this._moved;
  },

  getAttribute: function(attr) {
    if (typeof this.attributes[attr] !== 'undefined') {
      return this.attributes[attr];
    }
  },

  // Accepts either a single attribute as a string and a value, or an object
  // of attributes to set.
  setAttribute: function(attr, value) {
    if (typeof attr === "object" && !value) {
      for (var key in attr) {
        this[key] = attr[key];
      }
    } else {
      this[attr] = value;
    }

    return this;
  }
});
