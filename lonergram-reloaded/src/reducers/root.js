const initialState = {
  messages: []
};

function rootReducer(state = initialState, action) {
  if (action.type == "ADD_MESSAGE") {
    return Object.assign({}, state, {
      messages: state.messages.concat(action.payload)
    });
  }

  if (action.type == "IMPORT_MESSAGES") {
    return Object.assign({}, state, {
      messages: action.payload
    });
  }

  if (action.type == "CLEAR_MESSAGES") {
    return Object.assign({}, state, {
      messages: []
    });
  }

  return state;
};

export default rootReducer;
