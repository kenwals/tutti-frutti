class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById("time-remaining");
        this.ticker = document.getElementById("flips");
        this.scorePanel =  document.getElementById("score");
    }


    startGame() {
        this.cardToCheck = null; // this ensures only up to 2 cards are being checked 
        this.totalClicks = 0;
        this.totalScore = 0;
        console.log("game started");
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true; // this ensures that no cards can be selected when something else like an animation is busy

        setTimeout(() => {
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
        });
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add("visible");

            if (this.cardToCheck)
                this.checkForCardMatch(card);
            else
                this.cardToCheck = card;
        }
    }

    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMisMatch(card, this.cardToCheck);

        this.cardToCheck = null;

    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add("matched");
        card2.classList.add("matched");
        this.totalScore =+ 50 ;
        console.log("your score is now :", this.totalScore )
        localStorage.setItem('Current Score', this.totalScore);
        this.scorePanel.innerText = this.totalScore;
        if (this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove("visible");
            card2.classList.remove("visible");
            this.busy = false;
        }, 1000);
    }

    getCardType(card) {
        return card.getElementsByClassName("card-value")[0].src;
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    exitGame() {
        clearInterval(this.countDown);
        this.hideCards();
    }

    gameOver() {
        clearInterval(this.countDown);
        document.getElementById("game-over-text").classList.add("visible");
        this.hideCards();
    }

    victory() {
        clearInterval(this.countDown);
        document.getElementById("victory-text").classList.add("visible");
        this.hideCards();
    }

    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex;
        }

    } // Fisher and Yates shuffle  method

    canFlipCard(card) {
        return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck);
    } // all these statements have to be false in order for it to be true, and user can flip the next card

}

function ready() {
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("card"));
    let game = new MixOrMatch(50, cards);

    if (!localStorage.getItem('theme')) {
        populateStorage();
    } else {
        setValues();
    }

    function populateStorage() {
        localStorage.setItem('theme', document.getElementById('theme').value);
        localStorage.setItem('level', document.getElementById('level').value);
        localStorage.setItem('topScore', "010");

        setValues();
    }

    function setValues() {
        let currentTheme = localStorage.getItem('theme');
        let currentLevel = localStorage.getItem('level');
        let currentTopScore = localStorage.getItem('topScore');
       
       document.getElementById('theme').value = currentTheme;
       document.getElementById('level').value = currentLevel;
       
       if (currentTheme === "dark") {
       $("body").removeClass("theme-colour").removeClass("theme-light").addClass("theme-dark");
       } else if (currentTheme === "light") {
       $("body").removeClass("theme-colour").removeClass("theme-dark").addClass("theme-light");
       } else {
       $("body").removeClass("theme-dark").removeClass("theme-light").addClass("theme-colour");
       }
    }
    /*    event listeners section     */ 
    $( "#theme" ).change(function() {
        populateStorage()
   });
   
   $( "#level" ).change(function() {
        populateStorage()
   });

    $("#btn-start").click(function () {
        console.log("you clicked the start button");
        $("#page-home").addClass("collapse");
        $("#page-game").removeClass("collapse");
        console.log("game page open , home page is collapsed");
        game.startGame();
    });

    $("#btn-back").click(function () {
        console.log("you clicked go back button");
        $("#page-game").addClass("collapse");
        $("#page-home").removeClass("collapse");
        game.exitGame();
        console.log("game page collapsed , home page is open");
    });

    $("#btn-info").click(function () {
        console.log("you clicked the info button");
        $("#page-home").addClass("collapse");
        $("#page-help").removeClass("collapse");
        console.log("home page collapsed , help page is open");
    });

    $("#btn-exit").click(function () {
        console.log("you clicked the exit button");
        $("#page-help").addClass("collapse");
        $("#page-home").removeClass("collapse");
        console.log("help page collapsed , home page is open");
    });

    overlays.forEach(overLay => {
        overLay.addEventListener("click", () => {
            overLay.classList.remove("visible");
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener("click", () => {
            game.flipCard(card);
        });
    });
}


if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}