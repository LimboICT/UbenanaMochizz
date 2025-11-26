// Import necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js';

// Firebase configuration object (use your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyAnf_PNL0nJAzcAC-Tozk9ugt8UIykeIu0",
  authDomain: "login-1d138.firebaseapp.com",
  projectId: "login-1d138",
  storageBucket: "login-1d138.firebasestorage.app",
  messagingSenderId: "823918375870",
  appId: "1:823918375870:web:13db570de493498df33fef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle login when the button is clicked
document.getElementById("login-button").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Basic validation
  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Sign in with Firebase Authentication
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully logged in
      const user = userCredential.user;
      console.log("Logged in:", user);
      alert("Login successful!");

      // Redirect to a dashboard or home page after successful login
      window.location.href = "index.html"; // Change this to your desired page
    })
    .catch((error) => {
      // Handle errors
      console.error("Login error:", error.message);
      alert("Error: " + error.message);
    });
});
