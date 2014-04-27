/*
 * PLAYER
 *
 * This component defines the player object.  It holds a reference to the
 * player's name, their registered characters, whether or not they are
 * currently active.
 *
**/

Crafty.c('Player', {
  init: function() {
    // All units registered to the player.
    this.units = [];

    this.availableUnitCount = 0;

    // The name of the player.
    this.name = null;

    // True when its the player's turn.
    this.active = false;

    // Pointer to the unit currently acting.
    this.activeUnit = null;

    this.gold = 0;
  },

  setUp: function(playerName) {
    this.name = playerName;

    // Bind events from the global turn object, scoped to each player.
    this.bind('ActiveUnitSet', TL.bind(this.setActiveUnit, this));
    this.bind('EndTurn', this.endTurn);

    this.trigger('RegisterPlayer', this.name);
    this.bind('PlayerTurn', this.beforeTurn);

    Crafty.bind('Remove', function() {
      console.log(arguments)
    });

    return this;
  },

  register: function(unitId) {
    this.units.push(unitId);
  },

  /*
   * Callback executes after a selected unit has been found and returned by the game object.
   * Sets the player's currently acting unit.
   *
   * @param {unit} String pointer to the selected unit.
  **/
  setActiveUnit: function(unit) {
    this.activeUnit = unit[0];

    unit.bind('AfterMove', TL.bind(this.checkTurnEnd, this));
    unit.bind('AfterAction', TL.bind(this.checkTurnEnd, this));
  },

  /*
   * Callback handler triggered after unit receives Unit:Destroy event.
   * Cleans up the entity and removes it from the game.
   *
  **/

  unsetActiveUnit: function(unit) {
    unit.unbindAll();

    this.activeUnit = null;

    // Decrement the number of units available to move.
    // We don't care, really, if this goes below zero.
    this.availableUnitCount -= 1;

    // Clear out the unit view.
    Crafty.trigger('ClearUnitView');
  },

  /*
   * Callback to handle a slain unit.
   *
   * @param {entityId} Number the id of the unit to remove.
  **/
  deregisterUnit: function(entityId) {
    // In case the slain unit is the player's currently active one.
    if (this.activeUnit && this.activeUnit === entityId) {
      this.unsetActiveUnit(Crafty(entityId));
    }


    // Remove the unit from the player's list of unit pointers.
    this.units.splice(this.units.indexOf(entityId), 1);

    if (this.units.length === 0) {
      Crafty('Game').endGame(this.name);
    }
  },

  beforeTurn: function() {
    var Player = this;

    this.active = true;

    this.trigger('BeforeTurn');

    // Reset the available unit counter.
    this.availableUnitCount = 0;

    TL.forEach(this.units, function(pointer) {
      var unit = Crafty(pointer);

      if (!unit._locked) {

        Player.availableUnitCount += 1;

        unit.bind('Click', function() {
          Player.trigger('FindUnit', {
            ignoreSelectIfActive: true,
            entityId: unit[0]
          });
        });

        unit.resetActionState();
      }
    });
  },

  checkTurnEnd: function() {
    if (!this.active) return;

    var unit = Crafty(this.activeUnit);

    if (!unit.canAct()) {
      Crafty.console.writeLine(this.name, unit.getAttribute('name') + ' has completed their turn.');

      // If all units have moved, end the turn
      if (this.availableUnitCount <= 0) {
        this.endTurn();
      } else {
        this.unsetActiveUnit(unit);
      }

      return;
    }

    Crafty.console.writeLine(this.name, unit.getAttribute('name') + '  has an action remaining.');
  },

  // Forcibly end the turn.
  // Removes any active units.
  // Checking for movement is special as we need to ensure
  // the unit is correctly registered at the right coordinates after moving.
  endTurn: function() {
    var unit = null;
    if (this.activeUnit) {
      unit = Crafty(this.activeUnit);
      // Check if the character is currently moving.
      if (unit.moving()) {
        // If so, call the cleanup function. This will remove the overlays,
        // movement components, and trigger the 'AfterMove' event.
        unit.finishMove();
      }

      unit.setActedState();

      // Remove all components on the character.
      Crafty.removeInterface(unit);

      // Final cleanup before the turn ends
      this.unsetActiveUnit(unit);
    }

    this.active = false;
    this.trigger('AfterTurn');
  }
});
