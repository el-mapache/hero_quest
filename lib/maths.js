HeroQuest = HeroQuest || {};

(function() {
  var maths = window.HeroQuest.Maths = {};

  maths.abs = function(int) {
    return (int ^ (int >> 31)) - (int >> 31);
  };

  maths.manhattan = function(point, goal) {
    return maths.abs(point.x - goal.x) + maths.abs(point.y - goal.y);
  };

  maths.floor = function(int) {
    return int | 0;
  };

  maths.distance = function(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow((x1-x0), 2) + Math.pow((y1-y0),2));
  };

  maths.random = function() {
    var x = Math.sin(Math.random()) * 10000;
    return x - maths.floor(x);
  }

  return maths;
})(window);
