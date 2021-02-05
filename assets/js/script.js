
class MixOrMatch {
    constructor(totalTime, cards){
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById("time-remaining");
        this.ticker = document.getElementById("flips");
    }


    startGame() {
        this.cardToCheck = null; // this ensures only up to 2 cards are being checked 
        this.totalClicks = 0;
        console.log("game started");
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true; // this ensures that no cards can be selected when something else like an animation is busy

        setTimeout( () => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500); // this is a half a second timeout 
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    
    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove("visible");
            card.classList.remove("matched");
        })
    }

    flipCard(card){
        if(this.canFlipCard(card)){
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add("visible");

            // if statement
        }
    }
    startCountDown(){
        return setInterval( ()=> {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver(){
        clearInterval(this.countDown);
        document.getElementById("game-over-text").classList.add("visible");
    }

    

    shuffleCards(){
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex;
        }

    } // Fisher and Yates shuffle  method

    canFlipCard(card){
       return true;
        // return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck)
    }  // all these statements have to be false in order for it to be true, and user can flip the next card

}

function ready() {
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("card"));
    let game = new MixOrMatch(50, cards);

    overlays.forEach(overLay => {
        overLay.addEventListener("click", () => {
            overLay.classList.remove("visible");
            game.startGame();
        });
    });

    cards.forEach(card=> {
        card.addEventListener("click", () => {
            game.flipCard(card);
        });
    });
}


if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}