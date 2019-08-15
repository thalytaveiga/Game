/* 	Created by: Thalyta Hulsen Lemos Veiga 
	Centennial College
	Course: COMP125
	Student#: 300861728 
	File: game.js 
*/


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background4.jpg";


// Bug image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
	bugReady = true;
};
bugImage.src = "images/guitar2.png";


// Game objects
var bug = {
	x: 0,
	y: 0
};
var bugsCaught = 0;
var interval = 1600;

// Makes bug move by itself
var moveBug = setInterval(reset, interval); 

var reset = function () {
	// Throw the bug somewhere on the screen randomly
	bug.x = 65 + (Math.random() * (canvas.width - 130));
	bug.y = 65 + (Math.random() * (canvas.height - 130));
};

canvas.onmousedown = function (mouse) {
    var locBug = windowToCanvas(mouse.clientX, mouse.clientY);
    if (
		locBug.x <= (bug.x + 65)
		&& bug.x <= (locBug.x)
		&& locBug.y <= (bug.y + 65)
		&& bug.y <= (locBug.y)
	) {
		clearInterval(moveBug);
    	interval *= 0.96;
    	moveBug = setInterval(reset, interval);
    	++bugsCaught;
		reset();
		
    }
};

// Captures click on bug
function windowToCanvas(x, y) {
    var r = canvas.getBoundingClientRect();
    return { x: x - r.left * (canvas.width  / r.width),
             y: y - r.top  * (canvas.height / r.height)};
};


// reset all
var resetAll = function () {
	resetCounter();
	resetSpeed();
};

// function to reset speed
var resetSpeed = function () {
	interval = 1800;
	clearInterval(moveBug);
	moveBug = setInterval(reset, interval);
};

// function to reset counter
var resetCounter = function () {
	bugsCaught = 0;
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (bugReady) {
		ctx.drawImage(bugImage, bug.x, bug.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Guitars caught: " + bugsCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	
	render();
	then = now;
	
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//Event listeners buttons
var btnCounter = document.getElementById("resetcounter");
var btnSpeed = document.getElementById("resetspeed");

btnCounter.addEventListener("click", resetCounter, false);
btnSpeed.addEventListener("click", resetSpeed, false);

// Call the game
var then = Date.now();
reset();
moveBug = setInterval(reset, interval);
main();