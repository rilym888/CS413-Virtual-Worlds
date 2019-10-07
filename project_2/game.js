var gameport = document.getElementById("gameport");

// Frame init
var WIDTH = 500;
var HEIGHT = 500;
var renderer = PIXI.autoDetectRenderer({width: WIDTH, height: HEIGHT, backgroundColor: 0x1a52ff});
gameport.appendChild(renderer.view);
var stage = new PIXI.Container();



/// Menu Stage ///
var menuStage = new PIXI.Container();
stage.addChild(menuStage);
var menuBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
menuStage.addChild(menuBackground);

// Play Button
var playButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-play.png"));
playButton.anchor.set(0.5);
playButton.position.set(250,250);
playButton.interactive = true;
playButton.buttonMode = true;
playButton.on('mousedown', playButtonHandler);
menuStage.addChild(playButton);
function playButtonHandler(e)
{
  stage.removeChild(menuStage);
  stage.addChild(gameStage);
  gameLoop();
}

// Instructions Button
var instrButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-instructions.png"));
instrButton.anchor.set(0.5);
instrButton.position.set(250,350);
instrButton.interactive = true;
instrButton.buttonMode = true;
instrButton.on('mousedown', instrButtonHandler);
menuStage.addChild(instrButton);
function instrButtonHandler(e)
{
  stage.removeChild(menuStage);
  stage.addChild(instrStage);
}



/// Instructions Stage ///
var instrStage = new PIXI.Container();
var instrBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-instructions.png"));
instrStage.addChild(instrBackground);
var returnButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-return.png"));
returnButton.anchor.set(1.0);
returnButton.position.set(WIDTH, HEIGHT);
returnButton.interactive = true;
returnButton.buttonMode = true;
returnButton.on('mousedown', returnButtonHandler);
instrStage.addChild(returnButton);
function returnButtonHandler(e)
{
  stage.removeChild(instrStage);
  stage.addChild(menuStage);
}

var instrText = new PIXI.Text('instructions here');
instrText.anchor.set(0.5);
instrText.position.set(250,250);
instrStage.addChild(instrText);


/// Game Stage ///
var gameStage = new PIXI.Container();
var gameBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-tree.png"));
gameStage.addChild(gameBackground);
var appleTexture = new PIXI.Texture.fromImage("Assets/Sprites/apple.png");
var apple = new PIXI.Sprite(appleTexture);
apple.vx = 0;
apple.vy = 0;
gameStage.addChild(apple);

/*var numOfApples = 0;
function spawnApples()
{
  if(numOfApples < 5)
  {
    var apple = new PIXI.Sprite(appleTexture);
    apple.anchor.set(0.5);
    apple.x = Math.floor(Math.random() * WIDTH);
    apple.y = 15;
    gameStage.addChild(apple);
    numOfApples += 1;
  }
}
spawnApples();*/


function gameLoop()
{
  requestAnimationFrame(gameLoop);

  apple.vx = 1;
  apple.vy = 1;

  apple.x += apple.vx;
  apple.y += apple.vy;

  renderer.render(stage);
}
gameLoop();



/*

function animate()
{
    requestAnimationFrame(animate);
    //apple.y += 10;
    renderer.render(stage);
}
animate();
*/
