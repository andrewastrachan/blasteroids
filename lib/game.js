(function() {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }
  

  var Game = Asteroids.Game = function(){
    this.DIM_X = 1000;
    this.DIM_Y = 700;
		this.setupGame();
  };
	
  Game.prototype.addAsteroids = function(){
    for (var a = 0; a < this.numAsteroids; a++){
    	var newAsteroid = new Asteroids.Asteroid({game: this})
				if (!newAsteroid.isCollidedWith(this.ship)) {
					this.asteroids.push(newAsteroid);
				} else {
					a -= 1
				}
    }
		this.numAsteroids += 1
  };
	
	Game.prototype.allObjects = function() {
		return [].concat(this.asteroids).concat([this.ship]).concat(this.bullets)
		
	};
	
  Game.prototype.checkCollisions = function(){
    for (var i = 0; i < this.allObjects().length; i++){
      for (var j = (i + 1); j < this.allObjects().length; j++){
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])){
					this.allObjects()[i].collideWith(this.allObjects()[j])
        }
      }
    }
  };
	
  Game.prototype.draw = function(ctx, img){
		ctx.drawImage(img, 0, 0, this.DIM_X, this.DIM_Y);
    
    this.allObjects().forEach(function(object){
			
      object.draw(ctx);
    });
  };
	
	Game.prototype.endGame = function(ctx) {
		ctx.font = "80px Arial";
		ctx.strokeStyle = 'black';
		
		ctx.fillStyle = "yellow";
		ctx.fillText("Final Score:" + " " + this.score, 200, 400);
		ctx.strokeText("Final Score:" + " " + this.score, 200, 400);
		ctx.font = "40px Arial";
		ctx.fillStyle = "yellow";
		ctx.fillText("Press 'R' to restart", 200, 450);
		ctx.strokeText("Press 'R' to restart", 200, 450);
		this._music.pause();
		this.playing = false;
	};
	
	Game.prototype.isOutOfBounds = function(pos){
    var x = pos[0];
    var y = pos[1];
		if ((x <= 0) || (x >= this.DIM_X) || (y <= 0) || (y >= this.DIM_Y)) {
			return true;
		}
		
		return false;
	};
	
  Game.prototype.moveObjects = function(){
    this.allObjects().forEach(function(object){
      object.move();
    });
  };
	
	Game.prototype.playMusic = function() {
		var sound = "./sounds/music.mp3"
		this._music = new Audio(sound)
		this._music.play()
	};
	
  Game.prototype.randomPosition = function(){
    var posx = Math.floor(Math.random() * this.DIM_X);
    var posy = Math.floor(Math.random() * this.DIM_Y);
    return [posx, posy];
  };
	
	Game.prototype.remove = function (object) {
		if (object instanceof Asteroids.Bullet) {
			this.bullets.splice(this.bullets.indexOf(object), 1);
		} else if (object instanceof Asteroids.Asteroid){
			var idx = this.asteroids.indexOf(object);
			this.asteroids.splice(idx, 1)
			this.score += 10
		} else if (object instanceof Asteroids.Ship) {
			//do nothing
		} else {
			throw "noooooooo"; 
		}
	};
	
	Game.prototype.setupGame = function() {
    this.numAsteroids = 4;
    this.asteroids = [];
    this.ship = new Asteroids.Ship({
          pos: this.randomPosition(),
          game: this
        });
		this.bullets = [];
		this.lives = 3;
		this.score = 0;
		this.round = 1;
		this.playing = true;
		this.playMusic();
    this.addAsteroids();
	};

	Game.prototype.showScore = function(ctx) {
		ctx.font = "20px Arial";
		ctx.fillStyle = "yellow";
		ctx.fillText("Score:" + " " + this.score, 50, 50)
		ctx.fillText("Lives:" + " " + this.lives, 50, 80)
	};
	
	//this function checks if the asteroids are all destroyed, advances round
  Game.prototype.step = function(){
    this.moveObjects();
    this.checkCollisions();
		debugger;
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
  
})();