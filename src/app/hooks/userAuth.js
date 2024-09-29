import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { getCurrentUser, createOrUpdateUser, updateUserLastLogin } from '../firestoreService/userService';

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Environment variables for development mode and allowed email
const isDevelopmentMode = process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'development';
const allowedEmail = process.env.NEXT_PUBLIC_DEVELOPMENT_ALLOWED_USER_EMAIL;

// Verbose logging function
const verboseLog = (message, data) => {
  if (isDevelopmentMode) {
    console.log(`[Auth] ${message}`, data);
  }
};

export function useAuth() {
  // State to hold the authenticated user data
  const [user, setUser] = useState(null);
  // State to track if the authentication check is still loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up a listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        verboseLog("Firebase User:", firebaseUser);
        
        // Check if the user is allowed in development mode
        if (isDevelopmentMode && firebaseUser.email !== allowedEmail) {
          verboseLog("Unauthorized email in development mode:", firebaseUser.email);
          await signOut(auth);
          setUser(null);
          setLoading(false);
          return;
        }

        try {
          // Attempt to get the user record from Firestore
          const userRecord = await getCurrentUser();
          verboseLog("User Record:", userRecord);
          if (userRecord) {
            // If user exists in Firestore, update last login and set user state
            await updateUserLastLogin(firebaseUser.uid);
            const updatedUser = {
              ...userRecord,
              displayName: firebaseUser.displayName || userRecord.displayName,
              photoURL: firebaseUser.photoURL
            };
            verboseLog("Updated User:", updatedUser);
            setUser(updatedUser);
          } else {
            // If user doesn't exist in Firestore, create a new user record
            const newUser = await createOrUpdateUser({
              userId: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName
            });
            const updatedNewUser = {
              ...newUser,
              photoURL: firebaseUser.photoURL
            };
            verboseLog("New User:", updatedNewUser);
            setUser(updatedNewUser);
          }
        } catch (error) {
          console.error("Error setting up user data", error);
          setUser(null);
        }
      } else {
        verboseLog("No user signed in");
        setUser(null);
      }
      // Authentication check is complete
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to handle Google Sign In
  const signInWithGoogle = async () => {
    try {
      // Attempt to sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      // If in development mode, check if the email is allowed
      if (isDevelopmentMode && result.user.email !== allowedEmail) {
        // If not allowed, sign out and throw an error
        await signOut(auth);
        throw new Error('Unauthorized email in development mode');
      }
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
      throw error;
    }
  };

  // Return the auth state and functions
  return {
    user,       // The current user object (null if not authenticated)
    loading,    // Boolean indicating if the auth check is still in progress
    signInWithGoogle,  // Function to initiate Google Sign In
    logout      // Function to sign out the user
  };
}
