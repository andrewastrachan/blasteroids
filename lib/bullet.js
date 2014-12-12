(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    options.radius = options.radius || "5";
    options.color = options.color || "orange";
		
    Asteroids.MovingObject.call(this, options)
  };
	
  Bullet.prototype.collideWith = function(otherObject) {
  	if (otherObject.color === "red") {
  		otherObject.remove();
  	}
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
	
	Bullet.prototype.isWrappable = false;
 

})();