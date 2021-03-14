 /* 

 Based partially on content from the following and then customised:

 9.2: Firebase: Saving Data - Programming with Text
 https://youtu.be/7lEU1UEw3YI	(Channel : The coding Train)

 Firebase Database Querying 101 - The Firebase Database For SQL Developers #3
 https://youtu.be/3WTQZV5-roY	(Channel : FIREBASE )

 Common SQL Queries converted for the Firebase Database - The Firebase Database For SQL Developers #4
 https://youtu.be/sKFLI5FOOHs	(Channel : FIREBASE )

 9.3: Firebase: Retrieving Data - Programming with Text
 https://youtu.be/NcewaPfFR6Y	(Channel : The coding Train)

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

firebase.initializeApp(firebaseConfig);  // Initialize Firebase
firebase.analytics();
const database = firebase.database();
const leaderBoardRef = database.ref("leaderBoard");  // referance leaderboard collection
const query = leaderBoardRef.orderByChild("score").limitToLast(10);  // these lines grabs data from firebase realtime database server
query.on("value", gotData, errData);
document.getElementById("form-leaderBoard").addEventListener("submit", submitform);  // event listener on submit button

/**
 * gets values from the form
 * then clears the form value to prevent resubmit
 * alerts user name and score has been sent
 * closes modal after 3 seconds 
 * 
 * partially based on code featured in "Connecting Firebase to a Contact Form"   
 *  https://youtu.be/PP4Tr0l08NE	(Channel : Traversy Media)
 * 
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
  * 
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
  * Take query of player scores from the database
  * will sort the results in desending order 
  * displays the results on the leaderboard page
  * 
  * partially based on 16.9: Array Functions: sort() - 
  * Topics of JavaScript/ES6  https://youtu.be/MWD-iKzR2c8	
  * (Channel : The coding Train)
  * 
  * @param {data} (string) data from the Firebase database
  */
 function gotData(data) {
     let scores = data.val(); // json object of the database snapshot
     let scoreBoard = []; // empty array for sorting the scores in descending order later
     let keys = Object.keys(scores); // makes an array of keys from the database
     keys.forEach( k => scoreBoard.push(scores[k])); // adds the score results to an array 
     scoreBoard.sort((a, b) => b.score - a.score); // this sorts the array by player scores by comparing scores
     let leaderBoardOrderedList = ""; // empty string needed for outputing data to the webpage later
     for (let i = 0; i < scoreBoard.length; i++) {
         leaderBoardOrderedList += ("<li>  " + scoreBoard[i].name + " - " + scoreBoard[i].score + "  </li>");
     }
     $("#scoreList").html(leaderBoardOrderedList); // this outputs the ordered list body to the webpage
 }

 /**
  * this outputs an error message to the console if there is a problem with the connection
  * @param {err} strings err 
  */
 function errData(err) {
     console.log("Error!", err);
 }