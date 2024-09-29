// create a the model of the user state.  field: isInsession and starttime, and userid , using to save in the firestore

// name: userState
// fields: userId, isInSession, startTime

export function createUserState(userId, isInSession, startTime) {
  return {
    userId,
    isInSession, //default false 
    startTime //default null
  };
}

