// create a user model which export and using in the firestore , accept user object and return user object

// Function to create a new user object with default values
export function createUser({
  userId = null,
  email = '',
  displayName = '',  // Added displayName field
  userType = 'unpaid', // 'unpaid', 'monthly', 'lifetime'
  subscriptionStartDate = null,
  subscriptionEndDate = null,
  trialEndDate = null, // lifetime user will have trialEndDate for 3 months
  isTrial = false, // for the lifetime user this is true for 3 months
  createdAt = new Date().toISOString(),
  updatedAt = new Date().toISOString(),
  lastLogin = null
} = {}) {
  return {
    userId,
    email,
    displayName,  // Include displayName in the returned object
    userType,
    subscriptionStartDate,
    subscriptionEndDate,
    trialEndDate,
    isTrial,
    createdAt,
    updatedAt,
    lastLogin
  };
}

// Function to validate user object
export function validateUser(user) {
  if (!user.email) {
    throw new Error('User must have an email');
  }
  if (!['unpaid', 'monthly', 'lifetime'].includes(user.userType)) {
    throw new Error('Invalid user type');
  }
  if (typeof user.displayName !== 'string') {
    throw new Error('Display name must be a string');
  }
  // Add more validation as needed
}

// Main User model function
export default function User(userData) {
  const user = createUser(userData);
  validateUser(user);
  return user;
}

