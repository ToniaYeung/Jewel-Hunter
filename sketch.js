/*
JEWEL HUNTER PLATFORMER

*/

var char_x;
var char_y;
var floorPos_y;
var scrollPos;
var realPos;
var yPos_house;

var isLeft;
var isRight;
var isJumping;
var isFalling;
var cloud;
var cloud2;
var mountains;
var trees;
var houseXs;

var canyons
var jewels

var score;
var isWon;

var lives;
var isLost;

var enemies;
var platforms;


var isOnPlatform



function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives = 3;
    drawGame();
}
    
function drawGame(){
        
        
	// Variable to control the background scrolling.
    isOnPlatform = false;
	scrollPos = 0;
    char_x = width/2;
	char_y = floorPos_y - 26;
    yPos_house=-108;
        isWon = false;
        isLost= false;
        score = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	realPos = char_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;

	// Initialise arrays of scenery objects.
     houseXs = [-3050,-2800,-2300,-1900,-1650,-1050,-850,-450,-200,250,600,1000,1250,1400,1820,2050,2275,3000,3200]
    
    
    cloud =[{pos_x: 10, pos_y: 5, size: 70}, {pos_x: 230, pos_y:80, size: 30}, {pos_x: 500, pos_y:30, size: 50}, {pos_x: 800, pos_y: 50, size: 70},{pos_x: 1200, pos_y: 40, size: 50}]
    
    for(var i=0; i < 7; i++){
        var c= {pos_x: random(0,1500), pos_y: random(0,100), size: random()};
        cloud.push(c);
    }
    
    
    
    cloud2 =[{pos_x: 0, pos_y: 0, size: 40}, {pos_x: 10, pos_y:60, size: 75}, {pos_x: 300, pos_y:30, size: 30}, {pos_x: 600, pos_y: 20, size: 50},{pos_x: 900, pos_y: 0, size: 20}]
    
    for(var i=0; i < 7; i++){
        var cc = {pos_x: random(-1500,1500), pos_y: random(0, 150), size: random(40,70)};
        cloud2.push(cc);
    }
        
    mountains = [{pos_x: -990, height:-10}, {pos_x: -400, height:-105},{pos_x: -115, height:-50}, {pos_x: -700, height:-20}, {pos_x: 0, height:-70}, {pos_x: 125, height:-135}, {pos_x: 400, height:-220},{pos_x: 700, height:-50}]
    
    for(i = 0; i < 15; i++){
        var m = {pos_x: random(-5000, 5000), height: random(0,-100)};
        mountains.push(m);
    }
    trees =[{pos_x: -500, height: 10},{pos_x: -200, height: -125}, {pos_x: 50, height: -55},{pos_x: 200, height: -250},{pos_x: 400, height: -300},{pos_x: 600, height: -250},{pos_x: 850, height: -300},{pos_x: 950, height: -150},{pos_x: -600, height: -40},{pos_x: -710, height: -75},{pos_x: -750, height: -125},{pos_x: -975, height: -250},{pos_x: -1000, height: -125},{pos_x: -1200, height: -80},{pos_x: -2050, height: -50},{pos_x: -1600, height: 10},{pos_x: -1500, height: -20},{pos_x: -1800, height: -60},{pos_x: -1900, height: -100},]
    
    for(i=0; i<20; i++){
        var t= {pos_x: random(-500,5000), height:random(0,-200)};
        trees.push(t);
    }
    jewels = [{x_pos: 50, y_pos: 230, size: 50, isFound: false}, {x_pos: 325, y_pos: 280, size: 50, isFound: false},{x_pos: 870, y_pos: 130, size: 50, isFound: false},{x_pos: 940, y_pos: 342, size: 50, isFound: false}]
    //adjust y axis to make jeweel  go ontop
    
    canyons = [{x_pos: 300, width: 100},{x_pos: 0, width: 100}, {x_pos: 700, width: 50}, {x_pos: -300, width: 50}]

    

    enemies = [];

    enemies.push(
    {
        x_pos: 100,
        y_pos: floorPos_y -15 ,
        x1: 100,
        //x 100 to x 300 and goes back and forth
        x2: 270,
        speed: 1,
        size: 30,
        display: function()
        {
            // Draw enemy.
            if(this.speed >0){
               //left CORRECTED
               stroke(224,255,255);
               fill(255,255,0)
            triangle(this.x_pos-12, this.y_pos+ 9, this.x_pos, this.y_pos-15, this.x_pos +12, this.y_pos+9);
            triangle(this.x_pos-12, this.y_pos-7, this.x_pos, this.y_pos+15, this.x_pos +12, this.y_pos-7);
               
           }
           
           else {
               //right
               stroke(255,228,255);
               fill(255,255,0)
               triangle(this.x_pos-12, this.y_pos+ 9, this.x_pos, this.y_pos-15, this.x_pos +12, this.y_pos+9);
            triangle(this.x_pos-12, this.y_pos-7, this.x_pos, this.y_pos+15, this.x_pos +12, this.y_pos-7);
           }
            
            
            
        },
        move: function(){
        this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                this.speed *= -1;
                
            }
            
    },
         checkCollision: function()
        {
            //gap between character and shape
            if( abs(realPos - this.x_pos) < 24 && abs(char_y - this.y_pos) < 30)
                {
                    playerDied();
                }
        }
    }          
);
    
    enemies.push(
    {
        x_pos: 400,
        y_pos: floorPos_y - 15 ,
        x1: 400,
        //x 100 to x 300 and goes back and forth
        x2: 450,
        speed: 1,
        size: 30,
        display: function()
        {
            // Draw enemy.
           if(this.speed >0){
               //left
               stroke(224,255,255);
               fill(255,255,0)
              triangle(this.x_pos-12, this.y_pos+ 9, this.x_pos, this.y_pos-15, this.x_pos +12, this.y_pos+9);
            triangle(this.x_pos-12, this.y_pos-7, this.x_pos, this.y_pos+15, this.x_pos +12, this.y_pos-7);
               
           }
           
           else {
               //right
               stroke(255,228,255);
               fill(255,255,0)
                 triangle(this.x_pos-12, this.y_pos+ 9, this.x_pos, this.y_pos-15, this.x_pos +12, this.y_pos+9);
            triangle(this.x_pos-12, this.y_pos-7, this.x_pos, this.y_pos+15, this.x_pos +12, this.y_pos-7);
           }
            
            
            
        },
        move: function(){
        this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                this.speed *= -1;
                
            }
            
    },
         checkCollision: function()
        {
            //gap between character and shape
            if( abs(realPos - this.x_pos) < 24 && abs(char_y - this.y_pos) < 30)
                {
                    playerDied();
                }
        }
    }          
);
    enemies.push(
    {
        x_pos: 765,
        y_pos: floorPos_y - 15 ,
        x1: 765,
        //x 100 to x 300 and goes back and forth
        x2: 950,
        speed: 1,
        size: 30,
        display: function()
        {
            // Draw enemy.
            if(this.speed >0){
               //left
               stroke(224,255,255);
               fill(255,255,0)
              triangle(this.x_pos-12, this.y_pos+ 9, this.x_pos, this.y_pos-15, this.x_pos +12, this.y_pos+9);
            triangle(this.x_pos-12, this.y_pos-7, this.x_pos, this.y_pos+15, this.x_pos +12, this.y_pos-7);
               
           }
           
           else {
               //right
               stroke(255,228,255);
               fill(255,255,0)
                 triangle(this.x_pos-12, this.y_pos+ 9, this.x_pos, this.y_pos-15, this.x_pos +12, this.y_pos+9);
            triangle(this.x_pos-12, this.y_pos-7, this.x_pos, this.y_pos+15, this.x_pos +12, this.y_pos-7);
           }
            
            
            
            
        },
        move: function(){
        this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                this.speed *= -1;
                
            }
            
    },
         checkCollision: function()
        {
            //gap between character and shape
            if( abs(realPos - this.x_pos) < 24 && abs(char_y - this.y_pos) < 30)
                {
                    playerDied();
                }
        }
    }          
);
     enemies.push(
    {
        x_pos: 800,
        y_pos: floorPos_y - 165 ,
        x1: 800,
        //x 100 to x 300 and goes back and forth
        x2: 925,
        speed: 1,
        size: 30,
        display: function()
        {
            // Draw enemy.
            if(this.speed >0){
               //left
               stroke(224,255,255);
               fill(255,255,0)
              triangle(this.x_pos-12, this.y_pos+ 9, this.x_pos, this.y_pos-15, this.x_pos +12, this.y_pos+9);
            triangle(this.x_pos-12, this.y_pos-7, this.x_pos, this.y_pos+15, this.x_pos +12, this.y_pos-7);
               
           }
           
           else {
               //right
               stroke(255,228,255);
               fill(255,255,0)
                 triangle(this.x_pos-12, this.y_pos+ 9, this.x_pos, this.y_pos-15, this.x_pos +12, this.y_pos+9);
            triangle(this.x_pos-12, this.y_pos-7, this.x_pos, this.y_pos+15, this.x_pos +12, this.y_pos-7);
           }
            
            
            
        },
        move: function(){
        this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                this.speed *= -1;
                
            }
            
    },
         checkCollision: function()
        {
            //gap between character and shape
            if( abs(realPos - this.x_pos) < 24 && abs(char_y - this.y_pos) < 30)
                {
                    playerDied();
                }
        }
    }          
);
    enemies.push(
    {
        x_pos: 900,
        y_pos: floorPos_y - 15 ,
        x1: 900,
        //x 100 to x 300 and goes back and forth
        x2: 1200,
        speed: 1,
        size: 30,
        display: function()
        {
            // Draw enemy.
            if(this.speed >0){
               //left
               stroke(224,255,255);
               fill(255,255,0)
              triangle(this.x_pos-12, this.y_pos+ 9, this.x_pos, this.y_pos-15, this.x_pos +12, this.y_pos+9);
            triangle(this.x_pos-12, this.y_pos-7, this.x_pos, this.y_pos+15, this.x_pos +12, this.y_pos-7);
               
           }
           
           else {
               //right
               stroke(255,228,255);
               fill(255,255,0)
                 triangle(this.x_pos-12, this.y_pos+ 9, this.x_pos, this.y_pos-15, this.x_pos +12, this.y_pos+9);
            triangle(this.x_pos-12, this.y_pos-7, this.x_pos, this.y_pos+15, this.x_pos +12, this.y_pos-7);
           }
            
            
            
            
        },
        move: function(){
        this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                this.speed *= -1;
                
            }
            
    },
         checkCollision: function()
        {
            //gap between character and shape
            if( abs(realPos - this.x_pos) < 24 && abs(char_y - this.y_pos) < 30)
                {
                    playerDied();
                }
        }
    }          
);
    platforms = [];
    
    platforms.push(
    {
        x_pos: 10,
        y_pos: floorPos_y - 80,
        width: 150,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([205,92,92,225]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function()
        {
        // Conditions for platform to stay on platform
        if(realPos > this.x_pos && realPos < this.x_pos + this.width && char_y > this.y_pos - this.height - 15 && char_y < this.y_pos - this.height - 10)
        {
            isOnPlatform = true;
        }
        }
    }
);

   platforms.push(
    {
        x_pos: 640,
        y_pos: floorPos_y - 45,
        width: 60,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([205,92,92,225]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function()
        {
        // Conditions for platform to stay on platform
        if(realPos > this.x_pos && realPos < this.x_pos + this.width && char_y > this.y_pos - this.height - 15 && char_y < this.y_pos - this.height - 10)
        {
            isOnPlatform = true;
        }
        }
    }
);
 // -here  
    platforms.push(
    {
        x_pos: 730,
        y_pos: floorPos_y - 90,
        width: 15,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([205,92,92,225]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function()
        {
        // Conditions for platform to stay on platform
        if(realPos > this.x_pos && realPos < this.x_pos + this.width && char_y > this.y_pos - this.height - 15 && char_y < this.y_pos - this.height - 10)
        {
            isOnPlatform = true;
        }
        }
    }
);
    
    
    platforms.push(
    {
        x_pos: 790,
        y_pos: floorPos_y - 150,
        width: 150,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([205,92,92,225]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function()
        {
        // Conditions for platform to stay on platform
        if(realPos > this.x_pos && realPos < this.x_pos + this.width && char_y > this.y_pos - this.height - 15 && char_y < this.y_pos - this.height - 10)
        {
            isOnPlatform = true;
        }
        }
    }
);
    
}


function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

	// Draw clouds.
    push()
    translate(scrollPos/5, 0)
    drawClouds()
    pop();
////drawclouds2
    push()
    translate(scrollPos/7, 0)
    drawClouds2()
    pop();
//	 Draw mountains.
    push()
    translate(scrollPos/2, 0)
    drawMountains()
    pop();
    
	// Draw trees.
    push()
    translate(scrollPos*1, 0)
    drawTrees()
    pop();

	// Draw houses.
    push()
    translate(scrollPos*2, 0)
    drawHouses()
    pop();
    

	// Draw canyons.
    push();
    translate(scrollPos,0);
    for(i = 0; i< canyons.length; i ++){
    drawCanyon(canyons[i]);
    checkCanyon(canyons[i]);
    }
    pop();
    
    
	// Draw pickup items.
    push();
    translate(scrollPos,0);
    for(i = 0; i < jewels.length; i++){
    drawJewel(jewels[i]);
    checkJewel(jewels[i]);
    }
    pop();
    
    
    
    
    //draw enemies
    push();
    translate(scrollPos,0);
    for(var i = 0; i < enemies.length; i++)
    {
       enemies[i].display();
       enemies[i].move();
       enemies[i].checkCollision();
       
    }
    pop();
    
    //draw platforms
    push();
    translate(scrollPos,0);
    isOnPlatform = false;
    //remove repeat so thinks no longer on platform
    for(var i = 0; i < platforms.length; i++){
        platforms[i].display();
        platforms[i].checkCharOn();
    }
pop();
    
	// Draw game character.
    textStyle(ITALIC)
	drawGameChar();
    textSize(20);
    fill(255,153,204);
    text("score: " + score, 100,100)
    pop();
    
    textSize(20);
    fill(255,153,204);
    text("lives: " + lives, 100,150)
    pop();
    
    if(isLost == true){
    fill(255,153,204);
    stroke(255,255,255);
    strokeWeight(0.5);
        textSize(32)
        text("GAME OVER!", 200,200)
    }
    
    if(isWon == true){
    fill(255,153,204);
    stroke(255,255,255);
    strokeWeight(0.5);
        textSize(32)
        text("WINNER!", 200, 200)
    }
    
    checkPlayerWon();
    checkPlayerDied();

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
			if(char_x > width * 0.2)
			{
					char_x -= 5;
			}
			else
			{
					scrollPos += 5;
			}
	}

	if(isRight)
	{
			if(char_x < width * 0.8)
			{
					char_x  += 5;
			}
			else
			{
					scrollPos -= 5; // negative for moving against the background
			}
	}

	// Logic to make the game character rise and fall.
	if((char_y < floorPos_y - 26) && !isOnPlatform)
	{
        // New condition where if you are on platform you do not fall.
			char_y += 2;
			isJumping = true;
	}
	else
	{
			isJumping = false;
	}

	if(isFalling)
	{
			char_y += 5;
            isJumping = true;
	}

	// Update real position of gameChar for collision detection.
	realPos = char_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

		// console.log(keyCode);
		// console.log(key);
    if(isLost || isWon)
{
    if(key == ' ')
    {
        nextLevel();
    }
    return;
}
	if(key == 'A' || keyCode == 37)
	{
			isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
			isRight = true;
	}

	if(key == ' ' || key == 'W')
	{
			if(!isJumping)
			{
					char_y -= 100;
			}
	}
}

function keyReleased(){

	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    if(isLeft && isJumping)
    {
        // add your jumping-left code
     
    
     //draw body
    fill(255,228,255);
    triangle(char_x -10, char_y +20,char_x +10, char_y +20, char_x, char_y );
    
    
    //draw head
    ellipse(char_x, char_y -5,15,15);
    
    //draw hair
    stroke(135,206,250,120);
    strokeWeight(9);
   
    line(char_x +7, char_y -11, char_x +15, char_y -2);
    
    //draw bow
    strokeWeight(1);
    fill(255,105,180);
    ellipse(char_x -5, char_y -13,7,8);
    ellipse(char_x, char_y -13,4,4);
    ellipse(char_x +5, char_y -13,9,10);
    stroke(135,206,250);
    ellipse(char_x, char_y -13,2,2);
    line(char_x,char_y -13, char_x -4, char_y -14);
    line(char_x, char_y -13,char_x +6, char_y -14);
    
     //draw mouth
    stroke(135,206,250)
    strokeWeight(1);
    arc(char_x-3, char_y -2,5, 5, 0, PI)
    
   //draw cheeks
    noStroke();
    fill(255,105,180);
    ellipse(char_x -1, char_y -4, 5,2);
    
    //draw eyes
    fill(135,206,250)
    ellipse(char_x -3, char_y -6, 3,3);
    
    fill(255);
    ellipse(char_x -3, char_y -6, 1,1);
    
    //draw left leg
    fill(135,206,250);
    stroke(135,206,250);
    strokeWeight(3);
    line(char_x -3,
        char_y +20,
        char_x -7,
        char_y +23);
    
    line(char_x -7, char_y +23, char_x -2, char_y +25);
    
    //draw right leg
        line(char_x +3,
        char_y +20,
        char_x +6,
        char_y +27);
    
    //draw rightarm
    fill(135,206,250);
    line(char_x +2, char_y +5, char_x +7, char_y -2)
    //draw leftarm
    line(char_x -3, char_y +5, char_x -8, char_y +2)
    
//draw shoes
    noStroke();
    fill(255,105,180);
    ellipse(char_x, char_y +26, 4,3);
    ellipse(char_x +6, char_y +28, 4,3);

}



    else if(isRight && isJumping)
    {
        // add your jumping-right code
    
     //draw body
    fill(255,228,255);
    triangle(char_x -10, char_y +20,char_x +10, char_y +20, char_x, char_y );
    
    
    //draw head
    ellipse(char_x, char_y -5,15,15);
    
    //draw hair
    stroke(135,206,250,120);
    strokeWeight(10);
    line(char_x -7, char_y -11, char_x -16, char_y -1);
    
    //draw bow
    strokeWeight(1);
    fill(255,105,180);
    ellipse(char_x -5, char_y -13,9,10);
    ellipse(char_x, char_y -13,4,4);
    ellipse(char_x +5, char_y -13,7,8);
    stroke(135,206,250);
    ellipse(char_x, char_y -13,2,2);
    line(char_x,char_y -13, char_x -6, char_y -14);
    line(char_x, char_y -13,char_x +3, char_y -14);
    
     //draw mouth
    stroke(135,206,250)
    strokeWeight(1);
    arc(char_x +3, char_y -2,5, 5, 0, PI)
    
   //draw cheeks
    noStroke();
    fill(255,105,180);
    ellipse(char_x, char_y -4, 5,2);
  
    //draw eyes
    fill(135,206,250)
    
    ellipse(char_x +3, char_y -6, 3,3);
    fill(255);
    ellipse(char_x -3, char_y -6, 1,1);
    ellipse(char_x +3, char_y -6, 1,1);
    
    
    
    //draw left leg
    fill(135,206,250);
    stroke(135,206,250);
    strokeWeight(3);
    line(char_x -3,
        char_y +20,
        char_x -8,
        char_y +25);
    
    //draw right leg
        line(char_x +3,
        char_y +20,
        char_x +6,
        char_y +23);
    line(char_x +6, char_y +23, char_x, char_y +25);
    
    //draw rightarm
    fill(135,206,250);
    line(char_x +3, char_y +6, char_x +7, char_y +1)
    //draw leftarm
    line(char_x -3, char_y +5, char_x -9, char_y -1)
    

    
//draw shoes
    noStroke();
    fill(255,105,180);
    ellipse(char_x -7, char_y +26, 4,3);
    ellipse(char_x, char_y +26, 4,3);
    }
    else if(isLeft)
    {
        // add your walking left code
    fill(255,228,255);
    triangle(char_x -10, char_y +20,char_x +10, char_y +20, char_x, char_y );
    
    
    //draw head
    ellipse(char_x, char_y -5,15,15);
    
    //draw hair
    stroke(135,206,250,120);
    strokeWeight(9);
   
    line(char_x +7, char_y -11, char_x +10, char_y +2);
    
    //draw bow
    strokeWeight(1);
    fill(255,105,180);
    ellipse(char_x -5, char_y -13,7,8);
    ellipse(char_x, char_y -13,4,4);
    ellipse(char_x +5, char_y -13,9,10);
    stroke(135,206,250);
    ellipse(char_x, char_y -13,2,2);
    line(char_x,char_y -13, char_x -4, char_y -14);
    line(char_x, char_y -13,char_x +6, char_y -14);
    
     //draw mouth
    stroke(135,206,250)
    strokeWeight(1);
    arc(char_x-3, char_y -2,5, 5, 0, PI)
    
   //draw cheeks
    noStroke();
    fill(255,105,180);
    ellipse(char_x -1, char_y -4, 5,2);
    
    //draw eyes
    fill(135,206,250)
    ellipse(char_x -3, char_y -6, 3,3);
    
    fill(255);
    ellipse(char_x -3, char_y -6, 1,1);
    
    //draw left leg
    fill(135,206,250);
    stroke(135,206,250);
    strokeWeight(3);
    line(char_x -3,
        char_y +20,
        char_x -10,
        char_y +23);
    
    //draw right leg
        line(char_x +3,
        char_y +20,
        char_x +5,
        char_y +25);
    
    //draw rightarm
    fill(135,206,250);
    line(char_x +3, char_y +5, char_x +3, char_y +13)
    //draw leftarm
    line(char_x -3, char_y +5, char_x -9, char_y +4)
    
//draw shoes
    noStroke();
    fill(255,105,180);
    ellipse(char_x -10, char_y +23, 4,3);
    ellipse(char_x +5, char_y +25, 4,3);
        

    }
    else if(isRight)
    {
        // add your walking right code
     //draw body
    fill(255,228,255);
    triangle(char_x -10, char_y +20,char_x +10, char_y +20, char_x, char_y );
    
    
    //draw head
    ellipse(char_x, char_y -5,15,15);
    
    //draw hair
    stroke(135,206,250,120);
    strokeWeight(10);
    line(char_x -7, char_y -11, char_x -10, char_y +2);
    
    //draw bow
    strokeWeight(1);
    fill(255,105,180);
    ellipse(char_x -5, char_y -13,9,10);
    ellipse(char_x, char_y -13,4,4);
    ellipse(char_x +5, char_y -13,7,8);
    stroke(135,206,250);
    ellipse(char_x, char_y -13,2,2);
    line(char_x,char_y -13, char_x -6, char_y -14);
    line(char_x, char_y -13,char_x +3, char_y -14);
    
     //draw mouth
    stroke(135,206,250)
    strokeWeight(1);
    arc(char_x +3, char_y -2,5, 5, 0, PI)
    
   //draw cheeks
    noStroke();
    fill(255,105,180);
    ellipse(char_x, char_y -4, 5,2);
  
    //draw eyes
    fill(135,206,250)
    
    ellipse(char_x +3, char_y -6, 3,3);
    fill(255);
    ellipse(char_x -3, char_y -6, 1,1);
    ellipse(char_x +3, char_y -6, 1,1);
    
    
    
    //draw left leg
    fill(135,206,250);
    stroke(135,206,250);
    strokeWeight(3);
    line(char_x -3,
        char_y +20,
        char_x -4,
        char_y +25);
    
    //draw right leg
        line(char_x +3,
        char_y +20,
        char_x +10,
        char_y +23);
    
    //draw rightarm
    fill(135,206,250);
    line(char_x +3, char_y +5, char_x +9, char_y +3)
    //draw leftarm
    line(char_x -3, char_y +5, char_x -3, char_y +13)
    
    

    
//draw shoes
    noStroke();
    fill(255,105,180);
    ellipse(char_x -3, char_y +25, 4,3);
    ellipse(char_x +11, char_y +23, 4,3);
            
    }
    else if(isJumping || isFalling)
    {
        // add your jumping facing forwards code
 //draw body
    fill(255,228,255);
    triangle(char_x -10, char_y +20,char_x +10, char_y +20, char_x, char_y );
    
    
    //draw head
    ellipse(char_x, char_y -5,15,15);
    
    //draw hair
    stroke(135,206,250,120);
    strokeWeight(7);
    line(char_x -7, char_y -11, char_x -10, char_y +2);
    line(char_x +7, char_y -11, char_x +10, char_y +2);
    
    //draw bow
    strokeWeight(1);
    fill(255,105,180);
    ellipse(char_x -5, char_y -13,9,10);
    ellipse(char_x, char_y -13,4,4);
    ellipse(char_x +5, char_y -13,9,10);
    stroke(135,206,250);
    ellipse(char_x, char_y -13,2,2);
    line(char_x,char_y -13, char_x -6, char_y -14);
    line(char_x, char_y -13,char_x +6, char_y -14);
    
     //draw mouth
    stroke(135,206,250)
    strokeWeight(1);
    arc(char_x, char_y -2,5, 5, 0, PI)
    
   //draw cheeks
    noStroke();
    fill(255,105,180);
    ellipse(char_x -5, char_y -4, 5,2);
    ellipse(char_x +5, char_y -4, 5,2);
    
    //draw eyes
    fill(135,206,250)
    ellipse(char_x -3, char_y -6, 3,3);
    ellipse(char_x +3, char_y -6, 3,3);
    fill(255);
    ellipse(char_x -3, char_y -6, 1,1);
    ellipse(char_x +3, char_y -6, 1,1);
    
    
    
    //draw left leg
    fill(135,206,250);
    stroke(135,206,250);
    strokeWeight(3);
    line(char_x -3,
        char_y +20,
        char_x -10,
        char_y +25);
    
    //draw right leg
        line(char_x +3,
        char_y +20,
        char_x +10,
        char_y +25);
    
    //draw rightarm
    fill(135,206,250);
    line(char_x +3, char_y +5, char_x +9, char_y +2)
    //draw leftarm
    line(char_x -3, char_y +5, char_x -9, char_y +2)
    
//draw shoes
    noStroke();
    fill(255,105,180);
    ellipse(char_x -10, char_y +25, 4,3);
    ellipse(char_x +11, char_y +25, 4,3);
        
       
    }
    else
    {
        // add your standing front facing code
         //draw body
    fill(255,228,255);
    triangle(char_x -10, char_y +20,char_x +10, char_y +20, char_x, char_y );
    
    
    //draw head
    ellipse(char_x, char_y -5,15,15);
    
    //draw hair
    stroke(135,206,250,120);
    strokeWeight(7);
    line(char_x -7, char_y -11, char_x -10, char_y +2);
    line(char_x +7, char_y -11, char_x +10, char_y +2);
    
    //draw bow
    strokeWeight(1);
    fill(255,105,180);
    ellipse(char_x -5, char_y -13,9,10);
    ellipse(char_x, char_y -13,4,4);
    ellipse(char_x +5, char_y -13,9,10);
    stroke(135,206,250);
    ellipse(char_x, char_y -13,2,2);
    line(char_x,char_y -13, char_x -6, char_y -14);
    line(char_x, char_y -13,char_x +6, char_y -14);
    
     //draw mouth
    stroke(135,206,250)
    strokeWeight(1);
    arc(char_x, char_y -2,5, 5, 0, PI)
    
   //draw cheeks
    noStroke();
    fill(255,105,180);
    ellipse(char_x -5, char_y -4, 5,2);
    ellipse(char_x +5, char_y -4, 5,2);
    
    //draw eyes
    fill(135,206,250)
    ellipse(char_x -3, char_y -6, 3,3);
    ellipse(char_x +3, char_y -6, 3,3);
    fill(255);
    ellipse(char_x -3, char_y -6, 1,1);
    ellipse(char_x +3, char_y -6, 1,1);
    
    //draw shoes
    fill(255,105,180);
    strokeWeight(3)
    ellipse(char_x -5, char_y +25, 4,3);
    ellipse(char_x +6, char_y +25, 4,3);
    
    //draw left leg
    fill(135,206,250);
    stroke(135,206,250);
    strokeWeight(3);
    line(char_x -3,
        char_y +20,
        char_x -3,
        char_y +25);
    //draw right leg
        line(char_x +3,
        char_y +20,
        char_x +3,
        char_y +25);
    
    //draw right arm
    fill(135,206,250);
    ellipse(char_x -3, char_y +10, 1,1)
    ellipse(char_x +3, char_y +10, 1,1)

    }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds(){
    for( var i=0; i < cloud.length; i++){
           noStroke();
    fill(255,228,255)
    ellipse(cloud[i].pos_x - 280,cloud[i].pos_y + 90,cloud[i].size + 45, cloud[i].size + 45);
    ellipse(cloud[i].pos_x - 280,cloud[i].pos_y + 30,cloud[i].size + 35,cloud[i].size + 35);
    fill(255);
    ellipse(cloud[i].pos_x - 175,cloud[i].pos_y + 30,cloud[i].size + 50, cloud[i].size + 50);
    ellipse(cloud[i].pos_x - 225,cloud[i].pos_y + 30, cloud[i].size + 40, cloud[i].size+ 40);
    ellipse(cloud[i].pos_x - 275,cloud[i].pos_y + 30,cloud[i].size +  35,cloud[i].size + 35)
    ellipse(cloud[i].pos_x - 160,cloud[i].pos_y + 90,cloud[i].size + 50,cloud[i].size + 50);
    ellipse(cloud[i].pos_x - 110,cloud[i].pos_y + 90, cloud[i].size + 45, cloud[i].size + 45);
    ellipse(cloud[i].pos_x - 120, cloud[i].pos_y + 50,cloud[i].size + 25, cloud[i].size + 25);
    ellipse(cloud. x_pos - 210, cloud[i].pos_y + 90, cloud[i].size + 45,cloud[i].size + 45);
    ellipse(cloud[i].pos_x - 220, cloud[i].pos_y + 90,cloud[i].size + 55, cloud[i].size + 55);
    ellipse(cloud[i].pos_x - 270, cloud[i].pos_y + 90,cloud[i].size + 45, cloud[i].size + 45);
    }
}
function drawClouds2(){
    for( var i=0; i < cloud.length; i++){
    fill(175,238,238)
    ellipse(cloud2[i].pos_x - 480,cloud2[i].pos_y + 190,cloud2[i].size + 45, cloud2[i].size + 35);
    ellipse(cloud2[i].pos_x - 480,cloud2[i].pos_y + 130,cloud2[i].size + 35,cloud2[i].size + 15);
    ellipse(cloud2[i].pos_x - 360,cloud2[i].pos_y + 190,cloud2[i].size + 50,cloud2[i].size + 50);
    fill(255);
    ellipse(cloud2[i].pos_x - 375,cloud2[i].pos_y + 130,cloud2[i].size + 50, cloud2[i].size + 50);
    ellipse(cloud2[i].pos_x - 425,cloud2[i].pos_y + 130, cloud2[i].size + 40, cloud2[i].size+ 40);
    ellipse(cloud2[i].pos_x - 475,cloud2[i].pos_y + 130,cloud2[i].size +  40,cloud2[i].size + 40)

    ellipse(cloud2[i].pos_x - 310,cloud2[i].pos_y + 190, cloud2[i].size + 45, cloud2[i].size + 45);
    ellipse(cloud2[i].pos_x - 320, cloud2[i].pos_y + 150,cloud2[i].size + 25, cloud2[i].size + 25);
    ellipse(cloud2[i]. x_pos - 410, cloud2[i].pos_y + 190, cloud2[i].size + 45,cloud2[i].size + 45);
    ellipse(cloud2[i].pos_x - 420, cloud2[i].pos_y + 190,cloud2[i].size + 55, cloud2[i].size + 55);
    ellipse(cloud2[i].pos_x - 470, cloud2[i].pos_y + 190,cloud2[i].size + 45, cloud2[i].size + 45);
    }
}

// Function to draw mountains objects.
function drawMountains(){
    for( var i= 0; i < mountains.length; i++){
     fill(230,230,250);
 triangle(mountains[i].pos_x + 500,mountains[i].height + 97,mountains[i].pos_x + 400,432,mountains[i].pos_x + 600,432);
    fill(255,228,255);
    triangle(mountains[i].pos_x + 500,mountains[i].height + 97,mountains[i].pos_x + 470,mountains[i].height + 197,mountains[i].pos_x + 530,mountains[i].height + 197);
    triangle(mountains[i].pos_x + 500, mountains[i].height+ 247,mountains[i].pos_x + 470,mountains[i].height + 197,mountains[i].pos_x + 530, mountains[i].height +197);
    fill(255);
    ellipse(mountains[i].pos_x + 470,100,5,5);
    ellipse(mountains[i].pos_x + 480,90,5,5);
    ellipse(mountains[i].pos_x + 490,80,5,5);
    fill(255,192,203);
    ellipse(mountains[i].pos_x + 500,70,5,5);
    fill(255)
    ellipse(mountains[i].pos_x + 510,80,5,5);
    ellipse(mountains[i].pos_x + 520,90,5,5);
    ellipse(mountains[i].pos_x + 530,100,5,5);
    fill(255,192,203);
    triangle(mountains[i].pos_x + 300,350,mountains[i].pos_x +500,250,mountains[i].pos_x +300,432);
    triangle(mountains[i].pos_x + 500,250,mountains[i].pos_x +700,350,mountains[i].pos_x +700,432)
    }
}

// Function to draw trees objects.
function drawTrees(){
    for(var i=0; i< trees.length; i++){
    noStroke();
    fill(255);
   
    fill(160,82,45);
    quad( trees[i].pos_x + 715,  trees[i].height +355, trees[i].pos_x  + 715,432, trees[i].pos_x  + 735, 432, trees[i].pos_x  +735, trees[i].height + 355);
    fill(139,69,19)
    ellipse(trees[i].pos_x  + 728,trees[i].height + 410,8,10);
    fill(255,228,255)
    noStroke();
    stroke(224,255,255);
    ellipse(trees[i].pos_x  + 740,trees[i].height + 310,50,50)
    ellipse(trees[i].pos_x + 700,trees[i].height+ 340,65,65)
    ellipse(trees[i].pos_x  + 710,trees[i].height + 300,30,30);
     fill(255,105,180)
    ellipse(trees[i].pos_x  + 740,trees[i].height + 330,40,40);
    ellipse(trees[i].pos_x  + 750,trees[i].height + 350,50,50);
    ellipse(trees[i].pos_x  + 720, trees[i].height + 310,50,50);
    ellipse(trees[i].pos_x  + 695, trees[i].height + 350,50,50)
         fill(255,228,255)
    ellipse(trees[i].pos_x  + 760,trees[i].height + 350,60,60)
    ellipse(trees[i].pos_x  + 720,trees[i].height + 349,50,50);
    ellipse(trees[i].pos_x  + 700,trees[i].height + 360,50,50)
    noStroke();
    
   stroke(224,255,255);
    fill(160,82,45);
    line(trees[i].pos_x  + 680,trees[i].height + 330,trees[i].pos_x  + 715,trees[i].height + 360);
    line(trees[i].pos_x  + 700, trees[i].height +  290,trees[i].pos_x  + 720,trees[i].height +360);
    line(trees[i].pos_x  + 740, trees[i].height + 290, trees[i].pos_x  + 706, trees[i].height + 315);
    line(trees[i].pos_x  + 770, trees[i].height + 320,trees[i].pos_x  + 728,trees[i].height + 360)
    }
}

// Function to draw houses objects.
function drawHouses(){
    for(var i=0; i < houseXs.length; i++){
    fill(255,105,180)
    rect(houseXs[i] + 80,yPos_house + 430,150,30);
    rect(houseXs[i]  + 96,yPos_house + 410,120,15)
    fill(255,228,255)
    rect(houseXs[i]  + 96, yPos_house + 420,120,15)
    rect(houseXs[i]  + 105, yPos_house + 400,100,15)
    fill(255,105,180)
    rect(houseXs[i]  + 105,yPos_house+ 400,100,10);
    fill(255,228,255);
    rect(houseXs[i]  + 181,yPos_house + 375,14,39)
    fill(244,164,96)
    rect(houseXs[i]  + 85,yPos_house + 460,138,80);
     fill(255,105,180)
    rect(houseXs[i]  + 139,yPos_house + 500,30,40);
    fill(100,155,255);
    rect(houseXs[i]  + 100,yPos_house + 500,20,20);
    fill(255,228,255)
    rect(houseXs[i]  + 100,yPos_house + 500,10,10)
    
    rect(houseXs[i]  + 190,yPos_house + 500,20,20);
    ellipse(houseXs[i]  + 165,yPos_house + 525,5,5)
    
    fill(255,228,255)
    ellipse(houseXs[i]  + 200, yPos_house + 350,5,5);
    ellipse(houseXs[i]  + 220, yPos_house + 340,10,10);
    ellipse(houseXs[i]  + 230,yPos_house + 320,20,20);
    ellipse(houseXs[i]  + 240,yPos_house + 320,30,30);
    ellipse(houseXs[i]  + 260,yPos_house +280,35,35);
    fill(250);
    ellipse(houseXs[i]  + 250,yPos_house +280,35,35);}
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    fill(50,50,0);
    rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    if(realPos > t_canyon.x_pos && realPos < t_canyon.x_pos + t_canyon.width)
        {if(!isJumping && !isOnPlatform)
                {
                    // condition where if you are on the platform you do not fall into a canyon if char is in canyon range
                    isFalling = true;
                }
        }
}

// ----------------------------------
// Pick-up render and check functions
// ----------------------------------

// Function to draw pick-up objects.
function drawJewel(jewel)
{
if(!jewel.isFound){
    noStroke();
   fill(250,128,114)
    triangle(jewel.x_pos + 20,jewel.y_pos + 50, jewel.x_pos + 10, jewel.y_pos + 60,jewel.x_pos + 20,jewel.y_pos + 60);
    quad(jewel.x_pos + 10,jewel.y_pos+ 60, jewel.x_pos+ 10,jewel.y_pos+ 80, jewel.x_pos +20,jewel.y_pos + 80, jewel.x_pos + 20,jewel.y_pos +60);
    triangle(jewel.x_pos + 10,jewel.y_pos+ 80,jewel.x_pos +20,jewel.y_pos+  90,jewel.x_pos +20, jewel.y_pos + 80)
    triangle(jewel.x_pos+ 30, jewel.y_pos+ 50, jewel.x_pos +30, jewel.y_pos+ 60, jewel.x_pos +40, jewel.y_pos+60);
    quad(jewel.x_pos +30,jewel.y_pos+ 60, jewel.x_pos+30,jewel.y_pos+ 80, jewel.x_pos+40,jewel.y_pos +80, jewel.x_pos+ 40, jewel.y_pos+60);
    triangle(jewel.x_pos + 30, jewel.y_pos+ 80, jewel.x_pos +30,jewel.y_pos +90, jewel.x_pos +40,jewel.y_pos+80);
    

    //big quad
    
        quad(jewel.x_pos + 20, jewel.y_pos+50, jewel.x_pos+ 20, jewel.y_pos+ 90,jewel.x_pos+ 30, jewel.y_pos+ 90, jewel.x_pos+ 30,jewel.y_pos +50);
        fill(0);
        fill(205,92,92);
        triangle(jewel.x_pos + 11.2,jewel.y_pos +65.4, jewel.x_pos + 11.2,jewel.y_pos + 78.6, jewel.x_pos + 18,jewel.y_pos+ 78.6);
        triangle(jewel.x_pos+ 12, jewel.y_pos +81.4, jewel.x_pos+ 18.6, jewel.y_pos + 88, jewel.x_pos+ 18.6, jewel.y_pos +81.4);
        fill(175,238,238);
        triangle(jewel.x_pos+ 21.2,jewel.y_pos+ 61.4, jewel. x_pos+ 28.6, jewel.y_pos+ 66.6, jewel.x_pos + 28.6, jewel.y_pos + 61.4);


        stroke(205,92,92);
        strokeWeight(1);
        line(jewel.x_pos + 20,jewel.y_pos+ 50,jewel. x_pos + 20,jewel. y_pos+ 90);
        line(jewel. x_pos + 30, jewel. y_pos + 50, jewel.x_pos + 30, jewel.y_pos+ 90);
        line(jewel.x_pos + 10,jewel.y_pos + 60, jewel. x_pos + 39.2,jewel.y_pos +60);
        line(jewel.x_pos + 10, jewel.y_pos + 80, jewel.x_pos + 39.2, jewel.y_pos + 80)
}
}

// Function to check character has picked up an item.
    
function checkJewel(jewel)
    {
        if ((realPos >jewel.x_pos+ 10 ) && (realPos < jewel.x_pos + 39.2) && (char_y <jewel.y_pos +90) && (char_y >  jewel.y_pos +50))
    {
        if(jewel.isFound == false){
          score += 1;  
        }
        jewel.isFound = true;
        console.log(score);
    }
    }


function checkPlayerWon(){
    if(score == jewels.length){
        isWon = true;
        console.log("you win")
    }
}

function checkPlayerDied(){
    if(char_y > height){
        
       playerDied(); 
    }
}

function playerDied()
{
    
        if(lives > 0 && !isWon)
        {   
            lives --;
            drawGame();
            
        }
         if(lives == 0){
             
         
            isLost = true;
         }
}

function nextLevel()
{
    // DO NOT CHANGE THIS FUNCTION!
    console.log('next level');
}

