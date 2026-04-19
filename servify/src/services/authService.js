import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const BASE_URL="https://servify-1-q2qu.onrender.com";


export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logoutUser = () => signOut(auth);

// Sync user to MongoDB after login/register
export const syncUserToMongoDB = async (user) => {
  try {
    await fetch(`${BASE_URL}/api/auth/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firebaseId: user.uid,
        email: user.email,
        name: user.displayName || "",
      }),
    });
  } catch (err) {
    console.warn("MongoDB sync failed:", err.message);
  }
};

// Get user role from MongoDB
export const getUserRole = async (firebaseId) => {
  try {
    const res  = await fetch(`${BASE_URL}/api/auth/role/${firebaseId}`);
    const data = await res.json();
    return data.role || "user";
  } catch (err) {
    return "user";
  }
};
