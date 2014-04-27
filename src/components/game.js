/*
 * GAME
 *
 * Module acts as an event mediator for various components on the board.
 * Most global events are captured here, processed, and delegated to the currently
 * active player or unit.
**/

Crafty.c('Game', {
  // Pointer to the currently active unit.
  activeUnit: null,

	// JS object representing the active player.
	activePlayer: null,

	// Dictionary of player objects.
	players: {},

  attributes: {
    _hasStarted: false,
    _startTime: +new Date,
    _totalTurns: 0,
    _playTime: 0,
    _activeUnit: "",
    _activePlayer: ""
  },

	init: function() {
    var Game = this;

    this.board = Crafty.e('Board');

    this.treasureDeck = Crafty.e('Treasure');

    // Render the global game info view.
    this.view = Crafty.e('GameStateView').render();


    this.board.bind('RegisterUnit', function(unit) {
      // A unit has been registered, figure out who the owner is.
      var player = unit.getAttribute('owner');

      unit.ownerPointer = Game.players[player][0];

      // Store a pointer to the unit with the player.
      Game.players[player].units.push(unit[0]);
    });

    this.board.bind('Destroy', function(unit) {
      var player = unit.getAttribute('owner');

      Game.players[player].deregisterUnit(unit[0])
    });

		this.bind('RemoveUnit', TL.bind(this.removeUnit, this));

		this.view.bind('EndTurn', TL.bind(function() {
		  this.activePlayer.trigger('EndTurn');
		}, this));


    Crafty.bind('ClearActiveUnit', TL.bind(this.unsetActiveUnit, this));

    this.gameClock = null;
	},

  /*
   * Add a player to the list of all current players.
   * Updates the games internal units lookup if the player hasn't already
   * been registered.
  **/

  addPlayer: function(player) {
    // Don't register the player if they already exist.
    if (this.players[player.name]) return;

    player.bind('AfterTurn', TL.bind(this._handleTurn, this));
    player.bind('FindUnit', TL.bind(this.getUnit, this));

    if (player.name !== 'Zargon') player.bind('DrawTreasure', TL.bind(this.onDrawTreasure, this));

    this.players[player.name] = player;
  },

  setActiveUnit: function(unit) {
    this.activeUnit = unit[0];

    this.set('activeUnit', unit.getAttribute('name'));
  },

  unsetActiveUnit: function() {
    this.activeUnit = null;
    this.set('activeUnit', '');
  },

  setActivePlayer: function(player) {
    this.activePlayer = this.players[player];

    this.set('activePlayer', this.players[player].name);
  },

  /*
   * Get a player's unit from the entity id.
   *
   * @param {data} Object Two keys, 1) entityId - the crafty is of the unit,
   * and 2) ignoreActive - tell the game to not return a unit if the
   * player already has an active character.
   *
   * @return the unit object
  **/

  getUnit: function(data) {
    var unit = Crafty(data.entityId),
        activeUnit = this.activeUnit && this.lookupActiveUnit();

    if (!unit) {
      throw new Error('Something is wrong. The unit you requested cannot be located.');
    }

    if (data.ignoreSelectIfActive) {
      if (activeUnit && (activeUnit.acting() || activeUnit.moving())) {
        return Crafty.console.writeLine('system', 'You have an active unit. Finish what they are doing before selecting another.');
      }
    }

    if (unit.getAttribute('owner') !== this.activePlayer.name) {
      Crafty.console.writeLine('system', 'You cannot select a unit not under your control.');
      return;
    }

    Crafty.console.writeLine(this.get('activePlayer'), ' has selected ' + unit.getAttribute('name') + ' at ' + unit.reportPosition() +'.');

    this.setActiveUnit(unit);

    Crafty.trigger('ActiveUnitSet', unit);

    return unit;
  },

  lookupActiveUnit: function() {
    if (!this.activeUnit) return false;

    return Crafty(this.activeUnit);
  },

  _updateTime: function(time) {
    this.set('playTime', time);
  },

  _handleTurn: function() {
    var turns = this.get('totalTurns');

    this.set('totalTurns', turns += 1);

    if(this._playerTurn) {
      this._playerTurn = false;
      Crafty.console.writeLine('system', 'It is the wizard\'s turn to move.');
      this.setActivePlayer('Zargon');
    } else {
      this._playerTurn = true;

      Crafty.console.writeLine('system', 'It is the heros\' turn to move.');
      this.setActivePlayer('The Right Honorable Sir Pennyfarthing');
    }

    this.activePlayer.trigger('PlayerTurn');
    return;
  },

  set: function(key, value) {
    this.attributes['_' + key] = value;

    // Coupling but I really don't want to write an event system on top
    // of the crafty one for  attribute binding.
    this.view.trigger('AttributeUpdate', {key: key, value: value});
  },

  get: function(key) {
    return this.attributes['_' + key] || null;
  },

  endGame: function(player) {
    // check if the player has lost.
    var restart = confirm(player + ' has lost. Restart?');

    if (restart) window.location.reload();

    Crafty.console.writeLine('system', 'Game Over');
    // iam unclear as to what this even does.
    Crafty.unbind();
    // stop the clock
    // say who lost, and who won
    // clear the scene and offer to reload the level. or move on if the hero won
  },

  startGame: function() {
    this.gameClock = new Clock(TL.bind(this._updateTime, this));
    this._handleTurn();
  },

  onDrawTreasure: function(unit) {
    // See if we have a script to run;
    if (this.level.scriptedEvents["Treasure"][unit.zone] &&
        !this.level.scriptedEvents["Treasure"][unit.zone].run) {

      var treasure = this.level.scriptedEvents["Treasure"][unit.zone];
    } else {
      var treasure = this.treasureDeck.drawCard();
    }
    // Draw a card
    unit.trigger('TreasureDrawn', treasure);
  }
});
