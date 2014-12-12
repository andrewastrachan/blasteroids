(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function (subclass, superclass) {
    var Surrogate = function() {};
    Surrogate.prototype = superclass.prototype;
    subclass.prototype = new Surrogate();
  };
  
  Util.randomVec = function(length){
    var dx = Math.floor(Math.random() * length);
    var dy = Math.floor(Math.random() * length);
    return [dx, dy];
  }
    //
  // Asteroids.Util.prototype.inherits.call(Asteroids.Asteroid, Asteroids.MovingObject);
  // Asteroid.inherits(MovingObject);
})();

