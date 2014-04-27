Crafty.c('PlayerSearch', {
  init: function() {
    this.actionId = 'search'
    this.canSearch = this.canDoSearch();
    this.bind('RemoveInterfaces', this._unbindEvents);
    this.bind('TreasureDrawn', this.handleAction);
  },

  finishAction: function() {
    var id = this.actionId;

    Crafty.removeInterface(this);
    this.actionComplete(id);
  },

  // Make sure the unit is able to search the requested area.
  canDoSearch: function() {
    // The unit has searched this zone already.
    if (this.searches.indexOf(this.zone) !== -1) {
      Crafty.console.writeLine('system', this.getAttribute('name') + ' has already searched this room.');
      return false;
    }

    // Check if the current zone is the one the player is searching
    if (!TL.any(Crafty.getAll('Floor'), TL.bind(this._isInZone, this))) {
      Crafty.console.writeLine('system', 'That unit isn\'t in that room. Are you doing something naughty?');
      return false;
    }

    var monsterInRoom = TL.any(Crafty.getAll('NPC'), TL.bind(this._isRoomOccupied, this));

    if (monsterInRoom) {
      Crafty.console.writeLine('system', 'You cannot search a room occupied by monsters.');
      return false;
    }

    return true;
  },

  _isRoomOccupied: function(element) {
    var enemy = Crafty(element);

    return enemy.getAttribute('monster') && enemy.zone === this.zone;
  },

  _isInZone: function(pointer) {
    var floorTile = Crafty(pointer);

    return floorTile.at().x === this.at().x &&
           floorTile.at().y === this.at().y;
  },

  search: function() {
    var unit = this;

    // Don't penalize them for not being able to search.
    if (!this.canSearch) return Crafty.removeInterface(this);

    this._isActing = true;

    // Trigger the draw action on the unit's player.
    Crafty(this.ownerPointer).trigger('DrawTreasure', this);
  },

  handleAction: function(card) {
    var template = document.getElementById('treasure-template').innerHTML,
        content = HeroQuest.render(template, card);

    popupController.update(content).render().show();

    // Call the effect method of the card.
    card.effect(this);

    // Update the unit's searches array to indicate that they have searched this room.
    this.searches.push(this.zone);
    this.finishAction();
  },

  _unbindEvents: function() {
    this.unbind('TreasureDrawn');
    this.unbind('RemoveInterfaces');
  },

  cancelAction: function() {
    this._isActing = false;
    Crafty.removeInterface(this);
  }
});

Crafty.c('UnitCastSpell', {
  init: function() {
    this.actionId = 'castSpell';
    this.currentSpell = null;
    this._isActing = true;

    this.bind('ToAttack', this.handleAction);
    this.bind('RemoveInterfaces', this._unbindEvents);
  },

  _unbindEvents: function() {
    this.unbind('RemoveInterfaces');
    this.unbind('ToAttack');
  },

  setSpell: function(spell) {
    var unit = this;

    this.currentSpell = spell;

    HeroQuest.radius(this.at(), 8, function(x, y) {
      // Always continue past the current units space.
      if (x +','+y === unit.reportPosition() || Board.at(x,y).has('Unit') ||
          !Board.at(x,y).has('Solid')) {
        return false;
      }

      return Board.occupied(x, y);
    }, this._placeTile);
  },

  _placeTile: function(x,y, intensity) {
    Crafty.e("ActionOverlay").attr({z: 100}).at(x,y);
  },

  handleAction: function(data) {
    // The coordinates of the space upon which the attack is directed.
    var coords = data.dest;

    if(!Board.occupied(coords.x, coords.y)) {
      Crafty.console.writeLine('system', 'That isn\'t a valid target.');
      return false;
    }

    this.finishAction(Board.at(coords.x, coords.y));
  },

  // this needs to take a block essentially, a callback to execute
  finishAction: function(target) {
    var wasSuccess = function(caster, window) {
      if (target.hasResistance && target.hasResistance()) {
        window.Crafty.console.writeLine('system', target.getAttribute('name') + ' resisted ' + caster.getAttribute('name') + '\'s ' + caster.currentSpell.name);
        return false;
      }

      return caster.currentSpell.cast(target);
    }(this, window);

    if (!wasSuccess) return;

    // String. name of this action component
    var actionTaken = this.actionId;

    this.closeSpellbook();
    Crafty.trigger("Spellbook:Close");
    this.currentSpell = null;

    Crafty.removeInterface(this);
    Crafty.trigger("ClearActionOverlays");
    this.actionComplete(actionTaken);
  },

  cancelAction: function() {
    this._isActing = false;
    Crafty.removeInterface(this);
  }
});

