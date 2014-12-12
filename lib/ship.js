(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    options.radius = options.radius || "15";
    options.vel = options.vel || [0, 0];
    options.color = options.color || "white";
    this.shipImg = new Image();
    this.shipImg.src = './images/ship.gif';
		
    Asteroids.MovingObject.call(this, options)
		this.angle = 0;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
	
  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(this.angle);
    ctx.drawImage(this.shipImg, -20, -20, 50, 50);
    ctx.restore();
  };

})();