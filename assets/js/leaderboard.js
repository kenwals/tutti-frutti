 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDhRCxPSNZrf4WjYQLssSEYmXbAKMFrZNw",
    authDomain: "tutti-frutti-6a62e.firebaseapp.com",
    databaseURL: "https://tutti-frutti-6a62e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tutti-frutti-6a62e",
    storageBucket: "tutti-frutti-6a62e.appspot.com",
    messagingSenderId: "602240536417",
    appId: "1:602240536417:web:269a49b9f1b39d5046ff20",
    measurementId: "G-WFN8X078TS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// referance leaderboard collection
//const leaderBoardRef = firebase.database().ref("leaderBoard").orderByChild("score");

const database = firebase.database();

const leaderBoardRef = database.ref("leaderBoard");

//console.log(JSON.parse(leaderBoardRef));

// this line grabs data from server
const query = leaderBoardRef.orderByChild("score").limitToLast(10);
//const query = leaderBoardRef;
//console.log(JSON.parse(query));


query.on("value", gotData, errData);

/* leaderBoardRef.orderByChild("score").limitToLast(10).once("value", function(snapshot){
    console.log(snapshot.val());
}); */


document.getElementById("form-leaderBoard").addEventListener("submit", submitform);

// submit form
function submitform(e){
    e.preventDefault();
    // get values
    let name= getInputVal("name");
    let score = parseInt(localStorage.getItem("topScore"));
    // save message
    console.log(name, score);
    saveTopScore(name, score);
    // Clear form
    document.getElementById("form-leaderBoard").reset();
    // TODO alert that info was sent
    document.querySelector(".alert").style.display= "block";
    setTimeout(function(){   
        $("#modal-you-win-leaderboard").modal("hide");
        document.querySelector(".alert").style.display= "none";
        $("#page-game").addClass("collapse");
        $("#page-home").removeClass("collapse");
    }, 3000); // closes page after 3 seconds
}


// function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}


function saveTopScore(name, score){
    let newLeaderBoardRef = leaderBoardRef.push();
    newLeaderBoardRef.set({
        name : name,
        score : score
    });
}

function compare(a,b) {
    return b.score - a.score;
   }

function gotData(data) {
    // console.log(data.val());
    let scores = data.val();
    //scores.sort(compare);
    //console.log(scores);
    let scoreBoard = [];
    let keys = Object.keys(scores);
   // console.log(keys);
   for (let i = 0; i < keys.length; i++){
        let k = keys[i];
        let name = scores[k].name;
        let score = scores[k].score;
        //console.log(scores[k]);
        scoreBoard.push(scores[k]);
        //let li = createElement("li", name + ": " + score);
        //li.parent("scorelist");
    }
 scoreBoard.sort(compare);
 console.log(scoreBoard);
}

function errData(err) {
    console.log("Error!");
    console.log(err);
}