Crafty.c('PlayerAttack', {
  init: function() {
    this.actionId = 'attack';
    this._isActing = true;

    // All interfaces will clean up their second actions
    // if they need to?

    if (this.secondAction === this.actionId) {
      this.secondAction = null;
    }

    this.playerOffset = this.at();
    this._bindEvents();
  },

  _bindEvents: function() {
    this.bind('ToAttack', this.handleAction);
    this.bind('RemoveInterfaces', this._unbindEvents);
  },

  cancelAction: function() {
    this._isActing = false;
    Crafty.removeInterface(this);
  },

  _unbindEvents: function() {
    // Tell the board to remove the attack overlay tiles
    Crafty.trigger("ClearActionOverlays");

    this.unbind('RemoveInterfaces');
    this.unbind('ToAttack');
  },

  playerAttack: function () {
    var directions = [[0,-1],[0,1],[1,0],[-1,0]];

    for(var i = 0; i < directions.length; i++) {
      this._placeTile(directions[i]);
    }
  },

  handleAction: function(data) {
    // The coordinates of the space upon which the attack is directed.
    var coords = data.dest;

    // Check if the space to attack has anything in it.
    if(!Board.occupied(coords.x, coords.y)) {
      Crafty.console.writeLine('system', 'That isn\'t a valid target.');
      return false;
    }

    // The targeted unit
    var target = Board.at(coords.x, coords.y)

    // Trigger the before battle effects hook.
    this.trigger('BeforeAttack');
    target.trigger('BeforeDefend');

    this.finishAction(target);
  },

  finishAction: function(target) {
    var attack = this.roll(this.stats.get('attack')),
        defense = this.roll(target.stats.get('defense')),
        actionId = this.actionId;


    Crafty.console.writeLine('system', this.getAttribute('name') + ' rolled: ' + attack);
    Crafty.console.writeLine('system', target.getAttribute('name') + ' rolled: ' + defense);


    var damage = this._checkRolls(attack, defense, target.getAttribute('monster'));

    if(damage !== 0) {
      Crafty.console.writeLine('system', target.getAttribute('name') + ' has lost ' + damage + ' body point(s)');

      // Tell the target to subtract from their total body points.
      target.trigger('TakeDamage', -damage);
    } else {
      Crafty.console.writeLine('system', target.getAttribute('name') + ' defended successfully.');
    }

    this.trigger('AfterAttack');
    target.trigger('AfterDefend');

    // Remove the attack interface.
    Crafty.removeInterface(this);

    this.actionComplete(actionId);
  },


  /*
   * Private function that determines how much damage the attacker will do
   * to their target.
   *
   * @param {attackRoll} Array a list of the rolls made by the attacker
   * @param {defenseRoll} Array a list of the rolls made by the defender
   * @param {isMonster} Boolean is the unit a monster?
   *
   * @return an integer representing the amount of damage done
  **/
  _checkRolls: function(attackRoll, defenseRoll, isMonster) {
    var _attackTotal = 0,
        _defenseTotal = 0;

    for(var i = 0; i < attackRoll.length; i++) {
      if(attackRoll[i] === 'skull') {
        ++_attackTotal;
      }
    }

    for(var i = 0; i < defenseRoll.length; i++) {
      // This can probably be cleaned up a bit.
      if (isMonster) {
        if (defenseRoll[i] === 'blackShield') {
          ++_defenseTotal;
        }
      } else {
        if (defenseRoll[i] === 'shield') {
          ++_defenseTotal;
        }
      }
    }

    return _attackTotal > _defenseTotal ? _attackTotal - _defenseTotal : 0;
  },

  _placeTile: function(direction) {
    var newX = this.playerOffset.x + direction[0],
        newY = this.playerOffset.y + direction[1];

    // Place the AttackOverlay tile on the board
    Crafty.e('ActionOverlay').attr({z: 100}).at(newX, newY);
  }
});

