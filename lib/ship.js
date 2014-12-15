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
//------------------------------------------------------
	
	Ship.prototype.brake = function() {
		var addedVel = Asteroids.Util.itemVector(this.angle);
		var newVel =  [this.vel[0] - (addedVel[0] * .2), this.vel[1] - (addedVel[1] * .2)];
		if (Math.abs(newVel[0]) < 7 && Math.abs(newVel[1]) < 7) {
			this.vel = newVel;
		}
		
	};
	
	Ship.prototype.bulletPos = function() {
		var randomizer = Math.random()
		if (randomizer > .5) {
			return [this.pos[0] + (Math.random() * 10), this.pos[1] + (Math.random() * 10)]
		} else {
			return [this.pos[0] - (Math.random() * 10), this.pos[1] - (Math.random() * 10)]
		}
		
	};
	
  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(this.angle);
    ctx.drawImage(this.shipImg, -25, -25, 50, 50);
    ctx.restore();
  };
	
	Ship.prototype.fireBullet = function() {
		if (!this.blasterReloading){
			var addedVel = Asteroids.Util.itemVector(this.angle);
			var newVel = [(addedVel[0] * 17), (addedVel[1] * 17)];
			var bullet = new Asteroids.Bullet({
				game: this.game, 
				vel: [newVel[0], newVel[1]], 
				pos: this.bulletPos(),
				angle: this.angle
			});
			var bulletSound = new Audio("./sounds/laser.mp3");
			bulletSound.play();
			this.gunRecoil(.1);
			this.game.bullets.push(bullet);
			this.blasterReloading = true;
			var that = this; 
			setTimeout(function(){ that.blasterReloading = false; }, 200);
		}
	};
	
	Ship.prototype.fireCannon = function() {
		if (!this.cannonReloading) {
			var addedVel = Asteroids.Util.itemVector(this.angle);
			var newVel = [(addedVel[0] * 10), (addedVel[1] * 10)];
			var cannonBall = new Asteroids.Bullet({
				game: this.game, 
				vel: [newVel[0], newVel[1]], 
				pos: this.bulletPos(), 
				radius: "20", 
				color: "orange", 
				type: "indestructable"
			});
			
			var that = this;
			var cannonSound = new Audio("./sounds/cannon.mp3")
			cannonSound.play();
			this.gunRecoil(4);
			this.game.bullets.push(cannonBall);
			setTimeout(function(){ 
				var reloadSound = new Audio("./sounds/reload.mp3")
				reloadSound.play();
			}, 2000);
			this.cannonReloading = true;
			setTimeout(function(){ that.cannonReloading = false; }, 3000);
		}
	};
	
	Ship.prototype.gunRecoil = function(recoil) {
		var addedVel = Asteroids.Util.itemVector(this.angle);
		var newVel =  [this.vel[0] - (addedVel[0] * recoil), this.vel[1] - (addedVel[1] * recoil)];
		if (Math.abs(newVel[0]) < 7 && Math.abs(newVel[1]) < 7) {
			this.vel = newVel;
		}
	};
	
	Ship.prototype.left = function() {
		this.angle -= .1
		if (Math.abs(this.angle) >= 6.25) {
			this.angle = 0
		}
		console.log(this.angle)
	};
	
	Ship.prototype.power = function() {
		var addedVel = Asteroids.Util.itemVector(this.angle);
    var newVel = [this.vel[0] + (addedVel[0] * .2), this.vel[1] + (addedVel[1] * .2)];
		if (Math.abs(newVel[0]) < 7 && Math.abs(newVel[1]) < 7) {
			this.vel = newVel;
		}
	};
	
	Ship.prototype.setupShip = function() {

    this.shipImg = new Image();
    this.shipImg.src = './images/ship.gif';
		this.cannonReloading = false;
		this.blasterReloading = false;
		this.angle = 0;

	};

 	Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };
	
	Ship.prototype.right = function() {
		this.angle += .1
		if (Math.abs(this.angle) >= 6.25) {
			this.angle = 0
		}
		console.log(this.angle)
	};

})();