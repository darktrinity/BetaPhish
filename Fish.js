function Fish() {
	this.life = 5;
	
	this.y = height/2;
	this.x = width/2;
	this.textHeight = 125; 
	
	this.fishy = 60;
	this.fishx = 100;
	
	this.selected = false;
	
	this.velocity = 8;
	
	this.spriteF = createSprite(this.x,this.y,this.baitx+75,this.baity+120);
	this.spriteF.addAnimation("moving", "assets/Comp 2/Comp 1_0.png", "assets/Comp 2/Comp 1_1.png", "assets/Comp 2/Comp 1_2.png",
		"assets/Comp 2/Comp 1_3.png", "assets/Comp 2/Comp 1_4.png", "assets/Comp 2/Comp 1_5.png",
		"assets/Comp 2/Comp 1_6.png", "assets/Comp 2/Comp 1_7.png", "assets/Comp 2/Comp 1_8.png",
		"assets/Comp 2/Comp 1_9.png", "assets/Comp 2/Comp 1_10.png", "assets/Comp 2/Comp 1_11.png",
		"assets/Comp 2/Comp 1_12.png", "assets/Comp 2/Comp 1_13.png", "assets/Comp 2/Comp 1_14.png",
		"assets/Comp 2/Comp 1_15.png", "assets/Comp 2/Comp 1_16.png", "assets/Comp 2/Comp 1_17.png",
		"assets/Comp 2/Comp 1_18.png", "assets/Comp 2/Comp 1_19.png", "assets/Comp 2/Comp 1_20.png",
		"assets/Comp 2/Comp 1_21.png", "assets/Comp 2/Comp 1_22.png", "assets/Comp 2/Comp 1_23.png",
		"assets/Comp 2/Comp 1_24.png", "assets/Comp 2/Comp 1_25.png", "assets/Comp 2/Comp 1_26.png",
		"assets/Comp 2/Comp 1_27.png", "assets/Comp 2/Comp 1_28.png", "assets/Comp 2/Comp 1_29.png");
	this.spriteF.changeAnimation("moving");
	this.spriteF.scale = .35;
	
	
	this.show = function () {
		fill(255);
		drawSprites();
	}
	this.setX = function(x){
		this.x = x + 50;
		this.spriteF.position.x = this.x;
	}
	
	this.setY = function(y){
		this.y = y + 25;
		this.spriteF.position.y = this.y;
	}
	
	this.killBait = function () {
		this.spriteF.visible = false;
		this.spriteF.life = 0;
	}
	
	//single text
	this.on = function() {
		this.selected = true;
	}
	
	this.off = function () {
		this.selected = false;
	}
	//movement
	this.takeDmg = function () {
		this.life -= 1;
	}
	
	
	this.update = function () {
		//canvas borders
		if (this.y > height - this.fishy) {
			this.y = height - this.fishy  + 50;
		}

		
		if (this.x > width - this.fishx) {
			this.x = width - this.fishx  + 50;
		}

		
		if (this.y < 0 + this.textHeight) {
				this.y = 0  + this.textHeight
		}

		
		if (this.x < 0) {
				this.x = 0;
		}

	}
	
	
}