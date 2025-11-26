
// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js';

// Your Firebase config
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

// Function to check if the user is logged in and adjust UI accordingly
function checkUserAuth() {
  onAuthStateChanged(auth, (user) => {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const welcomeEl = document.getElementById('user-welcome'); // Welcome message element
    
    if (user) {
      // If user is logged in, hide login/signup buttons and show logout button
      loginBtn && (loginBtn.style.display = 'none');
      signupBtn && (signupBtn.style.display = 'none');
      logoutBtn && (logoutBtn.style.display = 'inline-block');
      
      // Display the welcome message
      const displayName = user.displayName || user.email;
      welcomeEl && (welcomeEl.textContent = `Welcome, ${displayName}`);
      welcomeEl && (welcomeEl.style.display = 'inline-block');
      
    } else {
      // If user is not logged in, show login/signup buttons
      loginBtn && (loginBtn.style.display = 'inline-block');
      signupBtn && (signupBtn.style.display = 'inline-block');
      logoutBtn && (logoutBtn.style.display = 'none');
      
      // Hide the welcome message when logged out
      welcomeEl && (welcomeEl.style.display = 'none');
    }
  });
}

// Function to handle logout
function handleLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  if (!logoutBtn) return;

  logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
      alert('You have logged out.');
      location.reload(); // or location.href = 'Home.html';
    }).catch((error) => {
      console.error('Error logging out:', error.message);
    });
  });
}

// Run the functions
checkUserAuth();
handleLogout();
