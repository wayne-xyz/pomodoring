// create a the model of the user state.  field: isInsession and starttime, and userid , using to save in the firestore

// name: userState
// fields: userId, isInSession, startTime

export function createUserState(userId, isInSession, startTime) {
  return {
    userId,
    isInSession, //default false 
    startTime, //default null Date()
    currentTaskId: null, //default null
    currentProjectId: null //default null
  };
}

export function updateUserState(userState, newState) {
  return {
    ...userState,
    ...newState
  };
}

export function getUserState(userId) {
  return {
    userId,
    isInSession: false,
    startTime: null,
    currentTaskId: null,
    currentProjectId: null
  };
}

