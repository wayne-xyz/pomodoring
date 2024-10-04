// name: session
// fields: userId, taskId, taskName, projectId, projectName, startTime, endTime, duration, status, createdAt


/**
 * Creates a complete Pomodoro session object ready for saving to Firebase
 * @param {string} userId - The ID of the user who owns the session
 * @param {string} taskId - The ID of the associated task
 * @param {string} taskName - The name of the associated task
 * @param {string} projectId - The ID of the associated project
 * @param {string} projectName - The name of the associated project
 * @param {Date} startTime - The start time of the session
 * @param {Date} endTime - The end time of the session
 * @param {number} [duration=25] - The actual duration of the session in minutes (default: 25)
 * @param {string} [status='completed'] - The status of the session (default: 'completed')
 * @returns {Object} The complete session data object
 */
export function createCompletedSession(
  userId,
  taskId,
  taskName,
  projectId,
  projectName,
  startTime,
  endTime,
  duration = 25,
  status = 'completed'
) {
  return {
    userId,
    taskId,
    taskName,
    projectId,
    projectName,
    startTime: startTime,
    endTime: endTime,
    duration,
    status,
    createdAt: new Date()
  };
}

// Export any other simple session-related functions here if needed

