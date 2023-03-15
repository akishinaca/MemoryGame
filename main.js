const cards = document.querySelectorAll('.card')
const starterModal = document.querySelector('.starter-modal')
const loserModal = document.querySelector('.loser-modal')
const winnerModal = document.querySelector('.winner-modal')
const startBtn = document.querySelector('.start')
const tryAgainBtn = document.querySelector('.try')
const awardBtn = document.querySelector('.award')
const prize = document.querySelector('.prize')
const time = document.querySelector('.time');

const winnerPics = ['./img/w1.jpg', './img/w2.jpg', './img/w3.jpg', './img/w4.jpg', './img/w8.jpg', './img/w5.jpg', './img/w6.jpg', './img/w7.jpg' ]
const images = ['./img/em1.png','./img/em2.png','./img/em3.png','./img/em4.png','./img/em5.png','./img/em6.png','./img/em7.png','./img/em8.png']
const imageContainers = document.querySelectorAll('.image')
let flippedCards = []
let cardMatches = []
let sec = 45;


const setImages = () => {
    const doubledArray = [...images, ...images]
    doubledArray.sort(() => Math.random() - 0.5)
    
    let imageIndex = 0; 
    
    imageContainers.forEach(container => {
        const pic = document.createElement('img');
        pic.setAttribute('src', doubledArray[imageIndex])
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
}

const getThePrize = () => {
    prize.style.display = 'block';
    const randomPic = winnerPics[Math.floor(Math.random() * winnerPics.length)];

    const pic = document.createElement('img');
    pic.setAttribute('src', randomPic)
    prize.append(pic)
}

startBtn.addEventListener('click', startingGame)
tryAgainBtn.addEventListener('click', playAgain)
awardBtn.addEventListener('click', getThePrize)
cards.forEach(card => card.addEventListener('click', flipCards))