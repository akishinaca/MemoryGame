const cards = document.querySelectorAll('.card')

const images = ['./img/em1.png','./img/em2.png','./img/em3.png','./img/em4.png','./img/em5.png','./img/em6.png','./img/em7.png','./img/em8.png']
const imageContainers = document.querySelectorAll('.image')
let flippedCards = []


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


const flipCards = (e) => {

    const flippedCard = e.target
    console.log(flippedCard)

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


cards.forEach(card => card.addEventListener('click', flipCards))