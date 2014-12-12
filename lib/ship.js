(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    options.radius = options.radius || "15";
    options.vel = options.vel || [0, 0];
    options.color = options.color || "white";
		
    Asteroids.MovingObject.call(this, options)
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

})();