var gameport = document.getElementById("gameport");

// Frame init
var WIDTH = 500;
var HEIGHT = 500;
var renderer = PIXI.autoDetectRenderer({width: WIDTH, height: HEIGHT, backgroundColor: 0x1a52ff});
gameport.appendChild(renderer.view);
var stage = new PIXI.Container();

/// Menu Stage ////////////////////////
var menuStage = new PIXI.Container();
stage.addChild(menuStage);
var menuBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
menuStage.addChild(menuBackground);

// Add play Button
var playButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-play.png"));
playButton.anchor.set(0.5);
playButton.position.set(250,250);
playButton.interactive = true;
playButton.buttonMode = true;
playButton.on('mousedown', playButtonHandler);
menuStage.addChild(playButton);

// Handles mouse click on play button
function playButtonHandler(e)
{
  stage.removeChild(menuStage); // leave main menu
  stage.addChild(gameStage);    // Go to game stage
  setInterval(spawnApples, 1000);
}

// Add instructions Button
var instrButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-instructions.png"));
instrButton.anchor.set(0.5);
instrButton.position.set(250,350);
instrButton.interactive = true;
instrButton.buttonMode = true;
instrButton.on('mousedown', instrButtonHandler);
menuStage.addChild(instrButton);

// Handles mouse click on instructions button
function instrButtonHandler(e)
{
  stage.removeChild(menuStage); // Leave main menu
  stage.addChild(instrStage);   // Go to instructions menu
}
/// END of Menu stage /////////////////


/// Instructions Stage ////////////////
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

// Handles mouse click on return button
function returnButtonHandler(e)
{
  stage.removeChild(instrStage);  // Leave instructions menu
  stage.addChild(menuStage);      // Go to main menu
}

// Instructions text
var instrText = new PIXI.Text('instructions here');
instrText.anchor.set(0.5);
instrText.position.set(250,250);
instrStage.addChild(instrText);
/// END of instrucions Stage //////////

/// Game Stage ////////////////////////
var gameStage = new PIXI.Container();
var gameBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-tree.png"));
gameStage.addChild(gameBackground);
var appleTexture = new PIXI.Texture.fromImage("Assets/Sprites/apple.png");
/// End of game stage /////////////////

/// Game logic ////////////////////////
// gatherer
var gatherer;

PIXI.loader
        .add("Assets/Sprites/gathererSpriteSheet.json")
        .load(gatherer);

function gatherer()
{
  var spriteSheet = PIXI.Loader.shared.resources["Assets/Sprites/gathererSpriteSheet.json"].spritesheet;
  gatherer = new PIXI.AnimatedSprite(spriteSheet.animations["gatherer"]);
  gatherer.anchor.set(0.5, 1.0);
  gatherer.position.set(WIDTH/2, HEIGHT-20);
  gatherer.animationSpeed = 0.05;
  gatherer.loop = false;
  gameStage.addChild(gatherer);
}

// Gatherer controls
function gathererKeyDownHander(e)
{
  if(e.keyCode == 32)
  {
    gatherer.gotoAndPlay(0);
    gatherer.onComplete(gatherer.gotoAndStop(0));
    //gatherer.gotoAndStop(0);
    //gatherer
  }

  if(e.keyCode == 65) { gatherer.position.x -= 10;} // A
  if(e.keyCode == 68) { gatherer.position.x += 10; } // D

  if(gatherer.position.x > WIDTH) {gatherer.position.x = 0;}
  if(gatherer.position.x < 0) {gatherer.position.x = WIDTH;}
}
document.addEventListener('keydown', gathererKeyDownHander);





















// Creates the apples at the top of the screen at a random x position.
var appleCount = 0;
function spawnApples()
{
  if(appleCount < 3)
  {
    var apple = new PIXI.Sprite(appleTexture);
    apple.anchor.set(0.5);
    apple.x = Math.floor(Math.random() * WIDTH);
    apple.y = 15;
    gameStage.addChild(apple);
    appleCount++;
    appleFall(apple);
  }
}

/*function gameLoop()
{
  var apple = spawnApples();
  new_x = 250;
  new_y = HEIGHT;
  createjs.Tween.get(apple.position).to({x: new_x, y: new_y}, 1000);
}*/

// Drops the apples toward the grown from their spawn location.
function appleFall(apple)
{
  setTimeout(function()
  {
    /*if(apple.position.y >= gatherer.position.y-32 &&
       apple.position.y <= gatherer.position.y+32 &&
       apple.position.x-8 <= gatherer.position.x+32 &&
       apple.position.x-8 >= gatherer.position.x-32)
       {
         gameStage.removeChild(apple);
         appleCount -= 1;
         return;
       }*/
    if(apple.y <= HEIGHT + 15)
    {
      gameStage.removeChild(apple);
      appleCount -= 1;
      return;
    }

    requestAnimationFrame(function(temp)
    {
      appleFall(apple);
    });
    apple.y += 5;
  }, 1000/60);
}
/// END of game logic /////////////////

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
}
animate();
