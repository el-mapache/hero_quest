window.HeroQuest = window.HeroQuest || {};

// Loads the game, initializing the board and all its parts.
Crafty.scene('Game', function() {
  var heroes = Crafty.e('The Right Honorable Sir Pennyfarthing')
                     .requires('Player')
                     .setUp('The Right Honorable Sir Pennyfarthing');

  var wizard = Crafty.e('Zargon')
                     .requires('Player')
                     .setUp('Zargon');

  // Initialize the game module.
  HeroQuest.game = this.game = Crafty.e('Game');

  this.game.addPlayer(heroes);
  this.game.addPlayer(wizard);
  var level = Crafty.e('LevelOne');
  this.game.board.generate().loadLevel(level);
  this.game.level = level;

  // for (var a in Board.fogMap) {
  //   Board.fogMap[a].z = 3;
  // }

  // HeroQuest.radius({x: 5, y: 21}, 6, function(x,y) {
  //     // Always continue past the current units space.
  //     if (x +','+y === "5,21" || Board.at(x,y).has('Unit')) {
  //       return false;
  //     }

  //     return Board.occupied(x, y);
  //   }, function(x, y, intensity) {
  //       intensity = intensity * 100;
  //       if (Board.fogMap[x + ',' + y].color() !== 'black') return false;

  //       if (intensity >= 75 ) {
  //         Board.fogMap[x + ',' + y].color('rgba(221, 221, 25, 0.22)');
  //       } else if (intensity < 75) { // && intensity >= 40) {
  //         Board.fogMap[x + ',' + y].color('rgba(139, 74, 13, 0.56)');
  //       }

  //       if (Board.at(x, y).has('NPC')) return true;

  //       return false;
  //   });

  // HeroQuest.radius({x: 6, y: 21}, 6, function(x,y) {
  //     // Always continue past the current units space.
  //     if (x +','+y === "6,21") {
  //       return false;
  //     }

  //     return Board.occupied(x, y);
  //   }, function(x, y, intensity) {
  //       intensity = intensity * 100;
  //       if (Board.fogMap[x + ',' + y].color() !== 'black') return;

  //       if (intensity >= 75 ) {
  //         return Board.fogMap[x + ',' + y].color('rgba(221, 221, 25, 0.22)');
  //       } else if (intensity < 75) { // && intensity >= 40) {
  //        return Board.fogMap[x + ',' + y].color('rgba(139, 74, 13, 0.56)');
  //       }
  //   });

  this.unitUIController = new UnitUIController();
  this.popupController = popupController = new PopupController(document.getElementById('default-popup'));

  // Create the global console object.
  Crafty.console = Crafty.e('Console').attr({x: 184 ,y: 485, z: 100});
  Crafty.console.writeLine('system', 'Welcome to Hero Quest.');
  Crafty.console.writeLine('system', 'The game has started.');

  // Start the turn mechanism.
  this.game.startGame();
});
