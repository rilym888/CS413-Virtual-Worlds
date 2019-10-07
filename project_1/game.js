var gameport = document.getElementById("gameport");

// Frame init
var fps = 60;
var WIDTH = 1000;
var HEIGHT = 300;
var renderer = PIXI.autoDetectRenderer({width: WIDTH, height: HEIGHT, backgroundColor: 0x1a52ff});
gameport.appendChild(renderer.view);

// Load assets
var stage = new PIXI.Container();
var arrowTexture = PIXI.Texture.fromImage("Assets/Sprites/Arrow.png");
var knight = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Sprites/Knight64.png"));
var background = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/background.png"));

// background init
background.anchor.set(0.5);
background.x = WIDTH / 2;
background.y = HEIGHT / 2;
stage.addChild(background);

// Score
var level = 1;
var score = 0;
var scoreText = new PIXI.Text('score: ' + score);
scoreText.x = 5;
scoreText.y = 0;
stage.addChild(scoreText);

// Knight init
knight.anchor.x = 0.5;
knight.anchor.y = 0.5;
knight.position.x = 50;
knight.position.y = HEIGHT-50;
stage.addChild(knight);

// Enemy init
var delay = 1000;
var numOfArrows = 0;

var timer = setInterval(function spawnArrows()
{
  if(numOfArrows <= 30)
  {
    var arrow = new PIXI.Sprite(arrowTexture);
    arrow.anchor.set(0.5);
    arrow.x = WIDTH;
    arrow.y = Math.floor(Math.random() * HEIGHT);
    stage.addChild(arrow);
    numOfArrows += 1;
    arrowFlight(arrow);

    if(delay > 400 && level % 10 == 1)
    {
      delay -= 10;
      level += 1;
      clearInterval(timer);
      setInterval(spawnArrows, delay);
    }
  }
}, delay);


// Knight controls
function knightControlHander(e)
{
  if(e.keyCode == 87) { knight.position.y -= 10; } // W
  if(e.keyCode == 83) { knight.position.y += 10; } // S
  if(e.keyCode == 65) { knight.position.x -= 10; } // A
  if(e.keyCode == 68) { knight.position.x += 10; } // D

  if(knight.position.x > WIDTH) {knight.position.x = 0;}
  if(knight.position.x < 0) {knight.position.x = WIDTH;}
  if(knight.position.y > HEIGHT) {knight.position.y = 0;}
  if(knight.position.y < 0) {knight.position.y = HEIGHT;}
}
document.addEventListener('keydown', knightControlHander);


// Enemy controls
function arrowFlight(arrow)
{
  setTimeout(function()
  {
    if(arrow.position.y >= knight.position.y-32 &&
       arrow.position.y <= knight.position.y+32 &&
       arrow.position.x-8 <= knight.position.x+32 &&
       arrow.position.x-8 >= knight.position.x-32)
       {
         score -= 10;
         scoreText.text = "score:" + score;

         stage.removeChild(arrow);
         numOfArrows -= 1;
         return;
       }
    if(arrow.x <= 0)
    {
      score+=1;
      level++;
      scoreText.text = "score:" + score;

      stage.removeChild(arrow);
      numOfArrows -= 1;
      return;
    }

    requestAnimationFrame(function(temp)
    {
      arrowFlight(arrow);
    });
    arrow.x -= 5;
  }, 1000/ fps);
}


function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
}

// Code from http://creativejs.com/resources/requestanimationframe/
function draw() {
    setTimeout(function() {
        requestAnimationFrame(draw);

    }, 1000 / fps);
}

animate();
draw();
