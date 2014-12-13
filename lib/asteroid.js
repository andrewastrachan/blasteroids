(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var COLOR = "red";
  var RADIUS = "20";
 	var ITEMS = ["1", "2", "3", "4", "5", "6", "7"]
  var Util = Asteroids.Util;
	
	var pickRandomFile = function() {
		var item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
		var imageLink = "./images/asteroids/".concat(item).concat(".png")
		return imageLink
	};
 
  var Asteroid = Asteroids.Asteroid = function(options){
		
    this.astImg = new Image();
    this.astImg.src = pickRandomFile();
    options.pos = options.pos || options.game.randomPosition();
    options.color = COLOR;
    options.radius = RADIUS;
    options.vel = options.vel || Asteroids.Util.randomVec(2);
		
		Asteroids.MovingObject.call(this, options);
  };
	
	Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);
	
  Asteroid.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.drawImage(this.astImg, -40, -40, 80, 80);
    ctx.restore();
  };
	
  Asteroid.prototype.collideWith = function(otherObject) {
  	if (otherObject instanceof Asteroids.Ship) {
  		otherObject.relocate();
			this.game.lives -= 1
			return true;
			// alert(this.game.lives)
  	} else if (otherObject instanceof Asteroids.Bullet) {
			debugger
  		if (otherObject.type === "destructable") this.game.remove(otherObject);
			this.game.remove(this);
  	} else if (otherObject instanceof Asteroids.Asteroid) {
  		var otherVel = otherObject.vel
			otherObject.vel = this.vel
			this.vel = otherVel
  	}
		
		return false; 
  }
	
	
})()