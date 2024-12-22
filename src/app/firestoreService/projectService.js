import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { createProject } from '../models/project';

const PROJECTS_COLLECTION = 'projects';

/**
 * Creates a new project in Firestore
 * @param {Object} projectData - Project data without ID
 * @returns {Promise<Object>} Created project with ID
 */
export async function createProjectInFirestore(projectData) {
  try {
    const projectRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...createProject(projectData),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return {
      ...projectData,
      projectId: projectRef.id
    };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

/**
 * Fetches all projects for a specific user
 * @param {string} userId - The user's ID
 * @returns {Promise<Array>} Array of project objects
 */
export async function fetchUserProjects(userId) {
  try {
    const projectsQuery = query(
      collection(db, PROJECTS_COLLECTION),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(projectsQuery);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      projectId: doc.id
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

/**
 * Updates project statistics
 * @param {string} projectId - The project's ID
 * @param {Object} stats - New statistics { totalTasks, completedTasks, totalPoms }
 * @returns {Promise<void>}
 */
export async function updateProjectStatistics(projectId, stats) {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(projectRef, {
      ...stats,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating project statistics:', error);
    throw error;
  }
}

/**
 * Updates a project's name
 * @param {string} projectId - The project's ID
 * @param {string} newName - The new project name
 * @returns {Promise<void>}
 */
export async function updateProjectName(projectId, newName) {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(projectRef, {
      name: newName,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating project name:', error);
    throw error;
  }
}

/**
 * Updates project status
 * @param {string} projectId - The project's ID
 * @param {string} newStatus - The new status
 * @returns {Promise<void>}
 */
export async function updateProjectStatus(projectId, newStatus) {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(projectRef, {
      status: newStatus,
      updatedAt: new Date(),
      completedAt: newStatus === 'completed' ? new Date() : null
    });
  } catch (error) {
    console.error('Error updating project status:', error);
    throw error;
  }
}

/**
 * Updates multiple fields of a project
 * @param {string} projectId - The project's ID
 * @param {Object} updates - Object containing the fields to update
 * @returns {Promise<void>}
 */
export async function updateProject(projectId, updates) {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(projectRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

/**
 * Sets a project as the default project
 * @param {string} userId - The user's ID
 * @param {string} projectId - The project's ID to set as default
 * @returns {Promise<void>}
 */
export async function setDefaultProject(userId, projectId) {
  try {
    // First, remove default status from all user's projects
    const projectsQuery = query(
      collection(db, PROJECTS_COLLECTION),
      where('userId', '==', userId),
      where('isDefault', '==', true)
    );
    
    const querySnapshot = await getDocs(projectsQuery);
    const updatePromises = querySnapshot.docs.map(doc => 
      updateDoc(doc.ref, { isDefault: false, updatedAt: new Date() })
    );
    
    await Promise.all(updatePromises);
    
    // Set the new default project
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(projectRef, {
      isDefault: true,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error setting default project:', error);
    throw error;
  }
}

/**
 * Deletes a project
 * @param {string} projectId - The project's ID
 * @returns {Promise<void>}
 */
export async function deleteProject(projectId) {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}
