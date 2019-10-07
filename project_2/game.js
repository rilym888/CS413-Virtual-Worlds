var gameport = document.getElementById("gameport");

// Frame init
var WIDTH = 500;
var HEIGHT = 500;
var renderer = PIXI.autoDetectRenderer({width: WIDTH, height: HEIGHT, backgroundColor: 0x1a52ff});
gameport.appendChild(renderer.view);
var stage = new PIXI.Container();



/// Menu ///
var menuStage = new PIXI.Container();
stage.addChild(menuStage);
var menuBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
menuStage.addChild(menuBackground);

// Play Button
var playButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-play.png"));
playButton.anchor.set(0.5);
playButton.position.set(250,250);
playButton.interactive = true;
playButton.on('mousedown', playButtonHandler);
menuStage.addChild(playButton);
function playButtonHandler(e)
{
  stage.removeChild(menuStage);
  stage.addChild(gameStage);
}

// Instructions Button
var instrButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-instructions.png"));
instrButton.anchor.set(0.5);
instrButton.position.set(250,350);
instrButton.interactive = true;
instrButton.on('mousedown', instrButtonHandler);
menuStage.addChild(instrButton);
function instrButtonHandler(e)
{
  stage.removeChild(menuStage);
  stage.addChild(instrStage);
}



// Instructions
var instrStage = new PIXI.Container();
var instrBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-instructions.png"));
instrStage.addChild(instrBackground);
var returnButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-return.png"));
returnButton.anchor.set(0.5);
returnButton.position.set(250,350);
returnButton.interactive = true;
returnButton.on('mousedown', returnButtonHandler);
instrStage.addChild(returnButton);
function returnButtonHandler(e)
{
  stage.removeChild(instrStage);
  stage.addChild(menuStage);
}


// Game
var gameStage = new PIXI.Container();
var gameBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-tree.png"));
gameStage.addChild(gameBackground);






function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
}
animate();
