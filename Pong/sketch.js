///<reference path="../p5.global-mode.d.ts" />

var scl ; // scale of elements
var gameState = 0 ; // 0 : Game Menu , 1 : Start screen , 2 : Game screen , 3 : Game over screen
var humanPlaying = true ;
var playerSpeed ;


var player1 ; // Human or Machine (controlled by w , s)
var player2 ; // Human always (controlled by UP_ARROW , DOWN_ARROW)
var score1 = 0 ;
var score2 = 0 ;
var ball ;

// Sprite variables

// Font variables

// Sound variables

function preload() {
    // sprite_var = loadImage("path.png") ;

    // font_var = loadFont("path.ttf") ;

    // sound_var = loadSound("path.wav") ;
}

function setup() {
    // Getting the size of screen to draw canvas of that size with maintained aspect ratio
    scl = window.innerWidth / window.innerHeight ;
    if (scl > 3 / 2) {
        scl = window.innerHeight / 600 ;
    }
    else {
        scl = window.innerWidth / 900 ;
    }
    window.canvas = createCanvas(900 * scl , 600 * scl);
    background(0) ;

    playerSpeed = scl * 11 ;
    player1 = new UnbeatableMachinePlayer('L') ;
    player2 = new UltimateMachinePlayer('R') ;
    ball = new Ball() ;
    ball.service(['L' , 'R'][Math.floor(random(0 , 2))]) ;
}

function draw() {
    background(0) ;
    drawTable() ;

    ball.update() ;
    player1.update() ;
    player2.update() ;

    player1.show() ;
    player2.show() ;
    ball.show() ;
}

function drawTable() {
    stroke(255) ;
    strokeWeight(3) ;
    noFill() ;
    rect(scl * 30 , scl * 30 , canvas.width - 2 * scl * 30 , canvas.height - 2 * scl * 30) ;
    rect(scl * 30 , canvas.height / 2 - scl * 75 , scl * 30 , scl * 150) ;
    rect(window.width - scl * 60 , canvas.height / 2 - scl * 75 , scl * 30 , scl * 150) ;
    line(window.width / 2 , scl * 30 , window.width / 2 , window.height - scl * 30) ;
    ellipse(window.width / 2 , window.height /2 , scl * 250)
    fill(255) ;
    ellipse(window.width / 2 , window.height /2 , scl * 50)
}