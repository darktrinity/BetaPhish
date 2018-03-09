function Fish() {
	this.life = 3;
	
	this.y = height/2;
	this.x = width/2;
	this.textHeight = 100; 
	
	this.fishy = 60;
	this.fishx = 100;
	
	this.selected = false;
	
	this.velocity = 8;
	
	this.show = function () {
		fill(255);
		rect(this.x, this.y, this.fishx, this.fishy);
	}
	this.setX = function(x){
		this.x = x;
	}
	
	this.setY = function(y){
		this.y = y;
	}
	
	
	//single text
	this.on = function() {
		this.selected = true;
	}
	
	this.off = function () {
		this.selected = false;
	}
	//movement
	this.up = function () {
		this.y -= this.velocity;
	}
	this.upLeft = function () {
		this.y -= sqrt(this.velocity)/2;
		this.x -= sqrt(this.velocity)/2;
	}
	this.upRight = function () {
		this.y -= sqrt(this.velocity)/2;
		this.x += sqrt(this.velocity)/2;
	}
	this.down = function () {
		this.y += this.velocity;
	}
	this.downLeft = function () {
		this.y += sqrt(this.velocity)/2;
		this.x -= sqrt(this.velocity)/2;
	}
	this.downRight = function () {
		this.y += sqrt(this.velocity)/2;
		this.x += sqrt(this.velocity)/2;
	}
	this.left = function () {
		this.x -= this.velocity;
	}
	this.right = function () {
		this.x += this.velocity;
	}
	this.takeDmg = function () {
		this.life -= 1;
	}
	
	
	this.update = function () {
		//canvas borders
		if (this.y > height - this.fishy) {
			this.y = height - this.fishy;
		}
		if (this.x > width - this.fishx) {
			this.x = width - this.fishx;
		}
		if (this.y < 0 + this.textHeight) {
				this.y = 0  + this.textHeight
		}
		if (this.x < 0) {
				this.x = 0
		}
	}
	
	
}