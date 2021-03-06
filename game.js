var p;
var playerLife = 3;
var e = [];
var drops;
var enemyLeft;
var boss;

const eCount = 10;

// set up game
function setup(){
    createCanvas(500, 600);
    p = new Player();
    drops = new Drop;
    
    for(let i = 0; i < eCount; i++){
        e[i] = new Enemy(i * 40 + 40, 40);
    }

    enemyLeft = e.length;
    boss = new Boss();
}

// show the content on the screen
function draw(){
    background(50);
    p.drawPlayer();
    p.movePlayer();
    drops.drawDrop();
    drops.fireDrop();
    boss.drawBoss();
    boss.moveBoss();
    boss.fireWeapon();

    for(let i = 0; i < eCount; i++){
        e[i].drawEnemy();
        e[i].moveEnemy();
        e[i].playerHit();
    }

    endGame();
    checkDropHitEnemy();

    // display the text
    textSize(12);
    fill(255);
    text("Your Life: " + playerLife, 20, 585);
    text("Enemy Left: " + enemyLeft, 400, 585);

    winGame();
}

// define the player ship size
function Player(){
    // position
    this.x = 275;
    this.y = 550;

    // size
    this.w = 50;
    this.h = 20;

    this.playerHit = false;

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
    this.speedX = 3;

    this.beenHit = false;

    this.drawEnemy = function(){
        if(!this.beenHit){
            fill(0, 255, 0);
            noStroke();
            ellipse(this.x, this.y, this.r);    // cirle shape
        }
    }

    this.moveEnemy = function(){
        if(!this.beenHit){
            this.x += this.speedX;
            if(this.x > width || this.x < 0){
                // move the enemy to the next row if it reach the wall
                this.y += 40;
    
                // chnage the direction of the enemy movement
                this.speedX *= -1;
            }
        }
    }

    this.playerHit = function(){
        if(!this.beenHit){
            // check if the enemy touch the player ship
            if(this.x > p.x && this.x < p.x + p.w && this.y > p.y){
                p.playerHit = true;
                this.speedX = 0;
            }
        }
    }
}

// end the game
function endGame(){
    // end the game if player ship is hit
    if(p.playerHit){
        background(155, 35, 35);
        p.x = 255;
        fill(255);
        noStroke();

        // display a message
        textSize(32);
        text("You Lose", 180, 250);
    }
}

// define the bullet size
function Drop(){
    this.x = p.x + p.w / 2;
    this.y = p.y;
    this.r = 10;
    this.fired = false;

    this.drawDrop = function(){
        this.x = p.x + p.w / 2;
        fill(0, 0, 255);
        noStroke();
        ellipse(this.x, this.y, this.r);
    }

    this.fireDrop = function(){
        // move the bullet up
        if(this.fired){
            this.y -= 20;
        }
        
        if(this.y < 0){
            this.fired = false;
        }

        // reset the bullet position
        if(!this.fired){
            this.y = p.y;
        }
    }
}

// fire the bullet when the mouse button is pressed
function mousePressed(){
    drops.fired = true;
}

// check if the enemy is hitted by the bullet
function checkDropHitEnemy(){
    for(let i = 0; i < e.length; i++){
        if(!p.playerHit){
            if(!e[i].beenHit){
                if(drops.x > e[i].x - e[i].r / 2 && drops.x < e[i].x + e[i].r / 2 &&
                    drops.y > e[i].y - e[i].r / 2 && drops.y < e[i].y + e[i].r / 2){
                        e[i].beenHit = true;
                        drops.fired = false;
                        enemyLeft--;
                    }
            }
        }
    }
}

function winGame(){
    if(enemyLeft === 0){
        background(36, 121, 10);
        p.x = 255;
        fill(255);
        noStroke();

        // display a message
        textSize(32);
        text("You Win", 180, 250);
    }
}

function Boss(){
    this.x = 275;
    this.y = 0;
    this.w = 50;
    this.h = 20;
    this.wX = this.x + this.w / 2;
    this.wY = this.y + this.h;
    this.wR = 10;
    this.wSpeed = 10;

    this.drawBoss = function(){
        fill(255, 0, 0);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
        ellipse(this.wX, this.wY, this.wR);
    }

    // make the boss move based on the player movement
    this.moveBoss = function(){
        if(this.x + this.w / 2 < p.x + p.w / 2){
            this.x += 3;
        }
        if(this.x + this.w / 2 > p.x + p.w / 2){
            this.x -= 3;
        }

        this.wX = this.x + this.w / 2;
    }

    // allow the boss to fire the bullet
    this.fireWeapon = function(){
        this.wY += this.wSpeed;

        // bring the bullet back to the boss
        if(this.wY > height){
            this.wY = this.y;
        }

        // game over if the boss bullet hits the player
        if(this.wX > p.x && this.wX < p.x + p.w && this.wY > p.y &&
            this.wY < p.y + p.h){
                if(!p.playerHit){
                    playerLife--;
                }
                
                if(playerLife <= 0){
                    p.playerHit = true;
                    this.wSpeed = 0;
                }
            }
    }
}