Crafty.c('Move', {
  init: function() {
    this._bindEvents();
  },

  _bindEvents: function() {
		this.bind('moveRoll', this._onMoveRoll);
    this.bind('RemoveComponent', this._unbindEvents);
  },

  _unbindEvents: function() {
    this.unbind('moveRoll');
    this.unbind('RemoveComponent');
  },

  /*
   * Callback function after move dice roll.
   *
   * @param {data} Object containing a single key 'value'
  **/

  _onMoveRoll: function(data) {
    // How many spaces the character may move
    this.spaces = data.value;

    Crafty.console.writeLine('system', this.getAttribute('name') + ' has ' + this.spaces + ' spaces to move.');

    this.showValidMoves(data.value);
  },

  showValidMoves: function(spaces) {
    var playerOffset = this.at(), // movement tree starting point
        lowerOffset = playerOffset.y + spaces,
        upperOffset = playerOffset.y - spaces,
        self = this;

    function draw() {
      var x = playerOffset.x,
          grow = 0;

      for (var y = lowerOffset; y > upperOffset; y--) {
        self._placeTile(x, y);
        fan(x, y, grow);

        grow = y > playerOffset.y ? grow += 1 : grow -= 1;
      }
    }

    function fan(x, y, grow) {
      if (grow === 0) return false;

      for (grow; grow > 0; grow--) {
        self._placeTile(x - grow, y);
        self._placeTile(x + grow, y);
      }
    }

    draw();
  },

  _tileIsOccupied: function(x, y) {
    // Has the roll gone out of bounds
    if (Board.outOfBounds(x, y)) return true;
    if (Board.occupied(x, y)) return true;
  },

  _placeTile: function(x, y) {
    if (this._tileIsOccupied(x,y)) return;

    Crafty.e('Overlay').attr({z: 1}).at(x, y);
  }
});

