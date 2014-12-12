(function() {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }
  

  var Game = Asteroids.Game = function(){
    this.DIM_X = 800;
    this.DIM_Y = 600;
    this.NUM_ASTEROIDS = 10;
    this.asteroids = [];
    this.ships = [];
		this.bullets = [];
    
    this.addAsteroids();
    this.addShip();
  };

  Game.prototype.addShip = function() {
    var ship = new Asteroids.Ship({
          pos: this.randomPosition(),
          game: this
        });

    this.ships.push(ship);

    return ship;
  };
  
  Game.prototype.addAsteroids = function(){
    for (var i = 0; i < this.NUM_ASTEROIDS; i++){
      this.asteroids.push(new Asteroids.Asteroid({
      	game: this
      }));
    }
  };
	
	Game.prototype.remove = function (object) {
		if (object instanceof Asteroids.Bullet) {
			this.bullets.splice(this.bullets.indexOf(object), 1);
		} else if (object instanceof Asteroids.Asteroid){
			var idx = this.asteroids.indexOf(object);
			this.asteroids.splice(idx, 1)
		} else if (object instanceof Asteroids.Ship) {
			this.ships.splice(this.ships.indexOf(object), 1);
		} else {
			throw "noooooooo"; 
		}
	};
	
	Game.prototype.allObjects = function() {
		return [].concat(this.asteroids).concat(this.ships).concat(this.bullets)
		
	};
  
  Game.prototype.randomPosition = function(){
    var posx = Math.floor(Math.random() * this.DIM_X);
    var posy = Math.floor(Math.random() * this.DIM_Y);
    return [posx, posy];
  };
  
  Game.prototype.draw = function(ctx, img){
		ctx.drawImage(img, 0, 0, 800, 600);
    
    this.allObjects().forEach(function(object){
			
      object.draw(ctx);
    });
  };
  
  Game.prototype.moveObjects = function(){
    this.allObjects().forEach(function(object){
      object.move();
    });
  };
  
  Game.prototype.wrap = function(pos) {
    var x = pos[0];
    var y = pos[1];
    if (x <= 0) {
      x = x + this.DIM_X;
    } else if (x >= this.DIM_X) {
      x = 0;
    }
    if (y <= 0) {
      y = y + this.DIM_Y;
    } else if (y >= this.DIM_Y) {
      y = 0
    }
    return [x, y]
  };
  
  //this function is why my asteroid checks for collision with the bullet and no the other way around
  Game.prototype.checkCollisions = function(){
    for (var i = 0; i < this.allObjects().length; i++){
      for (var j = (i + 1); j < this.allObjects().length; j++){
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])){
					this.allObjects()[i].collideWith(this.allObjects()[j])
        }
      }
    }
  };
  
  Game.prototype.step = function(){
    this.moveObjects();
    this.checkCollisions();
  };
	
	Game.prototype.isOutOfBounds = function(pos){
    var x = pos[0];
    var y = pos[1];
		if ((x <= 0) || (x >= this.DIM_X) || (y <= 0) || (y >= this.DIM_Y)) {
			return true;
		}
		
		return false;
	}
  

})();