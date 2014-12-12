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
	
	MovingObject.prototype.power = function(impulse) {
		var addedX = this.vel[0] + impulse[0]
		var addedY = this.vel[1] + impulse[1]
			
		this.vel = [addedX, addedY]
	};
	
	MovingObject.prototype.fireBullet = function() {
		var xVel = changeVel(this.vel[0])
		var yVel = changeVel(this.vel[1])
		var bullet = new Asteroids.Bullet({game: this.game, vel: [xVel, yVel], pos: this.pos})
		this.game.bullets.push(bullet)
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

//Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)
