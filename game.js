var p;

function setup(){
    createCanvas(600, 600);
    p = new Player();
}

// show the content on the screen
function draw(){
    background(50);
    p.drawPlayer();
    p.movePlayer();
}

// define the player ship size
function Player(){
    this.x = 275;
    this.y = 550;
    this.w = 50;
    this.h = 20;

    this.drawPlayer = function(){
        fill(250);      // add color
        noStroke();   // remove border line
        rect(this.x, this.y, this.w, this.h);
    }

    // move the player ship based on the mouse
    this.movePlayer = function(){
        this.x = mouseX - this.w / 2;
    }
}