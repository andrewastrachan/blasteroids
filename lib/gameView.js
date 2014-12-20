(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  GameView = Asteroids.GameView = function(game, ctx){
    this.game = game
    this.ctx = ctx
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
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
    var img = new Image();
		var that = this;
		
		img.onload = function () {
		  that.ctx.drawImage(img, 0, 0, 1000, 700);
			
			this.asteroidIntervalId = window.setInterval((function(){
				if (that.game.playing) { that.game.addAsteroids(); } 
			}), 10000)
			
			this.gameIntervalId = window.setInterval((function(){
			      that.game.step();
			      that.game.draw(that.ctx, img);
						
						if (that.checkLoss()){d
							that.bindRestart();
						} else {
							that.bindKeyHandlers();
							that.game.showScore(ctx);
						}
						
			    }).bind(this), 20);
		};
		
		
		
		img.src = "./images/space.jpg"
  };
	
  GameView.prototype.bindRestart = function() {
    window.key('r', function() {
      this.game.setupGame();
      window.key.unbind('r');
    }.bind(this));
  };
	
	GameView.prototype.checkLoss = function() {
		if (this.game.lives < 0) {
			this.game.endGame(this.ctx);
			// this.bindRestartKeys();
			debugger;
			return true;
		} 
		return false;
	};
  
})()