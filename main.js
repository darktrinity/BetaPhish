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
var correctSound;
var incorrectSound;
var song;
var ambiance;

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
var splot;
var name;


var testQuestionsTF = [true, false, false, false, true, true, false, true, false, true, true, true, false, true, false, false, false, true, true, false];

var controls;
var backBtn;

var btn1;
var btn2;
var btn3;

var playAgain;
var mainMenu;

var bar;
var reverseM;
var mountains = [];

var testquestions = [];
var testsolutions = [];

//fonts
var myFont;

var selected = -1;

var title;

var current = -1;
var numText = 20;
var totalLeft = 15;
var score = 0;

var gameState = 0;
var tw;

var globalSpeed = 1;
var startBtn;

var button1On = false;
var resultImg;
var counters = 0;
var test;
var paralax;

var mx;
var my;
var fisherX = 200;
var fisherY = 300;

var switchs = 0;

//tracker
var startTime;
var endTime;
var timings = []; //stores the time user takes to decide
var actions = []; //stores if user was correct spam/correct real/incorrect spam/incorrect not spam
var overallStart; //start time stamp
var overallEnd; //end time stamp
var numCorrect = 0; //total number of correct answers
var numIncorrect = 0; //total number of incorrect answers

var pause = true;
var incorrectAns = false;
var div = document.getElementById("field_name");
var tempString;
var spacebar = true;


function preload() {
    betaPhish = loadImage("assets/logo-xl.png");
    signature = loadImage("assets/thanh-wordmark.png");
    fisher = loadImage("assets/fisherman.png");

    splot = loadImage("assets/cursor.png");

    for (var i = 1; i <= 4; i++) {
        paralax[i] = loadImage("assets/home_mtn_" + i + ".png");
    }
    reverseM = loadImage("assets/home_mtn_3 -reverse.png");

    liveContainer = loadImage("assets/score-container.png");

    for (var i = 1; i <= 5; i++) {
        lives[i] = loadImage("assets/life-" + i + ".png");
    }

    for (var i = 0; i <= 5; i++) {
        rewardScreen[i] = loadImage("assets/score-" + i + ".png");
    }

    for (var i = 0; i < 20; i++) {
        testquestions[i] = loadImage("assets/PhishingTest/test_" + i + ".png");
        testsolutions[i] = loadImage("assets/PhishingSolution/test_" + i + ".png");
    }

    spam = loadImage("assets/leftclickicon.png");
    safe = loadImage("assets/rightclickicon.png");

    btn1 = createImg("assets/btn1Play.png", "btn1");
    btn2 = createImg("assets/btn2Controls.png", "btn2");
    btn3 = createImg("assets/btn3.png", "btn3");
    btn1.hide();
    btn2.hide();
    btn3.hide();

    playAgain = createImg("assets/btn1Play.png", "btn4");
    mainMenu = createImg("assets/btn2.png", "btn5");

    controls = loadImage("assets/Controls.png");
    backBtn = createImg("assets/btn3Back.png", "btn6");
    backBtn.hide();

    playAgain.hide();
    mainMenu.hide();

    //resultImg = loadImage("assets/test.png");
    percentage = loadImage("assets/percentageActive.png");
    bar = loadImage("assets/percentage.png");

    myFont = loadFont("assets/fonts/mangat.ttf");

    song = loadSound("sounds/Pomegranate.mp3");
    ambiance = loadSound("sounds/river.mp3");
    correctSound = loadSound("sounds/Fish Splashing.wav");
    incorrectSound = loadSound("sounds/reel.mp3");

    document.addEventListener('contextmenu', event => event.preventDefault());
}

function shuffles() {
    var currentIndex = numText - 1,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = testquestions[currentIndex];
        testquestions[currentIndex] = testquestions[randomIndex];
        testquestions[randomIndex] = temporaryValue;

        temporaryValue = testQuestionsTF[currentIndex];
        testQuestionsTF[currentIndex] = testQuestionsTF[randomIndex];
        testQuestionsTF[randomIndex] = temporaryValue;

        temporaryValue = testsolutions[currentIndex];
        testsolutions[currentIndex] = testsolutions[randomIndex];
        testsolutions[randomIndex] = temporaryValue;
    }
}

