(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.draw = function(ctx){
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
  };
	
	MovingObject.prototype.collideWith = function(options){
		; // do nothing
	};
	
	MovingObject.prototype.isWrappable = true; 

  MovingObject.prototype.move = function() {

	    var xPos = this.pos[0] + this.vel[0];
	    var yPos = this.pos[1] + this.vel[1];
	    this.pos = [xPos, yPos];
			
			if (this.isWrappable && this.game.isOutOfBounds(this.pos)) {
		    this.pos = this.game.wrap(this.pos);
			} else if (this.game.isOutOfBounds(this.pos)) {
				this.remove();
			}
  };
  
  MovingObject.prototype.isCollidedWith = function(otherObject){
    sumOfRadii = parseInt(this.radius) + parseInt(otherObject.radius);
    var x1 = this.pos[0];
    var x2 = otherObject.pos[0];
    var y1 = this.pos[1];
    var y2 = otherObject.pos[1];
    
    
    dist = Math.sqrt( (Math.pow((x1 - x2), 2)) + (Math.pow((y1 - y2), 2)) );
    // debugger
    if (dist > sumOfRadii){
      return false;
    } else {
      return true;
    }
  };
	
  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
	
  MovingObject.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };
	
	MovingObject.prototype.power = function() {
		
		var addedVel = Asteroids.Util.itemVector(this.angle);
    var newVel = [this.vel[0] + (addedVel[0] * .5), this.vel[1] + (addedVel[1] * .5)];
    this.vel = newVel;
	};
	
	MovingObject.prototype.brake = function() {
		var addedVel = Asteroids.Util.itemVector(this.angle);
		var newVel =  [this.vel[0] - (addedVel[0] * .3), this.vel[1] - (addedVel[1] * .3)];
		this.vel = newVel;
	};
	
	MovingObject.prototype.gunRecoil = function(recoil) {
		var addedVel = Asteroids.Util.itemVector(this.angle);
		var newVel =  [this.vel[0] - (addedVel[0] * recoil), this.vel[1] - (addedVel[1] * recoil)];
		this.vel = newVel;
	};
	
	MovingObject.prototype.bulletPos = function() {
		var randomizer = Math.random()
		if (randomizer > .5) {
			return [this.pos[0] + (Math.random() * 10), this.pos[1] + (Math.random() * 10)]
		} else {
			return [this.pos[0] - (Math.random() * 10), this.pos[1] - (Math.random() * 10)]
		}
		
	};
	
	MovingObject.prototype.fireBullet = function() {
		var addedVel = Asteroids.Util.itemVector(this.angle);
		var newVel = [(addedVel[0] * 7), (addedVel[1] * 7)];
		var bullet = new Asteroids.Bullet({
			game: this.game, 
			vel: [newVel[0], newVel[1]], 
			pos: this.bulletPos()
		});
		this.gunRecoil(.05);
		this.game.bullets.push(bullet);
	};
	
	MovingObject.prototype.fireCannon = function() {
		if (!this.cannonReloading) {
			var addedVel = Asteroids.Util.itemVector(this.angle);
			var newVel = [(addedVel[0] * 7), (addedVel[1] * 7)];
			var cannonBall = new Asteroids.Bullet({
				game: this.game, 
				vel: [newVel[0], newVel[1]], 
				pos: this.bulletPos(), 
				radius: "20", 
				color: "orange", 
				type: "indestructable"
			});
			this.gunRecoil(4);
			this.game.bullets.push(cannonBall);
		}
	};
	
	MovingObject.prototype.left = function() {
		this.angle -= .2
		if (Math.abs(this.angle) >= 6.25) {
			this.angle = 0
		}
		console.log(this.angle)
	};
	
	MovingObject.prototype.right = function() {
		this.angle += .2
		if (Math.abs(this.angle) >= 6.25) {
			this.angle = 0
		}
		console.log(this.angle)
	};
	
	var changeVel = function(vel) {
		if (vel > 0) {
			vel += 3
		} else if (vel < 0) {
			vel -= 3
		} 
		return vel
	}

})();

