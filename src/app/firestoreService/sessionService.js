import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { createCompletedSession } from '../models/session';

// Initialize Firestore

const COLLECTION_NAME = 'sessions';
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
    const docRef = await addDoc(collection(db, COLLECTION_NAME), sessionToSave);
    return { id: docRef.id, ...sessionToSave };
  } catch (error) {
    console.error('Error saving session:', error);
    throw error;
  }
}
