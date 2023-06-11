var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var i;
var score = 0 
function preload(){
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("jake1.png","jake2.png","jake3.png","jake4.PNG","jake5.png");
  carImg = loadImage ("sprite_0.png");
  blueboosterImg = loadImage("bluebooster.jpg");

  boosterImg = loadImage("booster.jpg");
  speedometerImg = loadImage("speedometer.gif");
  raceflagImg = loadImage("raceflag.gif");
  car3Img = loadImage("car3.png");
  car4Img = loadImage("car4.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2= loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  jumpsound = loadSound("jump.mp3");
  bonusSound = loadSound("bonus earned.wav");
  }

function setup(){
  
createCanvas(windowWidth,windowHeight);
  
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=1.2;

//creating boy running
//boy = createSprite(180,340,30,30);
//boy.addAnimation("JakeRunning",boyImg);
obstaclesGroup = new Group();
car= createSprite(180,340,30,30);
car.addImage("car",carImg);

car3 = createSprite(203,340,0,30);
car3.addImage("car3",car3Img);

car4 = createSprite(83,340,90,30) 
car4.addImage("car4",car4Img);


bluebooster = createSprite(182,412,40,40);
bluebooster.addImage("bluebooster",blueboosterImg);
bluebooster.scale = 0.1
// create left Boundary
leftBoundary=createSprite(width/2-100,0,100,800);
leftBoundary.visible = false;

//create right Boundary
rightBoundary=createSprite(420,0,100,800);
rightBoundary.visible = false;

//create boost
booster = createSprite(435,340,15,60);
booster.addImage(boosterImg);

booster.scale = 0.16

speedometer = createSprite(652,483);
speedometer.addImage(speedometerImg);

speedometer.scale = 0.25;

raceflag = createSprite(166,195);
raceflag.addImage(raceflagImg);

raceflag.scale = 0.27
//rightBoundary.debug = true;

}

function draw() {
  background(0);
  //car.debug = true;
  text("Score: "+ score, 500,50);
  text(mouseX+"," + mouseY, mouseX, mouseY);
  path.velocityY = 4;
  car.x = mouseX
  bluebooster.x = car.x
  booster.x = car.x
  if(car.x>=320){
  car.x = 320;  
  }
  if(bluebooster.x>=320){
  bluebooster.x = 320;  
  }
  if(booster.x>=320){
  booster.x = 320;
  }
  if(car.x<=320){
    car.x = 320;  
    }
    if(bluebooster.x<=320){
    bluebooster.x = 320;  
    }
    if(booster.x<=320){
    booster.x = 320;
    }
    
  // boy moving on Xaxis with mouse
  //boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  //boy.collide(edges[3]);
  //boy.collide(leftBoundary);
  //boy.collide(rightBoundary);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  if(keyDown("space")){
  raceflag.velocityX = 1.25;
  raceflag.velocityY = -0.5;
  
  }
  if(raceflag.isTouching(rightBoundary)){
  //raceflag.visible = false;
  raceflag.destroy()
  } 
  
  if(obstaclesGroup.isTouching(car)|| obstaclesGroup.isTouching(car3)|| obstaclesGroup.isTouching(car4) ){
  obstaclesGroup.destroyEach();
  score = score + 1000
  jumpsound.play()
  bonusSound.play()  
  }

spawnObstacles()
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 144 === 0) {
    var obstacle = createSprite(random(10,375),165,10,40);
    //obstacle.debug = true;
    obstacle.velocityY = 2
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}