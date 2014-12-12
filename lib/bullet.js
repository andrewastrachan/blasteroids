(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    options.radius = options.radius || "2";
    options.color = options.color || "#99FF00";
		this.type = options.type w|| "destructable"
		this.bulletImage
		
		
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