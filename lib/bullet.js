(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    options.radius = options.radius || 2;
    options.color = options.color || "#5DFC0A";
		this.type = options.type || "destructable"
		this.bulletImg = new Image()
		this.bulletImg.src = "./images/cannon_fireball.png"
		
		
    Asteroids.MovingObject.call(this, options)
  };
	
  Bullet.prototype.collideWith = function(otherObject) {
  	if (otherObject.color === "red") {
  		otherObject.remove();
  	}
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
	
  Bullet.prototype.draw = function (ctx) {
    if (this.type === "indestructable") {
			ctx.save();
	    ctx.translate(this.pos[0], this.pos[1]);
	    ctx.drawImage(this.bulletImg, -40, -40, 80, 80);
	    ctx.restore();
    }
		else {
	    var xCoord = this.pos[0];
	    var yCoord = this.pos[1];
  
	    ctx.fillStyle = this.color;
	    ctx.beginPath();
  
	    ctx.arc(
	      xCoord,
	      yCoord,
	      this.radius,
	      0,
	      2 * Math.PI,
	      false
	    );
  
	    ctx.fill();
		}
  };
	
	Bullet.prototype.isWrappable = false;
 

})();