/*
 * CONSOLE
 * Logs game activity output for player to see.
**/


Crafty.c('Console', {
  COLORS: {
    "system": "#00CCFF",
    "text": "#363F3D",
    "zargon": "#E91C3E",
    "player1": "#E9941C",
    "player2": "#E7D75E",
    "player3": "",
    "player4": ""
  },

  init: function() {
    this.requires('HTML');

    // Internal counter to keep track of which color a newly registered player is assigned.
    this._nextPlayerAssignment = 1;

    this.el = this._element;
    this.lines = 0;

    this.bind('Game:AddPlayer', this.assignPlayerColor);

    Crafty.bind("LOG", TL.bind(this.writeLine, this));
  },


  /*
   * Find the next available unassigned player color and replace the temporary
   * 'player{x}' key with the player's actual name.
  **/

  assignPlayerColor: function(player) {
    // All four players (other than Zargon) have been assigned their color.
    if (this._nextPlayerAssignment > 4) return false;

    var _player = 'player' + this._nextPlayerAssignment,
        _tempColor = this.COLORS[player]; // Store the color in a temporary variable.

    // Delete our old player key.
    delete this.COLORS[this._nextPlayerAssignment];

    // Create a new color key with the actual name of the player, assigning its value
    // as the previously saved _tempColor.
    this.COLORS[player] = _tempColor;

    // Increment the assignment counter so we know which player key to overwrite
    // next.
    ++this._nextPlayerAssignment;

    return;
  },

  // Returns the color associated with the player's name, or a default.
  getColor: function(key) {
    key = key || '';
    return this.COLORS[key.toLowerCase()] || "#E7D75E";
  },

  writeLine: function(player, message, unit) {
    // Clean up old messages to save some memory
    if (this.lines > 50) {
      [].splice.call(this.el.querySelectorAll('div'),0,49).forEach(function(node) {
        node.remove()
      });
    }

    var lead = "<div><p class='lead' style='color: " + this.getColor(player) + "'>[" + player + "]";
    var unit = typeof unit !== 'undefined' && unit || " ";
    var message = "<span class='message'>" + message + "</span></p><br/></div>";

    this.append([lead, unit, message].join(""));
    this.lines++;

    this.el.scrollTop = this.el.scrollTop;
  }
});
