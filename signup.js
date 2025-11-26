import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js';
import { 
  getAuth, 
  createUserWithEmailAndPassword 
} from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js';
import { 
  getFirestore, 
  doc, 
  setDoc 
} from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAnf_PNL0nJAzcAC-Tozk9ugt8UIykeIu0",
  authDomain: "login-1d138.firebaseapp.com",
  projectId: "login-1d138",
  storageBucket: "login-1d138.firebasestorage.app",
  messagingSenderId: "823918375870",
  appId: "1:823918375870:web:13db570de493498df33fef"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("signup-button").addEventListener("click", async () => {
  const fullName = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  // Validation
  if (!fullName || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save additional user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName: fullName,
      email: email,
      createdAt: new Date(),
      lastLogin: new Date()
    });

    console.log("User created and data saved:", user.uid);
    alert("Sign-up successful!");
    
    // Redirect to login page with email as URL parameter
    window.location.href = `Login.html?email=${encodeURIComponent(email)}`;
  } catch (error) {
    console.error("Sign-up error:", error.message);
    
    // More specific error messages
    let errorMessage = "Sign-up failed: ";
    switch(error.code) {
      case 'auth/email-already-in-use':
        errorMessage += "Email already exists";
        break;
      case 'auth/invalid-email':
        errorMessage += "Invalid email format";
        break;
      case 'auth/weak-password':
        errorMessage += "Password should be at least 6 characters";
        break;
      default:
        errorMessage += error.message;
    }
    alert(errorMessage);
  }
});

// Handle Enter key submission
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("signup-button").click();
  }
});
