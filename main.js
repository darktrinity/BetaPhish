//objects
var fish;
var shark;
var eel;


//key binds
var w = 87; 
var a = 65;
var d = 68;
var s = 83;

//sound effects
var correctSound = new Audio("sounds/correct.wav");
var incorrectSound  = new Audio("sounds/incorrect.wav");

//images
var betaPhish;
var signature;
var fisher;
var paralax = [];
var lives = [];
var liveContainer;
var rewardScreen = [];
var bait = [];
var percentage;
var spam;
var safe;

var controls;
var backBtn;

var btn1;
var btn2;
var btn3;

var playAgain;
var mainMenu;

var bar;
var reverse;
var mountains = [];

var testquestions = [];

//fonts
var myFont;

var selected = -1;

var title;

var current = -1;
var numText = 14;
var score = 0;

var gameState = 0;
var tw;

var globalSpeed = 1;
var startBtn;

var button1On = false;
var resultImg;

var test;
var paralax;

var mx;
var my;


var fisherX = 200;
var fisherY = 300;

function preload() {
	betaPhish = loadImage("assets/logo-xl.png");
	signature = loadImage("assets/thanh-wordmark.png");
	fisher = loadImage("assets/fisherman.png");
	for (var i=1; i<= 4; i++) {
		paralax[i]= loadImage("assets/home_mtn_"+i+".png");	
	}
	reverse = loadImage("assets/home_mtn_3 -reverse.png");	
	
	liveContainer = loadImage("assets/score-container.png");
	
	for (var i=1; i<= 3; i++) {
		lives[i]= loadImage("assets/life-"+i+".png");
	}
	
	for (var i=0; i< 4; i++) {
		rewardScreen[i]= loadImage("assets/score-"+i+".png");	
	}
	
	for (var i=0; i< 15; i++) {
		testquestions[i]= loadImage("assets/PhishingTest/test_"+i+".png");	
	}
	
	spam = loadImage("assets/btn-spam.png");
	safe = loadImage("assets/btn-safe.png");
	
	btn1 = createImg("assets/btn1.png","btn1");
	btn2 =  createImg("assets/btn2.png","btn2");
	btn3 =  createImg("assets/btn3.png","btn3");
	btn1.hide();
	btn2.hide();
	btn3.hide();
	
	playAgain = createImg("assets/btn1.png","btn4");
	mainMenu =  createImg("assets/btn2.png","btn5");
	
	controls = loadImage("assets/Controls.png");
	backBtn = createImg("assets/btn3.png","btn6");
	backBtn.hide();
	
	playAgain.hide();
	mainMenu.hide();
	
	//resultImg = loadImage("assets/test.png");
	percentage = loadImage("assets/percentageActive.png");
	bar = loadImage("assets/percentage.png"); 
	
	myFont = loadFont ("assets/fonts/mangat.ttf");
}

function setup() {
	createCanvas (1280,720);
	frameRate(60);
}

///////////////////////////////////////////
function initGame() {
	playAgain.remove();
	mainMenu.remove();
	backBtn.remove();
	
	fill(255);
	background(color(245, 245, 220));
	gameState = 0;
	
	for (var i=1; i<= 4; i++) {
		image(paralax[i],0 - (i * 2),0,1300,300);
	}
	
	
	image(betaPhish,width - 450,10);
	image(signature,50,height - 100);
	image(fisher,fisherX,fisherY);

	//buttons
	btn1 = createImg("assets/btn1.png","btn1");
	btn2 =  createImg("assets/btn2.png","btn2");
	btn3 =  createImg("assets/btn3.png","btn3");
	btn1.position(width - 350,10 + 400).mouseOver(buttons1On);
	btn2.position(width - 350,10 + 500).mouseOver(buttons2On);
	btn3.position(width - 350,10 + 600).mouseOver(buttons3On);
	noLoop();
}

