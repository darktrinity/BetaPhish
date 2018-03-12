function Bait(index) {
	this.baity = 60;
	this.baitx = 100;
	this.textHeight = 100; 
	
	this.y = random() * ((0 + this.textHeight) - (height - this.baity)) + height - this.baity; //so bait can't spawn partially off screen
	this.x = random(width,width + width); //spawn them offscreen to give a sense of movement
	
	this.highlight = false;
	this.index = index;
	
	this.aliveFor = 0;
	
	this.speed = 1;
	
	this.isBait = [true,false,false,false,true,true,false,false,false,false];
	this.texts = ["https://uozone2.uottawa.ca/","https://uozone2.uottavva.ca/","subject:Please respond urgently","Canada_Revenue_Agency@isis.ocn.ne.jp","noreply@noreply.cibc.com","shipment-tracking@amazon.ca","amazon@gmail.com","please send the following info: name, age, SIN",
					"Your account has been compromised click here to reset your password: Log in to confirm your account", "Dear Customer"];
	
	this.eaten = false;
	this.incorrect = false;
	
	this.spriteB = createSprite(this.x,this.y,this.baitx+75,this.baity+120);
	this.spriteB.addAnimation("moving", "assets/Comp 1/Comp 1_0.png", "assets/Comp 1/Comp 1_1.png", "assets/Comp 1/Comp 1_2.png",
		"assets/Comp 1/Comp 1_3.png", "assets/Comp 1/Comp 1_4.png", "assets/Comp 1/Comp 1_5.png",
		"assets/Comp 1/Comp 1_6.png", "assets/Comp 1/Comp 1_7.png", "assets/Comp 1/Comp 1_8.png",
		"assets/Comp 1/Comp 1_9.png", "assets/Comp 1/Comp 1_10.png", "assets/Comp 1/Comp 1_11.png",
		"assets/Comp 1/Comp 1_12.png", "assets/Comp 1/Comp 1_13.png", "assets/Comp 1/Comp 1_14.png",
		"assets/Comp 1/Comp 1_15.png", "assets/Comp 1/Comp 1_16.png", "assets/Comp 1/Comp 1_17.png",
		"assets/Comp 1/Comp 1_18.png", "assets/Comp 1/Comp 1_19.png", "assets/Comp 1/Comp 1_20.png",
		"assets/Comp 1/Comp 1_21.png", "assets/Comp 1/Comp 1_22.png", "assets/Comp 1/Comp 1_23.png",
		"assets/Comp 1/Comp 1_24.png", "assets/Comp 1/Comp 1_25.png", "assets/Comp 1/Comp 1_26.png",
		"assets/Comp 1/Comp 1_27.png", "assets/Comp 1/Comp 1_28.png", "assets/Comp 1/Comp 1_29.png");
	this.spriteB.changeAnimation("moving");
	this.spriteB.scale = .35;
	
	this.show = function () {
		fill(100);
		if (this.highlight && this.isBait[index]) {
			fill(255,0,0); //incorrect
		} else if(this.highlight && !this.isBait[index]) {
			fill(0,255,0);//correct
		}
		drawSprites();
		//image(baitFish[i],this.x-50,this.y-50,this.baitx+75,this.baity+ 120);

	}
	
	this.crash = function () {
		console.log("space");
	}
	
	this.incSpeed = function (increment) {
		this.speed = increment;
	}
	
	this.hits = function (fish) {
		if (fish.x + fish.fishx > this.x && fish.x < this.x + this.baitx && fish.y + fish.fishy > this.y && fish.y < this.y + this.baity) {
			return true;
		}
	}
	
	this.getIndex = function (){
		return this.index;
	}
	
	this.gotEaten = function () {
		this.eaten = true;
		//this.endTime = new Date().getTime();
		//this.aliveFor += this.endTime - this.startTime;
	}
	
	//movement
	
	this.update = function () {
		this.x -= this.speed;
		this.spriteB.position.x = this.x;
		this.y -= 1 * sin(this.x * 3 * PI / 180);
		this.spriteB.position.y = this.y;
	}
	
	this.offscreen = function () {
		if(this.x < 20) {
			this.highlight = true;
		}
		return (this.x < -this.baitx);
	}
	

}
//movement of bait
//fishing line