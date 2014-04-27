window.HeroQuest = window.HeroQuest || {};

(function(window) {
  var FloodFill = (function(Board, x, y) {

    // Tiles yet to be visited.
    var pending = [];

    // Valid tiles we have visited.
    var visited = [];

    // basic vector constructor for convienience.
    var Vector = function(x, y) {
      return {
        x: x,
        y: y
      }
    };

    var tileWasVisited = function(node) {
      if (visited.length === 0) return false;

      for (var i = 0; i < visited.length; i++) {
        if (node.x === visited[i].x && node.y === visited[i].y) {
          return true;
        }

        continue;
      }

      return false;
    };

    var notWall = function(x, y) {
      var tile = Board.at(x,y);
      return tile.type !== 'wall' && tile.type !== 'door';
    };

    var addNeighbors = function(node) {
      visited.push(node);


      var N = node.y - 1,
          S = node.y + 1,
          E = node.x + 1,
          W = node.x - 1,
          myN = notWall(x, N),
          myS = notWall(x, S),
          myE = notWall(E, y),
          myW = notWall(W, y);

      if (myN) pending.push({x: node.x, y: N});
      if (myE) pending.push({x: E, y: node.y});
      if (myS) pending.push({x: node.x, y: S});
      if (myW) pending.push({x: W, y: node.y});
    };

    // The first node we'll examine
    pending.push(new Vector(x,y));

    return {
      fill: function() {
        while (pending.length !== 0) {
          var node = pending.splice(0,1)[0];

          if (tileWasVisited(node)) continue;

          if (Board.at(node.x, node.y) && notWall(node.x, node.y)) {
            addNeighbors(node);
          }
        }

        return visited;
      }
    };
  });

  return window.HeroQuest.FloodFill = FloodFill;
})(window);
