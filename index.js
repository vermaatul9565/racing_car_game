const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

console.log(gameArea);

startScreen.addEventListener('click', start);

let player = { speed : 6, score: 0};
let keys = { ArrowUp : false, Arrowdown : false, ArrowLeft : false, ArrowRight : false};

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    console.log(e.key);
    console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    console.log(e.key);
    console.log(keys);
}

function iscollide(a,b) {
    aReact = a.getBoundingClientRect();
    bReact = b.getBoundingClientRect();

    return !(( aReact .bottom < bReact.top) || (aReact.top > bReact.bottom) || 
              (aReact.right < bReact.left) || (aReact.left > bReact.right)
            );
}

function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item) {
        
        if (item.y >= 800) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endgame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "<h2>Game  Over !</h2><br> Your Final Score is : " + player.score + " <br>Press here to restart Game";
}

function moveenemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item) {

        if (iscollide(car, item)) {
            
            endgame();
        }
        
        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}


function gamePlay() {
    //console.log("ram");

    let car = document.querySelector('.car');
     let road = gameArea.getBoundingClientRect();

    if (player.start) {

        moveLines();
        moveenemy(car);

      if (keys.ArrowUp && player.y > (road.top + 70)) {
          player.y -= player.speed; 
        }
      if (keys.Arrowdown && player.y < (road.bottom - 90)) {
          player.y += player.speed;
        }
      if (keys.ArrowLeft && player.x > 0) {
          player.x -= player.speed; 
        }
      if (keys.ArrowRight && player.x < (road.width - 70)) {
          player.x += player.speed; 
        }

      car.style.top = player.y + "px";
      car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
     
    player.score++;
    let ps = player.score - 1;
    score.innerHTML = "Score : " + ps;

    }

}

function start() {
   // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);


   for (x =0; x < 5; x++) {

    let roadLine = document.createElement('div');
    roadLine.setAttribute('class', 'lines');
    roadLine.y = (x*150);
    roadLine.style.top = (x*150) + "px";
    gameArea.appendChild(roadLine);

   }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    //car.innerText = "ram";
    gameArea.appendChild(car);

    player.x =car.offsetLeft;
    player.y = car.offsetTop;

    for (x =0; x < 3; x++) {

        let enemyCar = document.createElement('div');
       enemyCar.setAttribute('class', 'enemy');
       enemyCar.y = ((x+1) *350) * -1;
       enemyCar.style.top = enemyCar.y + "px";
       enemyCar.style.backgroundColor = randomColor();
       enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    
       }
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        console.log(hex);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
} 

