const cards = document.querySelectorAll('.card')
const starterModal = document.querySelector('.starter-modal')
const loserModal = document.querySelector('.loser-modal')
const winnerModal = document.querySelector('.winner-modal')
const startBtn = document.querySelector('.start')
const tryAgainBtn = document.querySelector('.try')
const awardBtn = document.querySelector('.award')
const playBtn = document.querySelector('.again')
const prize = document.querySelector('.prize')
const time = document.querySelector('.time');

const winnerPics = ['./img/w1.jpg', './img/w2.jpg', './img/w3.jpg', './img/w4.jpg', './img/w8.jpg', './img/w5.jpg', './img/w6.jpg', './img/w7.jpg' ]
const images = ['./img/em1.png','./img/em2.png','./img/em3.png','./img/em4.png','./img/em5.png','./img/em6.png','./img/em7.png','./img/em8.png']
const imageContainers = document.querySelectorAll('.image')
let flippedCards = []
let cardMatches = []
let sec = 40;


const setImages = () => {
    const doubledArray = [...images, ...images]
    doubledArray.sort(() => Math.random() - 0.5)
    
    let imageIndex = 0; 
    
    imageContainers.forEach(container => {
        const pic = document.createElement('img');
        pic.setAttribute('src', doubledArray[imageIndex])
        pic.style.borderRadius = '10px'
        imageIndex = (imageIndex + 1) % doubledArray.length;
        container.appendChild(pic)
    })

}
setImages();

const startingGame = () => {
    starterModal.style.display = 'none'
    timerCountdown();
}

const timerCountdown = () => {

    const timeCount = setInterval(function() {

        time.innerHTML = '0' + ':' + sec;
        sec--;
    
        if (sec <= 9) {
            time.innerHTML = '0' + ':' + '0' + sec;
        } 
        if (sec == 0) {
            clearInterval(timeCount)
            checkResult();
        }
        if(sec > 0 && cardMatches.length == 16){
            winner();
            clearInterval(timeCount)
        }
    } ,1000)
    
}

    const flipCards = (e) => {
    
        const flippedCard = e.target
    
        flippedCard.classList.add('card-flipped');
        flippedCards.push(flippedCard);
        
        if(flippedCards.length === 2) {
    
            const pickedOne = flippedCards[0].innerHTML
            const pickedTwo = flippedCards[1].innerHTML
            
            if(pickedOne !== pickedTwo){
                    setTimeout(function(){
                        flippedCards.forEach(card => {
                            card.classList.remove('card-flipped');
                        });
                        flippedCards = [];
                    },800);
                } else if (pickedOne === pickedTwo) {
                    flippedCards.forEach((card) => {
                        setTimeout(() => {
                            card.classList.add('card-match');
                            cardMatches.push('1')
                            flippedCards = [];
                        }, 400);
                    });
                }
            } else if (flippedCards.length > 2) {
            flippedCards[2].classList.remove('card-flipped')
            flippedCards[3].classList.remove('card-flipped')
            flippedCards[4].classList.remove('card-flipped')
            flippedCards[5].classList.remove('card-flipped')
            flippedCards[6].classList.remove('card-flipped')
            flippedCards[7].classList.remove('card-flipped')
            flippedCards[8].classList.remove('card-flipped')
            flippedCards[9].classList.remove('card-flipped')
        }   
    }



const checkResult = () => {
    if (cardMatches.length < 16) {
        loserModal.style.display = 'flex'
    }
}

const playAgain = () => {
    window.location.reload();
}

const winner = () => {
    winnerModal.style.display = 'flex';
    const timer = document.querySelector('.timer')
    timer.style.display = 'none'
    makeConfetti();
}

const getThePrize = () => {
    prize.style.display = 'block';
    const randomPic = winnerPics[Math.floor(Math.random() * winnerPics.length)];

    const pic = document.createElement('img');
    pic.setAttribute('src', randomPic)
    prize.append(pic)

    awardBtn.style.display = 'none'
}

const makeConfetti = () => {
// SOURCE: codepen.io/n33kos/pen/gjVQwv
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width/2;
cy = ctx.canvas.height/2;

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
  { front : 'red', back: 'darkred'},
  { front : 'green', back: 'darkgreen'},
  { front : 'blue', back: 'darkblue'},
  { front : 'yellow', back: 'darkyellow'},
  { front : 'orange', back: 'darkorange'},
  { front : 'pink', back: 'darkpink'},
  { front : 'purple', back: 'darkpurple'},
  { front : 'turquoise', back: 'darkturquoise'},
];

//-----------Functions--------------
resizeCanvas = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	cx = ctx.canvas.width/2;
	cy = ctx.canvas.height/2;
}

randomRange = (min, max) => Math.random() * (max - min) + min

initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color      : colors[Math.floor(randomRange(0, colors.length))],
      dimensions : {
        x: randomRange(10, 20),
        y: randomRange(10, 30),
      },
      position   : {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1,
      },
      rotation   : randomRange(0, 2 * Math.PI),
      scale      : {
        x: 1,
        y: 1,
      },
      velocity   : {
        x: randomRange(-25, 25),
        y: randomRange(0, -50),
      },
    });
  }
}

//---------Render-----------
render = () => {  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  confetti.forEach((confetto, index) => {
    let width = (confetto.dimensions.x * confetto.scale.x);
    let height = (confetto.dimensions.y * confetto.scale.y);
    
    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);
    
    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
    
    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;
    
    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
     
    // Draw confetto
    ctx.fillRect(-width / 2, -height / 2, width, height);
    
    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  // Fire off another round of confetti
  if (confetti.length <= 10) initConfetti();

  window.requestAnimationFrame(render);
}

//---------Execution--------
// initConfetti();
render();

}

startBtn.addEventListener('click', startingGame)
tryAgainBtn.addEventListener('click', playAgain)
playBtn.addEventListener('click', playAgain)
awardBtn.addEventListener('click', getThePrize)
cards.forEach(card => card.addEventListener('click', flipCards))