//Home menu button actions
function buttons1On(){
	btn1.hide();
	btn1 = createImg("assets/btn1-active.png","btn1").position(width - 350,10 + 400).mousePressed(setupGame).mouseOut(buttons1Off);
}

function buttons1Off(){
	btn1.hide();
	btn1 = createImg("assets/btn1.png","btn1").position(width - 350,10 + 400).mouseOver(buttons1On);
}

function buttons2On(){
	btn2.hide();
	btn2 = createImg("assets/btn2-active.png","btn2").position(width - 350,10 + 500).mousePressed(controlScreen).mouseOut(buttons2Off);
}

function buttons2Off(){
	btn2.hide();
	btn2 = createImg("assets/btn2.png","btn2").position(width - 350,10 + 500).mouseOver(buttons2On);
}

function buttons3On(){
	btn3.hide();
	btn3 = createImg("assets/btn3-active.png","btn3").position(width - 350,10 + 600).mousePressed(setupGame).mouseOut(buttons3Off);
}

function buttons3Off(){
	btn3.hide();
	btn3 = createImg("assets/btn3.png","btn3").position(width - 350,10 + 600).mouseOver(buttons3On);
}

function initGame2() {
	mainMenu.hide();
	gameState = 0;
	for (var i=0; i< bait.length; i++) {
		bait[i].killBait();
	}
	fish.killBait();
	initGame();
	noLoop();
}
///////////////////////////////////////////
function controlScreen() {
	btn1.remove();
	btn2.remove();
	btn3.remove();
	fill(255);
	background(color(245, 245, 220));
	gameState = 0;
	
	image(controls,0,0);

	//buttons
	backBtn = createImg("assets/btn1.png","btn6");
	backBtn.position(0 + 25, 0 + 25).mouseOver(backOn);
	noLoop();
}

function backOn(){
	backBtn.hide();
	backBtn = createImg("assets/btn1-active.png","btn1").position(0 + 25, 0 + 25).mousePressed(initGame).mouseOut(backOff);
}

function backOff(){
	backBtn.hide();
	backBtn = createImg("assets/btn1.png","btn1").position(0 + 25, 0 + 25).mouseOver(backOn);
}
///////////////////////////////////////////
/*
function levelSelect() {
	btn1.remove();
	btn2.remove();
	btn3.remove();
	playAgain.remove();
	mainMenu.remove();
	
	gameState = 1;
	background(color(245, 245, 220));
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
*/

function levelSelect2() {
	levelStart.hide();
	gameState = 1;
	for (var i=0; i< bait.length; i++) {
		bait[i].killBait();
	}
	fish.killBait();
	levelSelect();
	noLoop();
}

