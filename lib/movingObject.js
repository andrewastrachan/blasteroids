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
	
	MovingObject.prototype.collideWith = function(options){
		; // do nothing
	};
	
	//keep this around for testing
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
	
  MovingObject.prototype.isCollidedWith = function(otherObject){
    sumOfRadii = parseInt(this.radius) + parseInt(otherObject.radius);
    var x1 = this.pos[0];
    var x2 = otherObject.pos[0];
    var y1 = this.pos[1];
    var y2 = otherObject.pos[1];
    
    
    dist = Math.sqrt( (Math.pow((x1 - x2), 2)) + (Math.pow((y1 - y2), 2)) );
    if (dist > sumOfRadii){
      return false;
    } else {
      return true;
    }
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
	
  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
	
})();

