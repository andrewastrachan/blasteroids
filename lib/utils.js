(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};
	
	var RANDOMMOD = [-1, 1]

  Util.inherits = function (subclass, superclass) {
    var Surrogate = function() {};
    Surrogate.prototype = superclass.prototype;
    subclass.prototype = new Surrogate();
  };
  
  Util.randomVec = function(length){
		var change = RANDOMMOD[Math.floor(Math.random() * RANDOMMOD.length)];
    var dx = change + Math.floor(Math.random() * length);
    var dy = change - Math.floor(Math.random() * length);
    return [dx, dy];
  },
    //
  // Asteroids.Util.prototype.inherits.call(Asteroids.Asteroid, Asteroids.MovingObject);
  // Asteroid.inherits(MovingObject);
	
  Util.itemVector = function (angle) {
    return [Math.sin(angle), -1 * Math.cos(angle)];
  }
})();

