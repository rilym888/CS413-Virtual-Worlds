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


// Add play Button
var playButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-play.png"));
playButton.anchor.set(0.5);
playButton.position.set(250,200);
playButton.interactive = true;
playButton.buttonMode = true;
playButton.on('mousedown', playButtonHandler);
menuStage.addChild(playButton);


var menuBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
menuStage.addChild(menuBackground);


// Handles mouse click on play button
function playButtonHandler(e)
{
  stage.removeChild(menuStage); // leave main menu
  stage.addChild(gameStage);    // Go to game stage
  setInterval(spawnApples, 1500);
}

// Add instructions Button
var instrButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-instructions.png"));
instrButton.anchor.set(0.5);
instrButton.position.set(250,300);
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

// Add credits Button
var creditButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-credits.png"));
creditButton.anchor.set(0.5);
creditButton.position.set(250,400);
creditButton.interactive = true;
creditButton.buttonMode = true;
creditButton.on('mousedown', creditButtonHandler);
menuStage.addChild(creditButton);

// Handles mouse click on credits button
function creditButtonHandler(e)
{
  stage.removeChild(menuStage); // Leave main menu
  stage.addChild(creditStage);  // Go to credits screen
}
/// END of Menu stage /////////////////



/// Instructions Stage ////////////////
var instrStage = new PIXI.Container();
var instrBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
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
var instrText = new PIXI.Text('Press \'A\' to move left.\nPress \'D\' to move right.\nPress \'spacebar\' to catch apples.\nCatch as many apples as you can.\nIf 3 apples hit the ground, you lose.');
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



/// Credits Stage ////////////////////
var creditStage = new PIXI.Container();
var creditBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
creditStage.addChild(creditBackground);
var creditReturnButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-return.png"));
creditReturnButton.anchor.set(1.0);
creditReturnButton.position.set(WIDTH, HEIGHT);
creditReturnButton.interactive = true;
creditReturnButton.buttonMode = true;
creditReturnButton.on('mousedown', creditReturnButtonHandler);
creditStage.addChild(creditReturnButton);

// Handles mouse click on return button
function creditReturnButtonHandler(e)
{
  stage.removeChild(creditStage);  // Leave credits screen
  stage.addChild(menuStage);       // Go to main menu
}

// Credits text
var creditText = new PIXI.Text('Apple Catcher\n\nCreated by Riley McWilliams\n\nCS413: Virtual Worlds - Fall 2019');
creditText.anchor.set(0.5);
creditText.position.set(250,250);
creditStage.addChild(creditText);
/// END of Credits Stage //////////////



/// Game Stage ////////////////////////
var gameStage = new PIXI.Container();
var gameBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-tree.png"));
gameStage.addChild(gameBackground);
var appleTexture = new PIXI.Texture.fromImage("Assets/Sprites/apple.png");
/// End of game stage /////////////////



/// Game over Stage ///////////////////
var gameOverStage = new PIXI.Container();
var gameOverBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-gameover.png"));
gameOverStage.addChild(gameOverBackground);
var gameOverReturnButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-return.png"));
gameOverReturnButton.anchor.set(1.0);
gameOverReturnButton.position.set(WIDTH, HEIGHT);
gameOverReturnButton.interactive = true;
gameOverReturnButton.buttonMode = true;
gameOverReturnButton.on('mousedown', gameOverReturnButtonHandlder);
gameOverStage.addChild(gameOverReturnButton);

// Handles mouse click on return button
function gameOverReturnButtonHandlder(e)
{
  stage.removeChild(gameOverStage); // Leave game over screen
  stage.addChild(menuStage);        // Go to main menu
}
/// END of Game over Stage ////////////



/// Gameplay code ////////////////////////
// Score ///////////////
var score = 0;
var lives = 3;
var scoreText = new PIXI.Text(': ' + score);
scoreText.anchor.set(0.0, 1.0);
scoreText.position.set(35, HEIGHT-5);
gameStage.addChild(scoreText);
// END of score ////////



// Gatherer ////////////
var gatherer; // Add gatherer variable
var gathererWIDTH = 100;  // Width of sprite bounds
var gathererHEIGHT = 140; // Height of sprite bounds

PIXI.loader   // load gatherer sprite sheet json
        .add("Assets/Sprites/gathererSpriteSheet.json")
        .load(gatherer);

