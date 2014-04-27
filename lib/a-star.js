window.HeroQuest = window.HeroQuest || {};

(function(window) {

  // Pass a reference to the board object in addition to the start/end points.
  var AStar = (function(Board, currentPos, destination, freeTileCheck) {

    var pathStart = [currentPos.x, currentPos.y],
        pathEnd = [destination.x, destination.y],
        Board = Board;

    // Board sizes
    var CONSTANTS = HeroQuest.CONSTANTS;

    // Distance finding algorithm
    var distance = HeroQuest.Maths.manhattan;

    var canWalkHere = freeTileCheck || function (x, y) {
      if (Board.at(x,y).type === "door") return true;

      return Board.map[x] != null && Board.map[x][y] != null && !Board.occupied(x,y);
    };

    // Node object for A* linked list.
    function Node(parent, point) {
      return {
        parent: parent,
        value: point.x + (point.y * CONSTANTS.BOARD_AREA),
        x: point.x,
        y: point.y,
        costToStart: 0,
        costToGoal: 0
      };
    }

    // Find the four neighbors of a given point.
    function neighbors(x, y) {
      var N = y - 1,
          S = y + 1,
          E = x + 1,
          W = x - 1,
          myN = N > -1 && canWalkHere(x, N),
          myS = S < CONSTANTS.BOARD_HEIGHT && canWalkHere(x, S),
          myE = E < CONSTANTS.BOARD_WIDTH && canWalkHere(E, y),
          myW = W > -1 && canWalkHere(W, y);

      var result = [];

      if (myN) result.push({x: x, y: N});
      if (myE) result.push({x: E, y: y});
      if (myS) result.push({x: x, y: S});
      if (myW) result.push({x: W, y: y});

      return result;
    }

    return {
      findPath: function() {
        // Nodes representing the start and end positions.
        var start = new Node(null, { x: pathStart[0], y: pathStart[1] });
        var end = new Node(null, { x: pathEnd[0], y: pathEnd[1] });

        var Board = Board;

        // Array of world cells.
        var aStar = new Array(CONSTANTS.BOARD_AREA);

        // Currently open nodes.
        var open = [start];
        // Closed nodes;
        var closed = [];
        // the output.
        var result = [];
        // nearby node.
        var nearestNeighbors;
        // node we are examining now.
        var currentNode;
        // node that starts the path currently being calculated.
        var currentPath;

        var len, max, min, i, j;

        while (len = open.length) {
          max = CONSTANTS.BOARD_AREA;
          min = -1;

          for (i = 0; i < len; i++) {
            if (open[i].costToStart < max) {
              max = open[i].costToStart;
              min = i;
            }
          }

          // get the next node from the open nodes array, and remove it.
          currentNode = open.splice(min, 1)[0];

          // Have we arrived at the destination?
          if (currentNode.value === end.value) {
            currentPath = closed[closed.push(currentNode) - 1];

            do {
              result.push([currentNode.x, currentNode.y]);
            } while (currentNode = currentNode.parent);

            // Clear it all out;
            aStar = closed = open = [];

            result.reverse();
          } else {
            // We dont have the destination, keep going.
            nearestNeighbors = neighbors(currentNode.x, currentNode.y);

            for (i = 0, j = nearestNeighbors.length; i < j; i++) {
              currentPath = new Node(currentNode, nearestNeighbors[i]);

              if (!aStar[currentPath.value]) {
                // estimated cost of this particular route so far
                currentPath.costToGoal = currentNode.costToGoal + distance(nearestNeighbors[i], currentNode);
                // estimated cost of entire guessed route to the destination
                currentPath.costToStart = currentNode.costToGoal + distance(nearestNeighbors[i], end);
                // remember this new path for testing above
                open.push(currentPath);
                // mark this node in the world graph as visited
                aStar[currentPath.value] = true;
              }
            }
            closed.push(currentNode);
          }
        }
        return result;
      }
    };
  });

  return window.HeroQuest.AStar = AStar;
})(window);
