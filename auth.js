// const container = document.getElementById("container");
// const registerBtn = document.getElementById("register");
// const loginBtn = document.getElementById("login");

// registerBtn.addEventListener("click", () => {
//   container.classList.add("active");
// });
// loginBtn.addEventListener("click", () => {
//   container.classList.remove("active");
// });

// function createBlog() {
//   console.log("createBlog");
//   if()
// }

import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./firebase.js";

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const password = document.getElementById("password");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

function signupFunc() {
  // console.log("createBlog");
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(function (success) {
      // console.log(success);
      // console.log("success", success.code);
      alert("Successfully Sign Up");
      const isSignUpActive = container.classList.contains("active");
      if (isSignUpActive) {
        container.classList.remove("active");
      } else {
        container.classList.add("active");
      }
    })
    .catch(function (error) {
      // console.log("error", error.code);
      alert(error.code);
    });
  // Check if the container has the "active" class

  // Toggle between sign-up and sign-in forms
}

function loginFunc() {
  // console.log("loginFunc");
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  // console.log(loginEmail, loginPassword);
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then(function (success) {
      console.log("success", success.code);
      localStorage.setItem("uid", success.user.uid);
      alert("Successfully Login");
      location.href = "./dashboard.html";
    })
    .catch(function (error) {
      // console.log("error", error.code);
      alert(error.code);
    });
}

window.addEventListener("load", function () {
  // console.log("load")
  let uid = localStorage.getItem("uid");
  // console.log("uid", uid);
  if (uid) {
    location.href = "./dashboard.html";
    return;
  }
});

window.signupFunc = signupFunc;
window.loginFunc = loginFunc;
