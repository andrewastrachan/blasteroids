(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
		this.type = options.type || "destructable";
		this.angle = options.angle;		
		this.bulletImg = new Image();
		this.bulletImg.src = "./images/flame.png";

    options.radius = options.radius || 2;

    Asteroids.MovingObject.call(this, options)
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
//--------------------------------------------------------
	//cannon projectiles are indestructable
  Bullet.prototype.draw = function (ctx) {
    if (this.type === "indestructable") {	
			
			this.bulletImg = new Image()
			this.bulletImg.src = "./images/cannon_fireball.png"
			
			ctx.save();
	    ctx.translate(this.pos[0], this.pos[1]);
	    ctx.drawImage(this.bulletImg, -40, -40, 80, 80);
	    ctx.restore();
    }
		else {
			ctx.save();
	    ctx.translate(this.pos[0], this.pos[1]);
			ctx.rotate(this.angle + 1.5);
	    ctx.drawImage(this.bulletImg, -5, -5, 20, 20);
			
	    ctx.restore();
		}
  };
	
	//override isWrappable property for bullet
	Bullet.prototype.isWrappable = false;
 

})();