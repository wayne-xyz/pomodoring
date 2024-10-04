// Import necessary Firebase Firestore functions and local modules
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { auth } from '../lib/firebase';
import User, { validateUser } from '../models/user';

// Initialize Firestore database
const db = getFirestore();

const COLLECTION_NAME = 'users';

/**
 * Save a user to Firestore
 * @param {Object} user - The user object to save
 */
export async function saveUser(user) {
  // Validate the user object before saving
  validateUser(user);
  // Create a reference to the user document in Firestore
  const userRef = doc(db, COLLECTION_NAME, user.userId);
  // Save the user data, merging with existing data if any
  await setDoc(userRef, user, { merge: true });
}

/**
 * Update an existing user in Firestore
 * @param {string} userId - The ID of the user to update
 * @param {Object} updateData - The data to update
 * @returns {Object} The updated user object
 */
export async function updateUser(userId, updateData) {
  const userRef = doc(db, COLLECTION_NAME, userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    // Merge current user data with update data
    const currentUser = userSnap.data();
    const updatedUser = { 
      ...currentUser, 
      ...updateData, 
      updatedAt: new Date()
    };
    // Validate the updated user object
    validateUser(updatedUser);
    // Save the updated user data
    await setDoc(userRef, updatedUser, { merge: true });
    return User(updatedUser);
  } else {
    throw new Error('User not found');
  }
}

/**
 * Retrieve a user from Firestore by userId
 * @param {string} userId - The ID of the user to retrieve
 * @returns {Object} The user object
 */
export async function getUserFromFirestore(userId) {
  const userRef = doc(db, COLLECTION_NAME, userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return User(userSnap.data());
  } else {
    throw new Error('User not found');
  }
}

/**
 * Get the current authenticated user's data from Firestore
 * @returns {Object|null} The current user object or null if not authenticated
 */
export async function getCurrentUser() {
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      // Attempt to fetch the user from Firestore
      const userFromFirestore = await getUserFromFirestore(currentUser.uid);
      if (userFromFirestore) {
        return userFromFirestore;
      } else {
        // If user doesn't exist in Firestore, create a new user
        const newUser = User({
          userId: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName, // Include displayName
          userType: 'unpaid', // Default value
          createdAt: new Date(),
          updatedAt: new Date(),
          lastLogin: new Date()
        });
        await saveUser(newUser);
        return newUser;
      }
    } catch (error) {
      console.error('Error fetching or creating current user data:', error);
      return null;
    }
  }
  return null;
}

/**
 * Create a new user or update an existing one in Firestore
 * @param {Object} userData - The user data to create or update
 * @returns {Object} The created or updated user object
 */
export async function createOrUpdateUser(userData) {
  // Try to get the existing user, if it doesn't exist, catch will return null
  const existingUser = await getUserFromFirestore(userData.userId).catch(() => null);
  if (existingUser) {
    // If user exists, update it
    return await updateUser(userData.userId, userData);
  } else {
    // If user doesn't exist, create a new one
    const newUser = User(userData);
    await saveUser(newUser);
    return newUser;
  }
}

/**
 * Update the last login timestamp for a user
 * @param {string} userId - The ID of the user to update
 * @returns {Object} The updated user object
 */
export async function updateUserLastLogin(userId) {
  return await updateUser(userId, { lastLogin: new Date() });
}
