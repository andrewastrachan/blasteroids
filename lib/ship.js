(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    options.radius = options.radius || "20";
    options.vel = options.vel || [0, 0];
    options.color = options.color || "white";
		Asteroids.MovingObject.call(this, options)
		this.setupShip();	
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
	
	Ship.prototype.setupShip = function() {

    this.shipImg = new Image();
    this.shipImg.src = './images/ship.gif';
		this.cannonReloading = false;
		this.blasterReloading = false;
		this.angle = 0;

	};
	
  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(this.angle);
    ctx.drawImage(this.shipImg, -25, -25, 50, 50);
    ctx.restore();
  };

})();