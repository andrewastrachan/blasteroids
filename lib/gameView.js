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
		key("w", function () { ship.power(); });
		key("s", function() {ship.brake(); })
		key("a", function() {ship.left(); })
		key("d", function() {ship.right(); })
		key("space", function() { ship.fireBullet(); })
		key("e", function() { ship.fireCannon(); })
  };

  GameView.prototype.start = function() {
    var game = this.game
    var img = new Image();
		that = this;
		
		img.onload = function () {
		  that.ctx.drawImage(img, 0, 0, 800, 600);
			
			window.setInterval((function(){
			      game.step();
			      game.draw(that.ctx, img);
			    }).bind(this), 20);

			that.bindKeyHandlers();
		};
		img.src = "./images/space.jpg"
		


  };
	
  
})()