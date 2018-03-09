//objects
var fish;
var shark;
var eel;
var bait = [];

//key binds
var w = 87; 
var a = 65;
var d = 68;
var s = 83;

//sound effects
var correctSound = new Audio("sounds/correct.wav");
var incorrectSound  = new Audio("sounds/incorrect.wav");

//images
//var betaPhish = new Image("assets/logo-xl.png");
//var signature = new Image("assets/thanh-wordmark.png");
var betaPhish;
var signature;
var fisher;
var paralax = [];
var life = [];


var selected = -1;

var btn1;
var btn2;
var btn3;
var bar;
var percentage;

var title;

var current = -1;
var numText = 10;
var score = 0;

var gameState = 0;
var tw;

var globalSpeed = 1;
var startBtn;
//var startBtn = document.createElement("IMG");

var button1On = false;
var resultImg;

var test;

function preload() {
	betaPhish = loadImage("assets/logo-xl.png");
	signature = loadImage("assets/thanh-wordmark.png");
	fisher = loadImage("assets/fisherman.png");
	
	for (var i=1; i<= 4; i++) {
		paralax[i]= loadImage("assets/home_mtn_"+i+".png");
	}
	life[1]= loadImage("assets/life-12.png");
	life[2]= loadImage("assets/life-2.png");
	life[3]= loadImage("assets/life-3.png");
	
	test = loadImage("assets/Comp 1/Comp 1_00000.png");
	btn1 = createImg("assets/btn1.png","btn1");
	btn2 =  createImg("assets/btn2.png","btn2");
	btn3 =  createImg("assets/btn3.png","btn3");
	resultImg = loadImage("assets/test.png");
	percentage = loadImage("assets/percentageActive.png");
	bar = loadImage("assets/percentage.png"); 
}

function setup() {
	createCanvas (1280,720);
	frameRate(60);
}

///////////////////////////////////////////
function initGame() {
	fill(255);
	background(color(245, 245, 220));
	gameState = 0;
	
	for (var i=1; i<= 4; i++) {
		image(paralax[i],mouseX - (i * 2),25,1280,300);
	}
	
	image(betaPhish,width - 450,10);
	image(signature,50,height - 100);
	image(fisher,200,300);
	image(life[2],200,300);

	//buttons
	btn1.position(width - 350,10 + 400).mouseOver(buttons1On);
	btn2.position(width - 350,10 + 500).mouseOver(buttons2On);
	btn3.position(width - 350,10 + 600).mouseOver(buttons3On);;
	loop();
}

//Home menu button actions
function buttons1On(){
	btn1.hide();
	btn1 = createImg("assets/btn1-active.png","btn1").position(width - 350,10 + 400).mousePressed(levelSelect).mouseOut(buttons1Off);
}

function buttons1Off(){
	btn1.hide();
	btn1 = createImg("assets/btn1.png","btn1").position(width - 350,10 + 400).mouseOver(buttons1On);
}

function buttons2On(){
	btn2.hide();
	btn2 = createImg("assets/btn2-active.png","btn2").position(width - 350,10 + 500).mousePressed(levelSelect).mouseOut(buttons2Off);
}

function buttons2Off(){
	btn2.hide();
	btn2 = createImg("assets/btn2.png","btn2").position(width - 350,10 + 500).mouseOver(buttons2On);
}

function buttons3On(){
	btn3.hide();
	btn3 = createImg("assets/btn3-active.png","btn3").position(width - 350,10 + 600).mousePressed(levelSelect).mouseOut(buttons3Off);
}

function buttons3Off(){
	btn3.hide();
	btn3 = createImg("assets/btn3.png","btn3").position(width - 350,10 + 600).mouseOver(buttons3On);
}
///////////////////////////////////////////


function levelSelect() {
	btn1.remove();
	btn2.remove();
	btn3.remove();
	
	gameState = 1;
	background(color(160, 221, 250));
	textSize(150);
	title = "LEVEL SELECT";
	fill(255);
	tw = textWidth(title);
	text(title, (width - tw)/2, height/2 - 40);
	levelStart = createButton('Level 1');
	levelStart.position(width/2 - levelStart.width/2, height/2);
	levelStart.mousePressed(setupGame);
	noLoop();
}

function levelSelect2() {
	levelStart.hide();
	gameState = 1;
	background(color(160, 221, 250));
	textSize(150);
	title = "LEVEL SELECT";
	fill(255);
	tw = textWidth(title);
	text(title, (width - tw)/2, height/2 - 40);
	levelStart = createButton('Level 1');
	levelStart.position(width/2 - levelStart.width/2, height/2);
	levelStart.mousePressed(setupGame);
	noLoop();
}

function setupGame(){
	levelStart.hide();
	score = 0;
	life = 3;
	bait = [];
	gameState = 2;
	fish = new Fish();
	shark = new Enemy(0);
	eel = new Enemy(1);
	for (var i=0; i<10; i++) {
		bait.push(new Bait(floor(random(numText - 1))));
	}
	loop();
}

function endScreen(win){
	background(color(160, 221, 250));
	textSize(150);
	if (win) {
		title = "Congratulation";
	} else if (!win) title = "You lose";
	fill(255);
	tw = textWidth(title);
	text(title, (width - tw)/2, height/2 - 40);
	levelStart = createButton('Play Again');
	levelStart.position(width/2 - levelStart.width/2, height/2);
	levelStart.mousePressed(levelSelect2);
	noLoop();
}


