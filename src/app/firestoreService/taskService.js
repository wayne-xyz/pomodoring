import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { createTask } from '../models/task';

const TASKS_COLLECTION = 'tasks';

/**
 * Creates a new task in Firestore
 * @param {Object} taskData - Task data without ID
 * @returns {Promise<Object>} Created task with ID
 */
export async function createTaskInFirestore(taskData) {
  try {
    const taskRef = await addDoc(collection(db, TASKS_COLLECTION), {
      ...createTask(taskData),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return {
      ...taskData,
      taskId: taskRef.id
    };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

/**
 * Fetches all tasks for a specific user
 * @param {string} userId - The user's ID
 * @returns {Promise<Array>} Array of task objects
 */
export async function fetchUserTasks(userId) {
  try {
    const tasksQuery = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(tasksQuery);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      taskId: doc.id
    }));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

/**
 * Updates a task's status to completed
 * @param {string} taskId - The task's ID
 * @returns {Promise<void>}
 */
export async function completeTask(taskId) {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, {
      status: 'completed',
      completedAt: new Date(),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error completing task:', error);
    throw error;
  }
}

/**
 * Updates a task's title
 * @param {string} taskId - The task's ID
 * @param {string} newTitle - The new title
 * @returns {Promise<void>}
 */
export async function updateTaskTitle(taskId, newTitle) {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, {
      title: newTitle,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating task title:', error);
    throw error;
  }
}

/**
 * Updates multiple fields of a task
 * @param {string} taskId - The task's ID
 * @param {Object} updates - Object containing the fields to update
 * @returns {Promise<void>}
 */
export async function updateTask(taskId, updates) {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

/**
 * Deletes a task
 * @param {string} taskId - The task's ID
 * @returns {Promise<void>}
 */
export async function deleteTask(taskId) {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}



/**
 * Fetches the current task for a user
 * @param {string} userId - The user's ID
 * @returns {Promise<Object>} Current task object
 */
export async function getCurrentTaskInfo(userId) {
  const tasks = await fetchUserTasks(userId);
  return tasks.find(task => task.status === 'current');
} 



/**
 * update the current task for a user 
 * @param {string} userId - The user's ID
 * @param {string} taskId - The task's ID
 * @returns {Promise<void>}
 */
export async function updateCurrentTask(userId, taskId) {
  // TODO: Implement this function
//fetch the current task from the database change to in-progress
  const currentTask = await getCurrentTaskInfo(userId);
  if (currentTask) {
    await updateTask(currentTask.taskId, { status: 'in-progress' });
  }
// then update a task to current
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, { status: 'current' });
  } catch (error) {
    console.error('Error updating current task:', error);
    throw error;
  }
}