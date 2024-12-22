/**
 * Creates a new task object
 * @param {Object} params - Task parameters
 * @param {string} [params.taskId=null] - Unique identifier for the task
 * @param {string} [params.userId=''] - ID of the user who owns the task
 * @param {string} [params.projectId=''] - ID of the project this task belongs to
 * @param {string} [params.title=''] - Title/name of the task
 * @param {string} [params.description=''] - Detailed description of the task
 * @param {string} [params.status='todo'] - Current status of the task
 * @param {number} [params.priority=2] - Task priority level (1: High, 2: Medium, 3: Low)
 * @param {number} [params.estimatedPoms=1] - Estimated number of Pomodoros needed
 * @param {number} [params.completedPoms=0] - Number of completed Pomodoros
 * @param {Date} [params.dueDate=null] - Due date for the task
 * @param {Array} [params.tags=[]] - Array of tags/labels
 * @returns {Object} The complete task object
 */
export function createTask({
  taskId = null,
  userId = '',
  projectId = '',
  taskName = 'Default Task', // default is 'Default Task'
  description = '',
  status = 'in-progress', // 'todo', 'in-progress'- default, 'completed', 'archived'
  priority = 2,
  estimatedPoms = 1,
  completedPoms = 0,
  dueDate = null,
  tags = []
} = {}) {
  return {
    taskId,
    userId,
    projectId,
    taskName,
    description,
    status,
    priority,
    estimatedPoms,
    completedPoms,
    dueDate,
    tags,
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null
  };
}

/**
 * Updates the status of a task
 * @param {Object} task - The task to update
 * @param {string} newStatus - The new status
 * @returns {Object} Updated task object
 */
export function updateTaskStatus(task, newStatus) {
  return {
    ...task,
    status: newStatus,
    updatedAt: new Date(),
    completedAt: newStatus === 'completed' ? new Date() : task.completedAt
  };
}
