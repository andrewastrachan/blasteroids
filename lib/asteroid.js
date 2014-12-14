(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var COLOR = "red";
  var RADIUS = "20";
 	var ITEMS = ["1", "2", "3", "4", "5", "6", "7"];
  var Util = Asteroids.Util;
	
	
	var pickRandomFile = function() {
		var item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
		var imageLink = "./images/asteroids/".concat(item).concat(".png");
		return imageLink;
	};
	
	var pickRandomSound = function() {
		var fileExts = ["1", "2"];
		var num = fileExts[Math.floor(Math.random() * fileExts.length)];
		var sound = "./sounds/bomb_explosion_".concat(num).concat(".mp3") 
		return new Audio(sound)
	};
 
  var Asteroid = Asteroids.Asteroid = function(options){
		
    this.astImg = new Image();
    this.astImg.src = pickRandomFile();
		this.exploding = false; 
		this.sound = pickRandomSound();
    options.pos = options.pos || options.game.randomPosition();
    options.color = COLOR;
    options.radius = RADIUS;
    options.vel = options.vel || Asteroids.Util.randomVec(2);
		this.setState();
		Asteroids.MovingObject.call(this, options);
  };
	
	
	Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);
	
	Asteroid.prototype.setState = function() {
		var that = this;
		this.state = "new"
		setTimeout(function(){ that.state = "old" }, 2000)
	}
	
  Asteroid.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
		if (!this.exploding) {
			console.log(this.state)
			if (this.state === "new") {
				ctx.globalAlpha = 0.5;
	    	ctx.drawImage(this.astImg, -40, -40, 80, 80);
				ctx.globalAlpha = 1.0;
			} else {
				ctx.drawImage(this.astImg, -40, -40, 80, 80);
			}
			

		} else {
			if (this.spriteFrame <= 36) {
				if (this.spriteInterval % 3 === 0) {
					this.spriteXDIM += 66;

					if (this.spriteFrame % 6 === 0) {
						this.spriteXDIM = 0;
						this.spriteYDIM += 66;
					}

					this.spriteFrame += 1;
				}
				this.spriteInterval += 1

			}
			ctx.drawImage(this.astImg, this.spriteXDIM, this.spriteYDIM, 66, 66, -40, -40, 140, 140)
		}
    ctx.restore();
  };
	
	Asteroid.prototype.handleExplosion = function() {
		this.radius = "0"
		this.spriteFrame = 1;
		this.spriteInterval = 0
		this.spriteXDIM = 0
		this.spriteYDIM = 0
		this.astImg = new Image();
		this.astImg.src = ("./images/explosion.png");
		this.exploding = true;
		var that = this;
		setTimeout(function(){ that.game.remove() }, 2000);
	};
	
  Asteroid.prototype.collideWith = function(otherObject) {
  	if (otherObject instanceof Asteroids.Ship) {
  		if (this.state === "old") {
				otherObject.relocate();
				this.game.lives -= 1;
				return true;
  		}
  	} else if (otherObject instanceof Asteroids.Bullet) {
			this.sound.play();
  		if (otherObject.type === "destructable") this.game.remove(otherObject);
			this.handleExplosion();
			this.game.score += 10
  	} else if (otherObject instanceof Asteroids.Asteroid) {
  		var otherVel = otherObject.vel
			otherObject.vel = this.vel
			this.vel = otherVel
  	}
		
		return false; 
  }
	
	
})()