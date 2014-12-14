(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  GameView = Asteroids.GameView = function(game, ctx){
    this.game = game
    this.ctx = ctx
  };
	
  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ships[0];
	    var keys = key.getPressedKeyCodes();
	    if (keys.indexOf(65) != -1) {
	      ship.left();
	    }
	    if (keys.indexOf(87) != -1) {
	      ship.power();
	    } 
	    if (keys.indexOf(68) != -1) {
	      ship.right();
	    }
	    if (keys.indexOf(83) != -1) {
	      ship.brake();
	    }
	    if (keys.indexOf(32) != -1) {
	      ship.fireBullet();
	    }
	    if (keys.indexOf(69) != -1) {
	      ship.fireCannon();
	    }
  };

  GameView.prototype.start = function() {
    var game = this.game;
    var img = new Image();
		that = this;
		
		img.onload = function () {
		  that.ctx.drawImage(img, 0, 0, 1000, 700);
			
			var asteroidInterval = setInterval((function(){
				that.game.addAsteroids();
			}), 10000)
			
			var gameInterval = setInterval((function(){
				that.bindKeyHandlers();
			      game.step();
			      game.draw(that.ctx, img);
						if (that.checkLoss()){
							clearInterval(gameInterval)
						} else {
							game.showScore(ctx);
						}
			    }).bind(this), 20);

			that.bindKeyHandlers();
		};
		img.src = "./images/space.jpg"
  };
	
	GameView.prototype.checkLoss = function() {
		if (this.game.lives < 0) {
			this.game.endGame(this.ctx);
			// this.bindRestartKeys();
			return true;
		} 
		return false;
	}
  
})()