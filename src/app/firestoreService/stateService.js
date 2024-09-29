import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { createUserState, updateUserState } from '../models/state';

const COLLECTION_NAME = 'states';

/**
 * Get the current state for a user
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object|null>} The user's state or null if not found
 */
export async function getUserState(userId) {
  const stateRef = doc(db, COLLECTION_NAME, userId);
  const stateSnap = await getDoc(stateRef);

  if (stateSnap.exists()) {
    return stateSnap.data();
  }
  return null;
}

/**
 * Create or update a user's state
 * @param {string} userId - The ID of the user
 * @param {boolean} isInSession - Whether the user is in a session
 * @param {Date|null} startTime - The start time of the current session
 * @returns {Promise<Object>} The updated user state
 */
export async function createOrUpdateUserState(userId, isInSession, startTime) {
  const stateRef = doc(db, COLLECTION_NAME, userId);
  const existingState = await getUserState(userId);

  if (existingState) {
    const updatedState = updateUserState(existingState, { isInSession, startTime });
    await updateDoc(stateRef, updatedState);
    return updatedState;
  } else {
    const newState = createUserState(userId, isInSession, startTime);
    await setDoc(stateRef, newState);
    return newState;
  }
}

/**
 * Start a session for a user
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} The updated user state
 */
export async function startSession(userId) {
  return createOrUpdateUserState(userId, true, new Date());
}

/**
 * End a session for a user
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} The updated user state
 */
export async function endSession(userId) {
  return createOrUpdateUserState(userId, false, null);
}

/**
 * Check if a user is in session
 * @param {string} userId - The ID of the user
 * @returns {Promise<boolean>} Whether the user is in session
 */
export async function isUserInSession(userId) {
  const state = await getUserState(userId);
  return state ? state.isInSession : false;
}
