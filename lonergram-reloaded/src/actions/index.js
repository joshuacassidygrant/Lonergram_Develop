export function addMessage(payload) {
  return {type: "ADD_MESSAGE", payload};
}

export function importMessages(payload) {
  return {type: "IMPORT_MESSAGES", payload};
}

export function clearMessages(payload) {
  return {type: "CLEAR_MESSAGES", payload};
}
