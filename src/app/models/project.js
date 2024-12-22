/**
 * Creates a new project object
 * @param {Object} params - Project parameters
 * @param {string} [params.projectId=null] - Unique identifier for the project
 * @param {string} [params.userId=''] - ID of the user who owns the project
 * @param {string} [params.name=''] - Name/title of the project
 * @param {string} [params.description=''] - Detailed description of the project
 * @param {string} [params.status='active'] - Current status of the project
 * @param {string} [params.color='#000000'] - Color code for project visualization
 * @param {boolean} [params.isDefault=false] - Whether this is the default project
 * @param {number} [params.totalTasks=0] - Total number of tasks
 * @param {number} [params.completedTasks=0] - Number of completed tasks
 * @param {number} [params.totalPoms=0] - Total number of Pomodoros logged
 * @param {Date} [params.dueDate=null] - Due date for the project
 * @param {Array} [params.tags=[]] - Array of tags/labels
 * @returns {Object} The complete project object
 */
export function createProject({
  projectId = null,
  userId = '',
  name = 'Default Project', // default is 'Default Project'
  description = '',
  status = 'active', // 'active', 'completed', 'archived', 'on-hold'
  color = '#000000',
  isDefault = true,
  totalTasks = 0,
  completedTasks = 0,
  totalPoms = 0,
  dueDate = null,
  tags = []
} = {}) {
  return {
    projectId,
    userId,
    name,
    description,
    status,
    color,
    isDefault,
    totalTasks,
    completedTasks,
    totalPoms,
    dueDate,
    tags,
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null
  };
}

/**
 * Updates project statistics
 * @param {Object} project - The project to update
 * @param {Object} stats - New statistics { totalTasks, completedTasks, totalPoms }
 * @returns {Object} Updated project object
 */
export function updateProjectStats(project, { totalTasks, completedTasks, totalPoms }) {
  return {
    ...project,
    totalTasks,
    completedTasks,
    totalPoms,
    updatedAt: new Date()
  };
}

/**
 * Updates the status of a project
 * @param {Object} project - The project to update
 * @param {string} newStatus - The new status
 * @returns {Object} Updated project object
 */
export function updateProjectStatus(project, newStatus) {
  return {
    ...project,
    status: newStatus,
    updatedAt: new Date(),
    completedAt: newStatus === 'completed' ? new Date() : project.completedAt
  };
}
