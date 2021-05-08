var PLAY = 1;
var END = 0;
var gameState = 1;
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var end, endImg;
var canvas;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  canvas = createCanvas(800,1200);
// Moving background
path=createSprite(400,400);
path.addImage(pathImg);
path.velocityY = 10;



//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.velocityY = -1;
boy.scale=0.08;
console.log(boy.y)
  
  end = createSprite(200,100);
  end.addAnimation("gameOver",endImg);
  end.scale = 0.5;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  //boy.debug = tru

  background(0);
  if(gameState === PLAY){
    end.visible = false;
   /* if(treasureCollection>=700){
      textSize( 50);
      fill("white")
      text("YOU WON",200,700);
      gameState= END;
    }*/
    if(treasureCollection>=500){
      
      
     gameState = END;
     console.log("you won");
     end.visible = false;

      

    }
    if(treasureCollection)
    
    
  
  boy.x = World.mouseX;
  camera.position.y = boy.y+50;
  
  /*if(boy.y>1600){
    gameState = END;
    
  }*/
  /*if(keyDown(UP_ARROW)){
    boy.velocityY = boy.velocityY-4
  }*/
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection +100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection +150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END;
        boy.addAnimation("SahilRunning",endImg);
    }
  }
    
  }
  else if(gameState === END){
    end.visible = true;
    path.velocityY = 0;
    boy.velocityY = 0;
    cashG.destroyEach();
    diamondsG.destroyEach();
    //diamondsG.setvelocityYEach(0);
    jwelleryG.destroyEach();
    //jwelleryG.setvelocityYEach(0);
    swordGroup.destroyEach();
    //swordGroup.setvelocityYEach(0);
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (camera.position.y%50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (camera.position.y % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (camera.position.y % 40 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (camera.position.y % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
function gameOver(){
  if(treasureCollection>=500){
    path.velocityY = 0;
    boy.velocityY = 0;
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
    textSize(20);
    fill("Red");
    text("YOU WON!",100,400);
  }
}