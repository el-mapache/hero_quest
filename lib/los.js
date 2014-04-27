function fastAbs(int) {
  return (int ^ (int >> 31)) - (int >> 31);
}

function fastFloor(int) {
  return int | 0;
}

function distance(x0, y0, x1, y1) {
  return Math.sqrt(Math.pow((x1-x0), 2) + Math.pow((y1-y0),2));
}

/*
 * Bresenham algorithm to determine the field of vision from a given point
 *
 * @param {x0} Int Starting x position
 * @param {y0} Int Starting y position
 * @param {x1} Int Ending x position
 * @param {y1} Int Ending y position
 * @param {occupied} Function callback that returns a boolean if the space is occupied/visible or not.
 * @return Boolean
**/

var line = function(x0, y0, x1, y1, occupied) {
  // Is the line vertical?
  var steep = fastAbs(y1 - y0) > fastAbs(x1 - x0);

  var temp = 0;

  if (steep) {
    temp = x0;
    x0 = y0;
    y0 = temp;

    temp = x1;
    x1 = y1;
    y1 = temp;
  }

  if (x0 > x1) {
    x0 ^= x1;
    x1 ^= x0;
    x0 ^= x1;

    y0 ^= y1;
    y1 ^= y0;
    y0 ^= y1;
  }

  var deltax = x1 - x0;
  var deltay = y1 - y0;

  var error = 0;
  var deltaError = fastAbs((deltay / deltax) * 100.0) / 100.0;

  var y = y0;

  // do we need to go up or down?
  var ystep = ( y0 < y1 ) ? 1 : -1;

  for (var x = x0; x < x1 + 1; x++) {
    if (steep) {
      if (occupied(y, x)) {
        return false;
      }
    } else {
      if (occupied(x, y)) {
        return false;
      }
    }

    error += deltaError;

    if (error > 0.5) {
      y += ystep;
      error -= 1.0;
    }
  }

  return true;
};

var radius = function(source, radius, hasNoCollision, callback) {
  callback = callback || function() {};

  var upperX = source.x + radius + 1;
  var lowerX = source.x - radius;
  var upperY = source.y + radius + 1;
  var lowerY = source.y - radius;

  for (var x = lowerX; x < upperX; x++) {
    for (var y = lowerY; y < upperY; y++) {

      // Point is out of bounds
      // TODO use constants here.
      if (x > 36 || x < 0 || y > 26 || y < 0) continue;

      if (line(source.x, source.y, x, y, hasNoCollision)) {
        // Figure out how far away the given square is.
        var d = distance(source.x, source.y, x, y);
        var intensity = (1 - d/radius);


        // If the callback function evaluates to true,
        // the caller is attempting to end the loop after a
        // condition has been met.
        if (callback(x, y, intensity)) {
          break;
        }
      }
    }
  }
};

window.HeroQuest = window.HeroQuest || {};

HeroQuest.radius = radius;
HeroQuest.line = line;