function setup() {
    createCanvas(1280, 720);
    frameRate(60);
}

///////////////////////////////////////////
function initGame() {
    //cursor(splot);


    song.stop();
    song.setVolume(.2);
    song.loop();

    ambiance.stop();
    ambiance.setVolume(.2);
    ambiance.play();

    playAgain.remove();
    //mainMenu.remove();
    backBtn.remove();

    fill(255);
    background(color(245, 245, 220));
    gameState = 0;
	
	selected = -1;
	switchs = 0;
	incorrectAns = false;
	
    for (var i = 1; i <= 4; i++) {
        image(paralax[i], 0 - (i * 2), 0, 1300, 300);
    }

    image(betaPhish, width - 450, 10);
    image(signature, 50, height - 100);
    image(fisher, fisherX, fisherY);

    //buttons
    btn1 = createImg("assets/btn1Play.png", "btn1");
    btn2 = createImg("assets/btn2Controls.png", "btn2");
    //btn3 =  createImg("assets/btn3.png","btn3");
    btn1.position(width - 350, 10 + 400).mouseOver(buttons1On);
    btn2.position(width - 350, 10 + 500).mouseOver(buttons2On);
    //btn3.position(width - 350,10 + 600).mouseOver(buttons3On);
    noLoop();
}

//Home menu button actions
function buttons1On() {
    btn1.hide();
    btn1 = createImg("assets/btn1-activePlay.png", "btn1").position(width - 350, 10 + 400).mousePressed(setupGame).mouseOut(buttons1Off);
}

function buttons1Off() {
    btn1.hide();
    btn1 = createImg("assets/btn1Play.png", "btn1").position(width - 350, 10 + 400).mouseOver(buttons1On);
}

function buttons2On() {
    btn2.hide();
    btn2 = createImg("assets/btn2-activeControls.png", "btn2").position(width - 350, 10 + 500).mousePressed(controlScreen).mouseOut(buttons2Off);
}

function buttons2Off() {
    btn2.hide();
    btn2 = createImg("assets/btn2Controls.png", "btn2").position(width - 350, 10 + 500).mouseOver(buttons2On);
}

function buttons3On() {
    btn3.hide();
    btn3 = createImg("assets/btn3-active.png", "btn3").position(width - 350, 10 + 600).mousePressed(setupGame).mouseOut(buttons3Off);
}

function buttons3Off() {
    btn3.hide();
    btn3 = createImg("assets/btn3.png", "btn3").position(width - 350, 10 + 600).mouseOver(buttons3On);
}

