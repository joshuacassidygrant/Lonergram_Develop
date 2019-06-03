const initialState = {
  messages: []
};

function rootReducer(state = initialState, action) {
  if (action.type == "ADD_MESSAGE") {
    return Object.assign({}, state, {
      messages: state.messages.concat(action.payload)
    });
  }
  return state;
};

export default rootReducer;
