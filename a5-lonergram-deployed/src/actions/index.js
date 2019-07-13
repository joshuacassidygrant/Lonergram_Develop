export function fetchMessagesBegin(payload) {
  return { type: "FETCH_MESSAGES_BEGIN", payload }
}

export function fetchMessagesSuccess(payload) {
  return { type: "FETCH_MESSAGES_SUCCESS", payload }
}

export function fetchMessagesError(payload) {
  return {type: "FETCH_MESSAGES_ERROR", payload }
}

export function addMessageBegin(payload) {
  return {type: "ADD_MESSAGE_BEGIN", payload};
}

export function addMessageSuccess(payload) {
  return {type: "ADD_MESSAGE_SUCCESS", payload};
}

export function addMessageError(payload) {
  return {type: "ADD_MESSAGE_ERROR", payload};
}

export function editMessageBegin(payload) {
  return {type: "EDIT_MESSAGE_BEGIN", payload};
}

export function editMessageSuccess(payload) {
  return {type: "EDIT_MESSAGE_SUCCESS", payload};
}

export function editMessageError(payload) {
  return {type: "EDIT_MESSAGE_ERROR", payload};
}

export function importMessages(payload) {
  return {type: "IMPORT_MESSAGES", payload};
}

export function clearMessages(payload) {
  return {type: "CLEAR_MESSAGES", payload};
}

export function deleteMessageBegin(payload) {
  return {type: "DELETE_MESSAGE_BEGIN"};
}

export function deleteMessageSuccess(payload) {
  return {type: "DELETE_MESSAGE_SUCCESS"}
}

export function deleteMessageError(payload) {
  return {type: "DELETE_MESSAGE_ERROR"}
}
