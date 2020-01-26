var p;
var e = [];
const eCount = 8;

function setup(){
    createCanvas(600, 600);
    p = new Player();
    
    for(let i = 0; i < eCount; i++){
        e[i] = new Enemy(i * 40 + 40, 40);
    }
}

// show the content on the screen
function draw(){
    background(50);
    p.drawPlayer();
    p.movePlayer();

    for(let i = 0; i < eCount; i++){
        e[i].drawEnemy();
        e[i].moveEnemy();
    }
}

// define the player ship size
function Player(){
    // position
    this.x = 275;
    this.y = 550;

    // size
    this.w = 50;
    this.h = 20;

    this.drawPlayer = function(){
        fill(250);      // add color
        noStroke();     // remove border line
        rect(this.x, this.y, this.w, this.h);   // rectangle shape
    }

    // move the player ship based on the mouse
    this.movePlayer = function(){
        this.x = mouseX - this.w / 2;
    }
}

// define the enemy size
function Enemy(x, y){
    // position
    this.x = x;
    this.y = y;

    // radius
    this.r = 30;

    // speed of the enemy
    this.speedX = 5;

    this.drawEnemy = function(){
        fill(0, 255, 0);
        noStroke();
        ellipse(this.x, this.y, this.r);    // cirle shape
    }

    this.moveEnemy = function(){
        this.x += this.speedX;
        if(this.x > width || this.x < 0){
            // move the enemy to the next row if it reach the wall
            this.y += 40;

            // chnage the direction of the enemy movement
            this.speedX *= -1;
        }
    }
}