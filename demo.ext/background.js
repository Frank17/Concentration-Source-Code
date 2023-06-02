/*
console.log("Checking user's settings on firebase")
const userName = 'newUSER@gamil.com';
const password = 'huhf3';

// import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCgWNooW56Q8PPXRPrK0aOEKaq43Q6DIJ0",
    authDomain: "study-focus-project.firebaseapp.com",
    projectId: "study-focus-project",
    storageBucket: "study-focus-project.appspot.com",
    messagingSenderId: "433223165280",
    appId: "1:433223165280:web:5ff34eadd6dff07ed12a05",
    measurementId: "G-DBYMEXR3F1"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
console.log(firebase);

const auth = firebase.auth();
const promise = auth.signInWithEmailAndPassword(userName, password);
promise.catch(authResponse => console.log(authResponse.message));
console.log("Logged in successfully!")

// var db = firebase.firestore();
// var username = '';
*/

chrome.runtime.onMessage.addListener(function (username) {
    if (username === 'success') {
        console.log(username);
    } else {
        console.log('bad');
    }
})


function getDoc() {
    var userInfoRef = db.collection("Users").doc(username);
    userInfoRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data", doc.data());
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}


// chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){
//     if(message.msg === "image"){
//       fetch('https://some-random-api.ml/img/pikachu')
//             .then(response => response.text())
//             .then(data => {
//               let dataObj = JSON.parse(data);
//               senderResponse({data: dataObj, index: message.index});
//             })
//             .catch(error => console.log("error", error))
//         return true;  // Will respond asynchronously.
//     }
//   });