const baseState = {
  messages: null
};

function rootReducer(state = baseState, action) {

  if (action.type === "FETCH_MESSAGES_BEGIN") {
    return Object.assign({}, state, {
      messages: null,
      loading: true
    });
  }

  if (action.type === "FETCH_MESSAGES_SUCCESS") {
    return Object.assign({}, state, {
      messages: action.payload,
      loading: false
    });
  }

  if (action.type === "FETCH_MESSAGES_ERROR") {
    return Object.assign({}, state, {
      messages: null,
      fetchMessagesError: action.payload,
      loading: false
    });
  }

  if (action.type === "ADD_MESSAGE_SUCCESS") {
    return Object.assign({}, state, {
      messages: state.messages.concat(action.payload)
    });
  }

  if (action.type === "EDIT_MESSAGE_SUCCESS") {
    return Object.assign({}, state, {
      messages: state.messages.filter((x) => x.id !== action.payload.id).concat(action.payload)
    });
  }

  if (action.type === "IMPORT_MESSAGES") {
    return Object.assign({}, state, {
      messages: action.payload
    });
  }

  if (action.type === "CLEAR_MESSAGES") {
    return Object.assign({}, state, {
      messages: []
    });
  }

  return state;
};

export default rootReducer;
