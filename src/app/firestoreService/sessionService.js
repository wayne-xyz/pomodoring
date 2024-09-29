import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../lib/firebase';
import { createCompletedSession, addSessionId } from '../models/session';

// Initialize Firestore
const db = getFirestore(app);

/**
 * Save a completed Pomodoro session to Firestore
 * @param {Object} sessionData - The session data
 * @returns {Promise<Object>} The saved session data with Firestore-generated ID
 */
export async function saveSession(sessionData) {
  const {
    userId,
    taskId,
    taskName,
    projectId,
    projectName,
    startTime,
    endTime,
    duration,
    status
  } = sessionData;

  const sessionToSave = createCompletedSession(
    userId,
    taskId,
    taskName,
    projectId,
    projectName,
    startTime,
    endTime,
    duration,
    status
  );

  try {
    const docRef = await addDoc(collection(db, 'sessions'), sessionToSave);
    const sessionWithId = addSessionId(sessionToSave, docRef.id);
    return sessionWithId;
  } catch (error) {
    console.error('Error saving session:', error);
    throw error;
  }
}
