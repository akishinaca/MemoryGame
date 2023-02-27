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
    // const flippedCard = e.target.children[0].children[0]
    // console.log(flippedCard)

    // console.log(flippedCard)

    flippedCard.classList.add('card-flipped');
    flippedCards.push(flippedCard);

    if(flippedCards.length > 2) {
        return
    }
    
    if(flippedCards.length === 2) {
        flippedCard.length = 2

        const pickedOne = flippedCards[0].innerHTML
        const pickedTwo = flippedCards[1].innerHTML
        const imgOne = flippedCards[0]
        const imgTwo = flippedCards[1]
        console.log(pickedTwo)
        console.log(imgTwo)
        
        
            if(pickedOne !== pickedTwo){
                setTimeout(function(){
                    flippedCards.forEach(card => {
                        card.classList.remove('card-flipped');
                    });
                    flippedCards = [];
                },1000);
            } else if (pickedOne === pickedTwo) {
                flippedCards.forEach((card) => {
                    setTimeout(() => {
                        
                        card.classList.add('card-match');
                        flippedCards = [];
                    }, 1000);
                });
            }
            
          
    }
}


cards.forEach(card => card.addEventListener('click', flipCards))