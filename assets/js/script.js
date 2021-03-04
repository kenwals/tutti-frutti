class TuttiFrutti {
    constructor(cards) {
        this.cardsArray = cards;
        this.timer = document.getElementById("time-remaining");
        this.ticker = document.getElementById("flips");
        this.scorePanel = document.getElementById("score");
        this.finalScore = document.getElementById("finalScore");
    } // some code on this script is taken and customised from Youtube video "How to Code a Card Matching Game" published by [PortEXE](https://youtu.be/3uuQ3g92oPQ)

    startGame() {
        this.currentLevel = document.getElementById('level').value;
        this.cardToCheck = null; // this ensures only up to 2 cards are being checked 
        this.totalClicks = 0;
        this.totalScore = 0;
        console.log("game started");
        this.totalTime = this.getDifficultyLevel();
        console.log(" level is :" + this.currentLevel + " time left is: " + this.totalTime + " unit of score is: " + this.scoreUnit);
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
        this.scorePanel.innerText = this.totalScore;
    }

    getDifficultyLevel() {
        if (this.currentLevel === "easy") {
            this.scoreUnit = 10;
            return 60;
        } else if (this.currentLevel === "medium") {
            this.scoreUnit = 20;
            return 50;
        } else if (this.currentLevel === "hard") {
            this.scoreUnit = 30;
            return  6; //40;
        }
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
        console.log("card matched is ", card1.getElementsByClassName("card-value")[0].src);
        // score includes bonus given based on time remaining
        this.totalScore += this.scoreUnit + (this.scoreUnit * this.timeRemaining);
        this.scorePanel.innerText = this.totalScore;
        console.log("Your score is now :", this.totalScore, "time left :", this.timeRemaining);
        localStorage.setItem('currentScore', this.totalScore);
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
        this.createModal("gameOver");
        this.hideCards();
    }

    victory() {
        clearInterval(this.countDown);
        console.log(" total score is :", this.totalScore, " - total clicks ", this.totalClicks, " = ");
        this.totalScore = this.totalScore - this.totalClicks;
        console.log(this.totalScore);
        this.finalScore.innerText = this.totalScore;
        // check if your Personal best score has been beaten?
        if (this.recordBreaker()) {
            $("#modal-you-win-leaderboard").modal("show");
        } else {
            $("#modal-you-win").modal("show");
        }
        this.hideCards();
    }

    recordBreaker() {
        if (!localStorage.getItem('topScore')) {
            localStorage.setItem('topScore', this.totalScore);
            return true;
        } else if (localStorage.getItem('topScore') < this.totalScore) {
            localStorage.setItem('topScore', this.totalScore);
            return true;
        } else {
            return false;
        }

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

    createModal(modalId){
        const modal = modalContents.filter((modal) => modal.modalId === modalId)[0];
        console.log(modal , " =modal ");
        $("#modal-title").text(modal.modalTitle);
        $("#modal-button-title").text(modal.buttonTitle);
        $("#modal-button").addClass(modal.btnClass);
        $("#modal-body").text(modal.bodyText);
        this.modalEventListners();
        $("#tutti-frutti-modal").modal("show");
    }

    modalEventListners(){
        $(".btn-restart").click(()=> {
            console.log("you clicked the restart button in one of the modal");
            $(".modal").modal("hide");
            this.startGame();
        });

        $(".btn-continue").click(()=> {
            console.log("you clicked go the continue button on the modal");
            $(".modal").modal("hide");
        });
    }



}


const modalContents = [ 
    { 
        modalTitle : "Game Over",
        buttonTitle : "Restart Game",
        bodyText : "Hard luck , your time has run out.",
        modalId :  "gameOver",
        btnClass : "btn-restart"
    },   /* Modal [0]  */
    { 
        modalTitle : "Tutti Frutti",
        buttonTitle : "Continue",
        bodyText : "Are you sure you want to EXIT this game or CONTINUE playing?",
        modalId :  "exit",
        btnClass : "btn-continue"
    },  /* Modal [1]   Modal Are you sure you want to leave ? [1] */
    { 
        modalTitle : "You Win!",
        buttonTitle : "Restart Game",
        bodyText : "Well done!",
        modalId :  "youWin",
        btnClass : "btn-restart"
    }   /* Modal [2]  */
] ;

function ready() {
    let cards = Array.from(document.getElementsByClassName("card"));
    let game = new TuttiFrutti(cards);

    function createModal(modalId){
    const modal = modalContents.filter((modal) => modal.modalId === modalId)[0];
    console.log(modal , " =modal ");
    $("#modal-title").text(modal.modalTitle);
    $("#modal-button-title").text(modal.buttonTitle);
    $("#modal-button").addClass(modal.btnClass);
    $("#modal-body").text(modal.bodyText);
    modalEventListners();
    $("#tutti-frutti-modal").modal("show");
}


    if (!localStorage.getItem('theme') && !localStorage.getItem('level')) {
        populateStorage();
    } else {
        setValues();
    }

    function populateStorage() {
        localStorage.setItem('theme', document.getElementById('theme').value);
        localStorage.setItem('level', document.getElementById('level').value);
        setValues();
    }

    function setValues() {
        let currentTheme = localStorage.getItem('theme');
        let currentLevel = localStorage.getItem('level');
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

    /*                           event listeners section                          */

    $("#theme").change(()=> populateStorage());

    $("#level").change(()=> populateStorage());

    function modalEventListners(){
        $(".btn-restart").click(()=> {
            console.log("you clicked the restart button in one of the modal");
            $(".modal").modal("hide");
            game.startGame();
        });

        $(".btn-continue").click(()=> {
            console.log("you clicked go the continue button on the modal");
            $(".modal").modal("hide");
        });
    }



    $("#btn-start").click(()=> {
        console.log("you clicked the start button");
        $("#page-home").addClass("collapse");
        $("#page-game").removeClass("collapse");
        console.log("game page open , home page is collapsed");
        game.startGame();
    });

    $(".btn-back").click(()=> {
        console.log("you clicked go back button");
        createModal("exit");
    });

    $(".btn-exit-game").click(()=> {
        console.log("you clicked go the exit game button on the modal");
        $("#page-game").addClass("collapse");
        $("#page-home").removeClass("collapse");
        game.exitGame();
        console.log("game page collapsed , home page is open");
    });

    $("#btn-info").click(()=> {
        console.log("you clicked the info button");
        $("#page-home").addClass("collapse");
        $("#page-help").removeClass("collapse");
        console.log("home page collapsed , help page is open");
    });

    $("#btn-exit").click(()=> {
        console.log("you clicked the exit button");
        $("#page-help").addClass("collapse");
        $("#page-home").removeClass("collapse");
        console.log("help page collapsed , home page is open");
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