Crafty.c('PlayerMovement', {
  // Boolean used to control animation. Not related to the _isMoving property.
  currentlyMoving: false,
  // Counter of number of spaces the unit has remaining to move.
  spacesRemaining: false,

  init: function() {
    // Cache the unit's current position on the board.
    this.source = this.at();

		this._isMoving = true;

    // Place holder function to be added if needed
    this.canMoveThruTile = null;

    this._stepFrames = 10;

    this._tileSize = HeroQuest.CONSTANTS.TILE_SIZE;

    this.bind('RemoveComponent', this._unbindEvents);
    this.bind('OnMove',this.getCoordinates);

    this.trigger('BeforeMove');
  },

  _unbindEvents: function() {
    Crafty.trigger('ClearOverlays');
    this.unbind('OnMove');
	  this.unbind('RemoveComponent');
  },

  getCoordinates: function(data) {
	  if(!this.spacesRemaining) {
      // AStar makes this count off by one and I dont care to fix it.
      this.spacesRemaining = this.spaces + 1;
    }

    this.currentPos = null;

    this.route = HeroQuest.AStar(Board, this.at(), data.dest, this.passThroughWalls).findPath();

    this.recalculatePosition();
	},

  recalculatePosition: function() {
    if (!this.currentPos) {
      this.routeOffset = 0;
      // Set the initial tile
      this.currentPos = { x: this.route[this.routeOffset][0], y: this.route[this.routeOffset][1] };
    } else {
      this.routeOffset++;
      // set the new current position as the previous destination.
      this.currentPos = this.dest;
    }

    this.dest = {x: this.route[this.routeOffset][0], y: this.route[this.routeOffset][1]};


    this.calculateDirection();

    this._setAsMoving();
  },

  calculateDirection: function() {
    this.xDiff = this.dest.x - this.currentPos.x;
    this.yDiff = this.dest.y - this.currentPos.y;
  },

  _setAsMoving: function() {
    if (this.currentlyMoving) return false;
    this._frames = this._stepFrames;

    this.currentlyMoving = true

    this.bind('EnterFrame', this._moveToTile);

    if(this.yDiff === -1 && this.dest.x === this.currentPos.x) {
      this.animate("PlayerMovingUp", this._stepFrames, -1);
      this.facing = 'up';
    } else if(this.yDiff === 1 && this.dest.x === this.currentPos.x) {
      this.animate("PlayerMovingDown", this._stepFrames, -1);
      this.facing = 'down';
    } else if(this.dest.x > this.currentPos.x && this.dest.y === this.currentPos.y) {
      this.animate("PlayerMovingRight", this._stepFrames, -1);
      this.facing = 'right';
    } else if(this.dest.x < this.currentPos.x && this.dest.y === this.currentPos.y) {
      this.animate("PlayerMovingLeft", this._stepFrames, -1);
      this.facing = 'left';
    }
  },


	// Move sprite towards its destination in each frame
  _moveToTile: function() {
    // Open a door as we come to it.
    if (Board.at(this.dest.x, this.dest.y).type === 'door') {
      Board.at(this.dest.x, this.dest.y).canOpenDoor();
    }

	  this.x += this.xDiff * this._tileSize / this._stepFrames;
    this.y += this.yDiff * this._tileSize / this._stepFrames;

    this._frames--;

		// Force the sprite into its final position to avoid rounding errors in movement
    if (this._frames === 0 ) {
      this.currentlyMoving = false;
      this.x = this.dest.x * 16;
      this.y = this.dest.y * 16;

      this.spacesRemaining--;
      this.stop();
      this.unbind('EnterFrame');

      setTimeout(function() {
        if (this.spacesRemaining <= 0) return this.finishMove();
        if (this.routeOffset !== this.route.length - 1) this.recalculatePosition();
      }.bind(this), 20);


      //var pos = this.x + ','+ this.y;

      // HeroQuest.radius({x: this.x/16, y: this.y/16}, 6, function(x,y) {
      //   // Always continue past the current units space.
      //   if (x +','+y === pos) {
      //     return false;
      //   }

      //   return Board.occupied(x, y);
      // }, function(x, y, intensity) {
      //     intensity = intensity * 100
      //     if (intensity >= 75 ) {
      //       return Board.map[x][y].tile.color('rgba( 255, 147, 41, 0.35)');
      //     } else if (intensity < 75 && intensity >= 40) {
      //       return Board.map[x][y].tile.color('rgba(139, 74, 13, 0.7)');
      //     }

      //     Board.map[x][y].tile.color('rgba(0,0,0,'+(1-(intensity/100))+')');
      // });
    }
	},

  finishMove: function() {
    var isFinished = confirm("Are you sure you want to move here?");

    if(!isFinished) {
			return this.resetPosition();
    }

    var newX = this.x / this._tileSize;
    var newY = this.y / this._tileSize;

    // Deregister the entity from its original space in the in memory board.
    this.vacate(this.source.x, this.source.y);

    var floorTiles = Crafty('spr_floor_a');

    // Set a new zone for the unit. Inefficient.
    for (var tile in floorTiles) {
      t = Crafty(floorTiles[tile]);
      if (t.at().x === newX && t.at().y === newY) {
        this.setZone(t.zone);
        break;
      }
    }

    // Set a new position and tell the board to occupy the new space.
		this.at(newX, newY, true);

		// The interface is getting removed, but set the spaces counter to 0 just in case.
		this.spacesRemaining = 0;

		Crafty.removeInterface(this);

    Crafty.console.writeLine(this.getAttribute('owner'), this.getAttribute('name') + " has completed their move.");

    this.moveComplete();
  },

  resetPosition: function() {
		this.x = this.source.x * this._tileSize;
    this.y = this.source.y * this._tileSize;

    this.at(this.source.x, this.source.y, true);

    Crafty.console.writeLine('system', 'Unit has ' + this.spaces + ' moves remaining.');
	}
});