function initGame2() {
    mainMenu.hide();
    gameState = 0;
    for (var i = 0; i < bait.length; i++) {
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

    image(controls, 0, 0);

    //buttons
    backBtn = createImg("assets/btn3Back.png", "btn6");
    backBtn.position(0 + 25, 0 + 25).mouseOver(backOn);
    noLoop();
}

function backOn() {
    backBtn.hide();
    backBtn = createImg("assets/btn3-activeBack.png", "btn6").position(0 + 25, 0 + 25).mousePressed(initGame).mouseOut(backOff);
}

function backOff() {
    backBtn.hide();
    backBtn = createImg("assets/btn3Back.png", "btn6").position(0 + 25, 0 + 25).mouseOver(backOn);
}
///////////////////////////////////////////

function levelSelect2() {
    levelStart.hide();
    gameState = 1;
    for (var i = 0; i < bait.length; i++) {
        bait[i].killBait();
    }
    fish.killBait();
    levelSelect();
    noLoop();
}

function setupGame() {
    btn1.remove();
    btn2.remove();
    btn3.remove();
    playAgain.remove();
    mainMenu.remove();
    //levelStart.hide();
    score = 0;
    life = 5;
    totalLeft = 15;

    bait = [];
    timings = [];
    actions = [];
    overallStart = new Date();
    numCorrect = 0;
    numIncorrect = 0;
	
	selected = -1;
	switchs = 0;
	incorrectAns = false;
	
    shuffles();
    gameState = 2;
    fish = new Fish();
    shark = new Enemy(0);
    eel = new Enemy(1);
    for (var i = 0; i < 15; i++) {
        bait.push(new Bait(i, testQuestionsTF));
        counters++;
    }
    loop();
}

////////////////////////////////////////////////////
function endScreen(win) {
    overallEnd = new Date();
    background(color(245, 245, 220));
    textSize(150);
    for (var i = 1; i <= 4; i++) {
        image(paralax[i], 0 - (i * 2), 0, 1300, 300);
    }

    if (win) {
        if (fish.life == 5) {
            image(rewardScreen[5], 0, 0);
        } else if (fish.life == 4) {
            image(rewardScreen[4], 0, 0);
        } else if (fish.life == 3) {
            image(rewardScreen[3], 0, 0);
        } else if (fish.life == 2) {
            image(rewardScreen[2], 0, 0);
        } else if (fish.life == 1) {
            image(rewardScreen[1], 0, 0);
        }
    } else if (!win) image(rewardScreen[0], 0, 0);
    fill(255);
    playAgain.show();
    //mainMenu.show();
    playAgain = createImg("assets/btn1Play.png", "btn4");
    //mainMenu =  createImg("assets/btn2.png","btn5");
    playAgain.position(width - 350, 10 + 400).mouseOver(playAgainOn);
    //mainMenu.position(width - 350,10 + 500).mouseOver(mainMenuOn);
    output();
    noLoop();
}

function playAgainOn() {
    playAgain.hide();
    playAgain = createImg("assets/btn1-activePlay.png", "btn1").position(width - 350, 10 + 400).mousePressed(initGame2).mouseOut(playAgainOff);
}

function playAgainOff() {
    playAgain.hide();
    playAgain = createImg("assets/btn1Play.png", "btn1").position(width - 350, 10 + 400).mouseOver(playAgainOn);
}

function mainMenuOn() {
    mainMenu.hide();
    mainMenu = createImg("assets/btn2-active.png", "btn2").position(width - 350, 10 + 500).mousePressed(initGame2).mouseOut(mainMenuOff);
}

function mainMenuOff() {
    mainMenu.hide();
    mainMenu = createImg("assets/btn2.png", "btn2").position(width - 350, 10 + 500).mouseOver(mainMenuOn);
}
///////////////////////////////////////////////////////

function game() {
    background(color(245, 245, 220));
    textSize(20);
    textFont(myFont);
    fill(0, 0, 0);
    image(reverseM, 0, 0 - 100, 1300, 300);
    text(score, 10, 60);
    text("Lives:", 480, 60);

    for (var i = 1; i <= 5; i++) {
        image(liveContainer, 550 + ((i - 1) * 75), 25, 60, 60);
    }
    for (var i = 1; i <= fish.life; i++) {
        image(lives[i], 540 + ((i - 1) * 75), 15, 75, 75);
    }

    //bait
    if (frameCount % 10000 == 0) {
        globalSpeed = globalSpeed + 1;
    }
	
    for (var i = bait.length - 1; i >= 0; i--) {
		if (!incorrectAns) {
			bait[i].update();
		}
        if (bait[i].eaten == false) {
            bait[i].show();
        }
        if (!bait[i].hits(fish) && bait[i].eaten == false && fish.selected == true) {
            fish.off();
        } else if (bait[i].hits(fish) && bait[i].eaten == false && fish.selected == false && bait[i] && bait[i].incorrect == false) {
            textSize(20);
            //text(bait[i].texts[bait[i].index], 10, 60);
            current = i;
            fish.on();

        }
        if (bait[i].offscreen()) { //removes when off screen
            if (i == selected) {
                selected = -1;
                incorrectAns = false;
            }
            bait[i].y = random() * ((0 + bait[i].textHeight) - (height - bait[i].baity)) + height - bait[i].baity; //so bait can't spawn partially off screen
            bait[i].x = random(width, width + width); //spawn them offscreen to give a sense of movement


        }

        bait[i].incSpeed(globalSpeed);
    }
    //fish
    fish.update();
    fish.show();

    if (selected != -1) {
        imageMode(CENTER);
        fill(0, 0, 0);
        image(testquestions[selected], width / 2, height / 2);
        testquestions[selected].resize(850, 600);

        image(safe, (width / 4) * 3 + 200, height / 2); //a
        image(spam, (width / 4) - 200, height / 2); //d
        imageMode(CORNER);
        image(percentage, 0, 0, bait[selected].x, 40);

        if (incorrectAns) {
            imageMode(CENTER);
            image(testsolutions[selected], width / 2, height / 2);
            testsolutions[selected].resize(850, 600);
        }
        if (mouseIsPressed && mouseButton === RIGHT && !incorrectAns) { //safe
            totalLeft -= 1;
            endTime = Date.now();
            timings.push(Math.round(((endTime - startTime) * 0.001) * 100) / 100);
            bait[selected].gotEaten();
            if (bait[selected].isBait[selected] == true) {
                score += 100;
                numCorrect++;
                actions.push("Safe/C");
                push();
                correctSound.play();
                pop();
                bait[selected].killBait();
                selected = -1;
				switchs = 0;
            } else {
                score -= 100;
                fish.takeDmg(); //eat bait
                numIncorrect++;
                actions.push("Safe/I");

                push();
                incorrectSound.play();
                pop();
                incorrectAns = true;
            }
        }
        if (mouseIsPressed && mouseButton === LEFT && !incorrectAns) { //spam
            totalLeft -= 1;
            endTime = Date.now();
            timings.push(Math.round(((endTime - startTime) * 0.001) * 100) / 100);
            bait[selected].gotEaten();
            if (bait[selected].isBait[selected] == false) {
                score += 100;
                numCorrect++;
                actions.push("Spam/C");

                push();
                correctSound.play();
                pop();
                bait[selected].killBait();
                selected = -1;
				switchs = 0;
            } else {
                score -= 100;
                fish.takeDmg(); //eat bait
                numIncorrect++;
                actions.push("Spam/I");

                push();
                incorrectSound.play();
                pop();
                incorrectAns = true;

            }

        }
	    if (switchs == 1) {
			if (mouseIsPressed && (mouseButton === RIGHT || mouseButton === LEFT)) { 
				bait[selected].killBait();
				selected = -1;
				incorrectAns = false;
				switchs = 0;
			}
        }
    }

    //mouse movements
    mx = constrain(mouseX, 0 + 50, width - 50);
    my = constrain(mouseY, 125 + 25, height - 25);
    fish.setX(mx - 50);
    fish.setY(my - 30);

    //
    if (totalLeft <= 0) {
        endScreen(true);
    } else if (fish.life <= 0) {
        endScreen(false);
    }

}

function draw() {
    if (gameState == 0) { //main menu
        initGame();
    } else if (gameState == 1) {
        levelSelect();
    } else if (gameState == 2) { //in game
        game(); //level
    } else if (gameState == 3) {
        if (totalLeft <= 0) {
            endScreen(true);
        } else if (fish.life <= 0) {
            endScreen(false);
        }
    }
}

function keyTyped() {
    if (key == ' ' && selected == -1) {
        if (bait[current].hits(fish) && bait[current].eaten == false) {
            selected = current;
            startTime = Date.now();
        }
    }
}

function mouseClicked() {
	if (switchs == 0 && selected != -1) {
		switchs++;
	} 
	else if (switchs == 1 && selected != -1) {
		switchs--;
	}
}

function output() {
    name = prompt("Please enter your name:", "Your name here");

    console.log("Id:" + name);
    console.log("Score:" + score);
    console.log("Total answered:" + timings.length);
    console.log("Timings:" + timings);
    console.log("Total correct:" + numCorrect);
    console.log("Total incorrect:" + numIncorrect);
    console.log("Start time:" + overallStart);
    console.log("End time:" + overallEnd);
    console.log("Results:" + actions);
    console.log("");
    console.log("");

    div.textContent = ("Id:" + name + " \r\n");
    div.textContent += ("Score:" + score + " \r\n");
    div.textContent += ("Total answered:" + timings.length + " \r\n");
    div.textContent += ("Timings:" + timings + " \r\n");
    div.textContent += ("Total correct:" + numCorrect + " \r\n");
    div.textContent += ("Total incorrect:" + numIncorrect + " \r\n");
    div.textContent += ("Start time:" + overallStart + " \r\n");
    div.textContent += ("End time:" + overallEnd + " \r\n");
    div.textContent += ("Results:" + actions + " \r\n");
	
}