// Get gatherer frames and add it to the stage
function gatherer()
{
  var spriteSheet = PIXI.Loader.shared.resources["Assets/Sprites/gathererSpriteSheet.json"].spritesheet;
  gatherer = new PIXI.AnimatedSprite(spriteSheet.animations["gatherer"]);
  gatherer.anchor.set(0.5);
  gatherer.position.set(WIDTH/2, HEIGHT-gathererHEIGHT/2 - 50);
  gatherer.animationSpeed = 0.05;
  gatherer.loop = false;  // Want the animation to only play once per keypress.
  gameStage.addChild(gatherer);
}

// Gatherer controls
function gathererKeyDownHander(e)
{
  if(e.keyCode == 32) // spacebar
  {
    gatherer.gotoAndPlay(0); // Play animation from first frame.
    //gatherer.onComplete(gatherer.gotoAndStop(0));
    //gatherer.gotoAndStop(0);
  }

  if(e.keyCode == 65) // A
  {
    gatherer.position.x -= 10; // Move left
  }
  if(e.keyCode == 68) // D
  {
    gatherer.position.x += 10; // Move right
  }

  // Loops gatherer back around the screen
  if(gatherer.position.x > WIDTH) {gatherer.position.x = 0;}
  if(gatherer.position.x < 0) {gatherer.position.x = WIDTH;}
}
document.addEventListener('keydown', gathererKeyDownHander);
// END of gatherer /////


// Apple sound /////////
//PIXI.sound.add('pop', 'Assets/Sounds/pop.mp3');
//const pop = PIXI.sound.Sound.from('Assets/Sounds/pop.mp3');
//PIXI.sound.add('pop', 'Assets/Sounds/pop.mp3');
//PIXI.sound.play('pop');
//const sound = PIXI.sound.Sound.from('Assets/Sounds/pop.mp3');
//sound.play();


// Apples //////////////
var appleCount = 0;   // Keep track of how many apples are on screen.
var appleWIDTH = 30;  // Width of sprite bounds
var appleHEIGHT = 30; // Height of sprite bounds

// Add an apple scprite next to the score.
var scoreApple = new PIXI.Sprite(appleTexture);
scoreApple.anchor.set(0.0, 1.0);
scoreApple.position.set(5, HEIGHT-5);
gameStage.addChild(scoreApple);

// Creates the apples at the top of the screen at a random x position.
function spawnApples()
{
  if(appleCount < 5) // Makes sure you don't get infinite apples.
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

// Drops the apples toward the grown from their spawn location.
function appleFall(apple)
{
  setTimeout(function()
  {
    // If apple hits near gatherer's basket, then remove it and increase score.
    if(apple.position.y + appleHEIGHT/2 >= gatherer.position.y-gathererHEIGHT/2 &&
       apple.position.y - appleHEIGHT/2 <= gatherer.position.y-gathererHEIGHT/2 + 30 &&
       apple.position.x + appleWIDTH/2 <= gatherer.position.x+gathererWIDTH/2 &&
       apple.position.x - appleWIDTH/2 >= gatherer.position.x-gathererWIDTH/2)
       {
         gameStage.removeChild(apple);    // Get rid of caught apple
         //pop.play();                    // pLay catching sound effect
         score++;                         // Increment score
         scoreText.text = ": " + score;   // Display new score
         appleCount--;                    // Reduce number of apples on screen by 1.
         return;
       }
    if(apple.y >= HEIGHT + 15)  // If apple hits floor (uncaught).
    {
      lives--;                         // lose 1 life
      if(lives == 0)                   // If all lives are lost
      {
        stage.removeChild(gameStage);  // Leave gameplay screen
        stage.addChild(gameOverStage); // Go to game over screen.
      }
      gameStage.removeChild(apple);    // Get rid of caught apple
      appleCount--;                    // Reduce number of apples on screen by 1.
      return;
    }

    requestAnimationFrame(function(temp)
    {
      appleFall(apple);
    });
    apple.y += 2;           // Apple falls 2 pixels per upadte
    apple.rotation += 0.1;  // Apple roates 0.1 per update
  }, 1000/60);
}
// END of Apples ///////
/// END of gameplay code /////////////////

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
}
animate();
