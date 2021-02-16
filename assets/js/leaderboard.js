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
var leaderBoardRef = firebase.database().ref("leaderBoard");

document.getElementById("form-leaderBoard").addEventListener("submit", submitform);

// submit form
function submitform(e){
    e.preventDefault();
    // get values
    let name= getInputVal("name");
    let score = localStorage.getItem("topScore");
    // save message
    console.log(name, score);
    saveTopScore(name, score);

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