function setupGame(){
	btn1.remove();
	btn2.remove();
	btn3.remove();
	playAgain.remove();
	mainMenu.remove();
	//levelStart.hide();
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

////////////////////////////////////////////////////
function endScreen(win){
	background(color(245, 245, 220));
	textSize(150);
	for (var i=1; i<= 4; i++) {
		image(paralax[i],0 - (i * 2),0,1300,300);
	}
	
	if (win) {
		if (fish.life == 3) {
			image(rewardScreen[3], 0, 0);
		} else if (fish.life == 2) {
			image(rewardScreen[2], 0, 0);
		} else if (fish.life == 1) {
			image(rewardScreen[1], 0, 0);
		} 
	} else if (!win) image(rewardScreen[0], 0, 0);
	fill(255);
	//title = "Congratulations";
	//tw = textWidth(title);
	//text(title, (width - tw)/2, height/2 - 40);
	
	playAgain.show();
	mainMenu.show();
	playAgain = createImg("assets/btn1.png","btn4");
	mainMenu =  createImg("assets/btn2.png","btn5");
	playAgain.position(width - 350,10 + 400).mouseOver(playAgainOn);
	mainMenu.position(width - 350,10 + 500).mouseOver(mainMenuOn);
	noLoop();
}

function playAgainOn(){
	playAgain.hide();
	playAgain = createImg("assets/btn1-active.png","btn1").position(width - 350,10 + 400).mousePressed(initGame2).mouseOut(playAgainOff);
}

function playAgainOff(){
	playAgain.hide();
	playAgain = createImg("assets/btn1.png","btn1").position(width - 350,10 + 400).mouseOver(playAgainOn);
}

function mainMenuOn(){
	mainMenu.hide();
	mainMenu = createImg("assets/btn2-active.png","btn2").position(width - 350,10 + 500).mousePressed(initGame2).mouseOut(mainMenuOff);
}

function mainMenuOff(){
	mainMenu.hide();
	mainMenu = createImg("assets/btn2.png","btn2").position(width - 350,10 + 500).mouseOver(mainMenuOn);
}
///////////////////////////////////////////////////////
           
function game() {
	background(color(245, 245, 220));
	textSize(20);
	textFont(myFont);
	fill(0, 0, 0);
	image(reverse,0,0 - 100,1300,300);
	text(score,10,60);
	text("Lives:",480,60);
	for (var i=1; i<= 3; i++) {
		image(liveContainer,550 + ((i-1)*75),25,60,60);
	}
	for (var i=1; i<= fish.life; i++) {
		image(lives[i],540 + ((i-1)*75),15,75,75);
	}

	//bait
	if (frameCount % 10000 == 0) {
		globalSpeed = globalSpeed + 1;
	}
	
	for (var i= bait.length - 1; i >= 0; i--) {
		bait[i].update();
		if (bait[i].eaten == false) {
			bait[i].show();
		}
		if  (!bait[i].hits(fish) && bait[i].eaten == false && fish.selected == true) {
			fish.off();
		} else if (bait[i].hits(fish) && bait[i].eaten == false && fish.selected == false && bait[i] && bait[i].incorrect == false){
			textSize(20);
			//text(bait[i].texts[bait[i].index], 10, 60);
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
				fish.takeDmg();
					
				push();
				incorrectSound.play();
				push();
			}

			bait[i].killBait();
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
		fill(0,0,0);
		image(testquestions[selected], width/2, height/2);
		testquestions[selected].resize(850,600);
		//text(bait[selected].isBait[selected], 10, 90);
		//text(selected, 10, 150);
		image(safe,(width/4)*3 + 200,height/2);//a
		image(spam,(width/4) - 200,height/2);//d
		imageMode(CORNER);
		image(percentage,0,0,bait[selected].x,40);
		if (keyIsDown(d)) {
			bait[current].gotEaten();
			if (bait[current].isBait[selected] == true){
				score += 100;
				
				push();
				correctSound.play();
				pop();
				bait[current].killBait();
			} else {
				score -= 100;
				fish.takeDmg() ; //eat bait
				
				push();
				incorrectSound.play();
				pop();
				
				bait[current].crash();
				bait[current].killBait();
			}
			selected = -1;
		}
		if (keyIsDown(a)) {
			bait[current].gotEaten();
			if (bait[current].isBait[selected] == false){
				score += 100;
				correctSound.play();
				bait[current].killBait();
			} else {
				score -= 100;
				fish.takeDmg() ; //eat bait
				
				push();
				incorrectSound.play();
				pop();
				
				bait[current].crash();
				bait[current].killBait();
			}
			selected = -1;
		}
	}
	
	//mouse movements
	mx = constrain(mouseX, 0 + 50,width - 50);
	my = constrain(mouseY, 125 + 25,height - 25);
	fish.setX(mx - 50);
	fish.setY(my - 30);

	//
	if (score >= 1000) {
		endScreen(true);
	}else if( fish.life <= 0) {
		endScreen(false);
	}
	
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
		else if( fish.life <= 0) {
			endScreen(false);
		}
	}
}

function keyTyped() {
	if (key == ' '){
		if (bait[current].hits(fish) && bait[current].eaten == false) {
			selected = current;
		}
	}
}