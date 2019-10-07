var gameport = document.getElementById("gameport");

// Frame init
var WIDTH = 500;
var HEIGHT = 500;
var renderer = PIXI.autoDetectRenderer({width: WIDTH, height: HEIGHT, backgroundColor: 0x1a52ff});
gameport.appendChild(renderer.view);

/*
var stage = new PIXI.Container();


// Menu
var menuStage = new PIXI.Container();
var menuBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/background-menu.png"));
stage.addChild(menuStage);

// Instructions
var instructionsStage = new PIXI.Container();
var instuctionsBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/background-instructions.png"));
//stage.addChild(instructionsStage);

// Game
var gameStage = new PIXI.Container();
var gameBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/background-game.png"));
//stage.addChild(gameStage);


menuStage.addChild(menuBackground);
*/

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
}
animate();
