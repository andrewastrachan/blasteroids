(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var COLOR = "red";
  var RADIUS = "30";
 
  var Util = Asteroids.Util;
 
  var Asteroid = Asteroids.Asteroid = function(options){
    options.pos = options.pos || options.game.randomPosition();
    options.color = COLOR;
    options.radius = RADIUS;
    options.vel = options.vel || Asteroids.Util.randomVec(2);
		
		Asteroids.MovingObject.call(this, options);
  };
	
	Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);
	
  Asteroid.prototype.collideWith = function(otherObject) {
  	if (otherObject instanceof Asteroids.Ship) {
  		otherObject.relocate();
  	} else if (otherObject instanceof Asteroids.Bullet) {
  		this.game.remove(otherObject);
			this.game.remove(this);
  	}
  }
	
	
})()