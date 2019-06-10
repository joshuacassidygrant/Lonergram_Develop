export function fetchMessagesBegin(payload) {
  return {
    type: "FETCH_MESSAGES_BEGIN", payload
  }
}

export function fetchMessagesSuccess(payload) {
  return {
    type: "FETCH_MESSAGES_SUCCESS", payload
  }
}

export function fetchMessagesError(payload) {
  return {
    type: "FETCH_MESSAGES_ERROR", payload
  }
}

export function addMessage(payload) {
  return {type: "ADD_MESSAGE", payload};
}

export function importMessages(payload) {
  return {type: "IMPORT_MESSAGES", payload};
}

export function clearMessages(payload) {
  return {type: "CLEAR_MESSAGES", payload};
}
