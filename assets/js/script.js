/**
 *  some code on this script is taken and customised from Youtube video 
 * "How to Code a Card Matching Game" published by [PortEXE](https://youtu.be/3uuQ3g92oPQ)
 * 
 */
function ready() {

    class TuttiFrutti {
        constructor(cards) {
            this.cardsArray = cards;
            this.timer = document.getElementById("time-remaining");
            this.ticker = document.getElementById("flips");
            this.scorePanel = document.getElementById("score");
            this.finalScore = document.getElementById("finalScore");
        }

        startGame() {
            this.isPaused = false;
            this.currentLevel = document.getElementById('level').value;
            this.cardToCheck = null; // this ensures only up to 2 cards are being checked 
            this.totalClicks = 0;
            this.totalScore = 0;
            this.totalTime = this.getDifficultyLevel();
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

        /**
         * check is made on what difficulty level player has selected, appropriate score unit and time limit is set
         * @returns (integer) total game time
         */
        getDifficultyLevel() {
            if (this.currentLevel === "easy") {
                this.scoreUnit = 10;
                return 70;
            } else if (this.currentLevel === "medium") {
                this.scoreUnit = 20;
                return 60;
            } else if (this.currentLevel === "hard") {
                this.scoreUnit = 30;
                return 50;
            }
        }

        /**
         * this resets all the cards to be turned over
         */
        hideCards() {
            this.cardsArray.forEach(card => {
                card.classList.remove("visible");
                card.classList.remove("matched");
            });
        }

        /**
         * card has been clicked on , check is made if card can flipped , if so then number flips increased, card made visible and checked for match
         * @param {object} card 
         */
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

        /**
         * check if the second selected card is matching the first one
         * @param {object} card 
         */
        checkForCardMatch(card) {
            if (this.getCardType(card) === this.getCardType(this.cardToCheck))
                this.cardMatch(card, this.cardToCheck);
            else
                this.cardMisMatch(card, this.cardToCheck);
            this.cardToCheck = null;
        }

        /**
         * cards are matched , they are added to a matched array , given a matched class, score is updated , if array is full then game is won
         * @param {object} card1 
         * @param {object} card2 
         */
        cardMatch(card1, card2) {
            this.matchedCards.push(card1);
            this.matchedCards.push(card2);
            card1.classList.add("matched");
            card2.classList.add("matched");
            // score includes bonus given based on time remaining
            this.totalScore += this.scoreUnit + (this.scoreUnit * this.timeRemaining);
            this.scorePanel.innerText = this.totalScore;
            localStorage.setItem('currentScore', this.totalScore);
            if (this.matchedCards.length === this.cardsArray.length)
                this.victory();
        }

        /**
         * mismatched cards are turned over
         * @param {object} card1 
         * @param {object} card2 
         */
        cardMisMatch(card1, card2) {
            this.busy = true;
            setTimeout(() => {
                card1.classList.remove("visible");
                card2.classList.remove("visible");
                this.busy = false;
            }, 1000);
        }

        /**
         * This returns the image filename of the card for identification purposes
         * @param {card} (object) card 
         * @returns (string) image filename of card
         */
        getCardType(card) {
            return card.getElementsByClassName("card-value")[0].src;
        }

        /**
         * this is a setinterval function that reduces the timer every second, when timer reaches zero gameover is called
         * @returns (function) 
         */
        startCountDown() {
            return setInterval(() => {
                if (this.timeRemaining > 0 && (!this.isPaused)) {
                    this.timeRemaining--;
                    this.timer.innerText = this.timeRemaining;
                } else if (this.timeRemaining === 0) {
                    this.gameOver();
                    this.timeRemaining = "0"; // this prevents gameOver modal being repeatedly triggered , when game is over
                }
            }, 1000);
        }

        /**
         * this pauses the timer from descending
         * @param {boolean} value 
         */
        timerIsPaused(value) {
            this.isPaused = value;
        }

         /**
         * clock is stopped , cards are turned over and game over modal called
         */
        gameOver() {
            clearInterval(this.countDown);
            createModal("gameOver");
            this.hideCards();
        }

        /**
         * clock is stopped and cards are turned over
         */
        exitGame() {
            clearInterval(this.countDown);
            this.hideCards();
        }

        /**
         * player has won the game , final score calculated and appropriate modal is displayed
         */
        victory() {
            clearInterval(this.countDown);
            this.totalScore = this.totalScore - this.totalClicks;
            this.finalScore.innerText = this.totalScore;
            // checks if players Personal best score has been beaten?
            if (this.recordBreaker()) {
                $("#modal-you-win-leaderboard").modal("show");
            } else {
                createModal("youWin");
            }
            this.hideCards();
        }

        /**
         * checks if the player has beated their best score if a returning player, first time player always returns a true value
         * @returns (boolean)
         */
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

        /**
         * shuffles the cards by changing the CSS display order
         */
        shuffleCards() {
            for (let i = this.cardsArray.length - 1; i > 0; i--) {
                let randomIndex = Math.floor(Math.random() * (i + 1));
                this.cardsArray[randomIndex].style.order = i;
                this.cardsArray[i].style.order = randomIndex;
            }

        } // Fisher and Yates shuffle  method

        /**
         * this ensures player cannot flip a card if game is busy or 2 cards are already selected
         * @param {card} (object) card 
         * @returns (boolean)
         */
        canFlipCard(card) {
            return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck);
        } // all these statements have to be false in order for it to be true, and user can flip the next card

    }
    
    const fruits = ["lemon", "apple", "strawberry", "banana", "cherry","peach","pear", "orange"];
    generateCards();
    const cards = Array.from(document.getElementsByClassName("card"));
    const game = new TuttiFrutti(cards);

    /**
     * here the card images are placed on the website using the fruits array
     * mmy mentor assisted with part of this code  
     *
     */
    function generateCards(){
        let cardsList = "";
        const gamecontainer = document.getElementById("game-container");
        fruits.map((fruit)=> {
            const fruitCard = `<div class="card">
                <div class="card-back card-face"><img alt="card back" class="cardback_img" src="assets/images/cardback-04.png"></div>
                <div class="card-front card-face"><img alt="card front - ${fruit}" class="card-value" src="assets/images/${fruit}-icon.png"></div>
            </div>`;
            cardsList += fruitCard;
            cardsList += fruitCard;
        } )
        gamecontainer.innerHTML = cardsList;
    }


    if (!localStorage.getItem('theme') && !localStorage.getItem('level')) {
        populateStorage();
    } else {
        setValues();
    }


    const modalContents = [{
            modalTitle: "Game Over",
            bodyText: "Hard luck , your time has run out.",
            modalId: "gameOver",
            btnId: "btn-restart"
        }, /* Modal [0] Game over  */
        {
            modalTitle: "Tutti Frutti",
            bodyText: "Are you sure you want to EXIT this game or CONTINUE playing?",
            modalId: "exit",
            btnId: "btn-continue"
        }, /* Modal [1] Are you sure you want to leave ? [1] */
        {
            modalTitle: "You Win!",
            bodyText: "Well done! On this occassion you didn't beat your personal best score , better luck next time !",
            modalId: "youWin",
            btnId: "btn-restart"
        } /* Modal [2]  you win  */
    ];
    /**
     * this runs each time a modal is created in order for it's buttons to work
     */

    /**
     * this creates a modal from a value in the modalContents object array
     * then starts the modal event listeners
     * and then displays the modal
     *  my mentor assisted with part of this code  
     * @param {mondalId} (string) modalId 
     */
    function createModal(modalId) {
        const modal = modalContents.filter((modal) => modal.modalId === modalId)[0];
        $("#modal-title").text(modal.modalTitle);
        $("#modal-body").text(modal.bodyText);
        if (modal.btnId === "btn-restart") {
            $("#btn-restart").removeClass("d-none");
        } else {
            $("#btn-continue").removeClass("d-none");
        }
        $("#tutti-frutti-modal").modal("show");
    }

    /**
     * this populates the local storage of the browser with the prefered 
     * colour theme and difficulty levels
     * then calls the setValues() Function
     */
    function populateStorage() {
        localStorage.setItem('theme', document.getElementById('theme').value);
        localStorage.setItem('level', document.getElementById('level').value);
        setValues();
    }

    /**
     * the default theme and difficulty level is retrieved from 
     * local storage and selected in the setting form on the homepage
     */
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

    $("#theme").change(() => populateStorage());

    $("#level").change(() => populateStorage());

    $("#btn-restart").click(() => {
        // you clicked the restart button in one of the modal
        $("#btn-restart").addClass("d-none");
        $(".modal").modal("hide");
        game.startGame();
    });

    $("#btn-continue").click(() => {
        // you clicked go the continue button on the modal
        $("#btn-continue").addClass("d-none");
        game.timerIsPaused(false);
        $(".modal").modal("hide");
    });

    $("#btn-start").click(() => {
        // you clicked the start button
        $("#page-home").addClass("collapse");
        $("#page-game").removeClass("collapse");
        // game page open , home page is collapsed
        game.startGame();
    });

    $(".btn-back").click(() => {
        // you clicked go back button on the game page
        game.timerIsPaused(true);
        createModal("exit");
    });

    $(".btn-exit-game").click(() => {
        // you clicked go the exit game button on the modal
        $("#page-game").addClass("collapse");
        $("#page-home").removeClass("collapse");
        $("#btn-restart").addClass("d-none");
        $("#btn-continue").addClass("d-none");
        game.exitGame();
        // game page collapsed , home page is open
    });

    $("#btn-info").click(() => {
        // you clicked the info button on homepage
        $("#page-home").addClass("collapse");
        $("#page-help").removeClass("collapse");
        // home page collapsed , help page is open
    });

    $("#btn-exit").click(() => {
        // you clicked the exit button on the info page
        $("#page-help").addClass("collapse");
        $("#page-home").removeClass("collapse");
        // help page collapsed , home page is open
    });

    cards.forEach(card => {
        card.addEventListener("click", () => {
            game.flipCard(card);
        });
    });  
    
    document.getElementById("form-leaderBoard").addEventListener("submit", submitform); // event listener on submit button for the leaderboard modal
    
    /*           end of event listeners section                          */

    /*          the Leaderboard section        */

    /**
 *  Based partially on content from the following and then customised:

 9.2: Firebase: Saving Data - Programming with Text
 https://youtu.be/7lEU1UEw3YI	(Channel : The coding Train)

 Firebase Database Querying 101 - The Firebase Database For SQL Developers #3
 https://youtu.be/3WTQZV5-roY	(Channel : FIREBASE )

 Common SQL Queries converted for the Firebase Database - The Firebase Database For SQL Developers #4
 https://youtu.be/sKFLI5FOOHs	(Channel : FIREBASE )

 9.3: Firebase: Retrieving Data - Programming with Text
 https://youtu.be/NcewaPfFR6Y	(Channel : The coding Train)

"Connecting Firebase to a Contact Form" 
https://youtu.be/PP4Tr0l08NE	(Channel : Traversy Media)

16.9: Array Functions: sort() - Topics of JavaScript/ES6  
https://youtu.be/MWD-iKzR2c8    (Channel : The coding Train)

 * 
 */

    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDhRCxPSNZrf4WjYQLssSEYmXbAKMFrZNw",
        authDomain: "tutti-frutti-6a62e.firebaseapp.com",
        databaseURL: "https://tutti-frutti-6a62e-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "tutti-frutti-6a62e",
        storageBucket: "tutti-frutti-6a62e.appspot.com",
        messagingSenderId: "602240536417",
        appId: "1:602240536417:web:269a49b9f1b39d5046ff20",
        measurementId: "G-WFN8X078TS"
    };

    firebase.initializeApp(firebaseConfig); // Initialize Firebase
    firebase.analytics();
    const database = firebase.database();
    const leaderBoardRef = database.ref("leaderBoard"); // referance leaderboard collection
    const query = leaderBoardRef.orderByChild("score").limitToLast(10); // these lines grabs data from firebase realtime database server
    query.on("value", gotData, errData);

    /**
     * gets values from the form, then clears the form value to prevent a resubmit, alerts user name and score has been sent, then closes modal after 3 seconds 
     * @param {e} (event) e 
     */
    function submitform(e) {
        e.preventDefault();
        let name = getInputVal("name");
        let score = parseInt(localStorage.getItem("currentScore"));
        saveTopScore(name, score);
        document.getElementById("form-leaderBoard").reset();
        localStorage.removeItem("currentScore");
        document.querySelector(".alert").style.display = "block";
        setTimeout(function () {
            $("#modal-you-win-leaderboard").modal("hide");
            document.querySelector(".alert").style.display = "none";
            $("#page-game").addClass("collapse");
            $("#page-home").removeClass("collapse");
        }, 3000);
    }

    /**
     *  gets specific value from form field
     * @param {id} (string) id 
     * @returns  value from input field
     */
    function getInputVal(id) {
        return document.getElementById(id).value;
    }

    /**
     * saves scores to firebase realtime database 
     * @param {name} (string) name 
     * @param {score} (integer) score 
     */
    function saveTopScore(name, score) {
        let newLeaderBoardRef = leaderBoardRef.push();
        newLeaderBoardRef.set({
            name: name,
            score: score
        });
    }

    /**
     * Takes a query of player scores from the database
     * will sort the results in desending order 
     * then displays the results on the leaderboard page
     * @param {data} (string) data from the Firebase database
     */
    function gotData(data) {
        let scores = data.val(); // json object of the database snapshot
        let scoreBoard = []; // empty array for sorting the scores in descending order later
        let keys = Object.keys(scores); // makes an array of keys from the database
        keys.forEach(k => scoreBoard.push(scores[k])); // adds the score results to an array 
        scoreBoard.sort((a, b) => b.score - a.score); // this sorts the array by player scores by comparing scores
        let leaderBoardOrderedList = ""; // empty string needed for outputing data to the webpage later
        for (let i = 0; i < scoreBoard.length; i++) {
            leaderBoardOrderedList += ("<li>  " + scoreBoard[i].name + " - " + scoreBoard[i].score + "  </li>");
        }
        $("#scoreList").html(leaderBoardOrderedList); // this outputs the ordered list body to the webpage
    }

    /**
     * this outputs an error message to the console if there is a problem with the connection
     * @param {err} (string) err 
     */
    function errData(err) {
        console.log("Error!", err);
    }
    /*     end of the Leaderboard section        */
}

/**
 * This waits for document to be fully loaded 
 * then runs the ready() function when it's completed
 */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}