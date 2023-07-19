  
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";

import { signInWithEmailAndPassword,  getAuth } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNTzu_5t7gsovjvcvpwhtAPXDR4SZ0rYM",
  authDomain: "billing-system-9.firebaseapp.com",
  projectId: "billing-system-9",
  storageBucket: "billing-system-9.appspot.com",
  messagingSenderId: "604044977763",
  appId: "1:604044977763:web:01a2a2bd9323f77af03a56"
};

  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);

  const auth = getAuth()


const email = document.getElementById("email"); 
const password = document.getElementById("password");
const loginbtn = document.getElementById("loginbtn");



loginbtn.addEventListener('click', function()
{
    //alert("working");
    if(email.value!=null||password.value!=null)
    {
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // alert("user logged in");
          location.href="./index.html";
           console.log(userCredential)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage+" "+errorCode)
        });
    }
    else{
        alert("Empty fields are not allowed");
    }
   
});