function game() {
	background(color(160, 221, 250));
	textSize(20);
	text(score,10,30);
	text(fish.life,640,30);
	//for (var i=1; i<= 3; i++) {
	image(fisher,200,300);
	image(life[1],200,300);
	//}
	
	//bait
	if (frameCount % 10000 == 0) {
		globalSpeed = globalSpeed + 1;
	}
	
	for (var i= bait.length - 1; i >= 0; i--) {
		bait[i].update();
		if (bait[i].eaten == false) {
			bait[i].show();
		}
		//if (bait[i].incorrect == true) {
			//bait[i].show();
		//}
		if  (!bait[i].hits(fish) && bait[i].eaten == false && fish.selected == true) {
			fish.off();
		} else if (bait[i].hits(fish) && bait[i].eaten == false && fish.selected == false && bait[i] && bait[i].incorrect == false){
			textSize(20);
			text(bait[i].texts[bait[i].index], 10, 60);
			text(bait[i].isBait[bait[i].index], 10, 90);
			current = i;
			fish.on();
			
		}
		if (bait[i].offscreen()) { //removes when off screen
			if (i == selected) selected = -1;
			if (bait[i].isBait[bait[i].index] == false && bait[i].eaten == false) {
				score += 100;
					
				push();
				correctSound.play();
				pop();
					
			} else if (bait[i].isBait[bait[i].index] == true && bait[i].eaten == false){
				score -= 100;
				//fish.takeDmg();
					
				push();
				incorrectSound.play();
				push();
			}
			bait.splice(i,1);
			bait.push(new Bait(floor(random(numText - 1))));
		}
		if (shark.hits(fish)) {
			//fish.takeDmg();
		}
		if (eel.hits(fish)) {
			//fish.takeDmg();
		}
		
		bait[i].incSpeed(globalSpeed);
	}
	
	//fish
	fish.update();
	fish.show();
	
	if (selected != -1) {
		imageMode(CENTER);
		image(resultImg, width/2, height/2);
		resultImg.resize(750,600);
		imageMode(CORNER);
		image(percentage,0,0,bait[selected].x,40);
		if (keyIsDown(a)) {
			bait[current].gotEaten();
			if (bait[current].isBait[bait[current].index] == true){
				score += 100;
				
				push();
				correctSound.play();
				pop();
				
			} else {
				score -= 100;
				fish.takeDmg() ; //eat bait
				
				push();
				incorrectSound.play();
				pop();
				
				bait[current].crash();
			}
			selected = -1;
		}
		if (keyIsDown(d)) {
			bait[current].gotEaten();
			if (bait[current].isBait[bait[current].index] == false){
				score += 100;
				correctSound.play();
			} else {
				score -= 100;
				fish.takeDmg() ; //eat bait
				
				push();
				incorrectSound.play();
				pop();
				
				bait[current].crash();
			}
			selected = -1;
		}
	}
	
	//shark enemy
	//shark.update(fish);
	//shark.show();
	
	//eel
	//eel.update(fish);
	//eel.show();
	
	//mouse movements
	fish.setX(mouseX - 50);
	fish.setY(mouseY - 30);
	
	/* wasd movement
	if (keyIsDown(w) && keyIsDown(d)){ 
		fish.upRight();
	}
	if (keyIsDown(w) && keyIsDown(a)){
		fish.upLeft();
	}
	if (keyIsDown(s) && keyIsDown(d)){
		fish.downRight();
	}
	if (keyIsDown(s) && keyIsDown(a)){
		fish.downLeft();
	}
	
	if (keyIsDown(w) && (!keyIsDown(a) || !keyIsDown(d))) {
		fish.up();
	}
	if (keyIsDown(s) && (!keyIsDown(a) || !keyIsDown(d))) {
		fish.down();
	}
	if (keyIsDown(a) && (!keyIsDown(w) || !keyIsDown(s))) {
		fish.left();
	}
	if (keyIsDown(d)&& (!keyIsDown(w) || !keyIsDown(s))) {
		fish.right();
	}
	*/
	
	if (score >= 1000) {
		endScreen(true);
	}//else if( fish.life <= 0) {
		//endScreen(false);
	//}
	
}

function draw() {
	if (gameState == 0) {//main menu
		initGame();
	}
	else if (gameState == 1) {
		levelSelect();
	}
	else if (gameState == 2) {//in game
		game();//level
	}
	else if (gameState == 3) {
		if (score >= 1000) {
			endScreen(true);
		}
		//else if( fish.life <= 0) {
			//endScreen(false);
		//}
	}
}
/*
function keyTyped () {
	if (key == ' ') { 
		if (bait[current].hits(fish) && bait[current].eaten == false) {
			bait[current].gotEaten();
			if (bait[current].isBait[bait[current].index] == true){
				score += 100;
				correctSound.play();
			} else {
				score -= 100;
				//fish.takeDmg() ; //eat bait
				incorrectSound.play();
				bait[current].crash();
			}
		}
	}
}*/

function keyTyped() {
	if (key == ' '){
		if (bait[current].hits(fish) && bait[current].eaten == false) {
			selected = current;
		}
	}
}