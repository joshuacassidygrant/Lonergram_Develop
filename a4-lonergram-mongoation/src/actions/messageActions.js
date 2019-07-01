import {
  fetchMessagesBegin, fetchMessagesSuccess, fetchMessagesError,
  addMessageBegin, addMessageSuccess, addMessageError,
  editMessageBegin, editMessageSuccess, editMessageError,
  deleteMessageBegin, deleteMessageError, deleteMessageSuccess} from './index';

export function fetchMessages() {
  return dispatch => {
    dispatch(fetchMessagesBegin());
    return fetch("http://localhost:9000/messages")
          .then(handleErrors)
          .then(res => res.json())
          .then(json => {
            dispatch(fetchMessagesSuccess(json));
            return json;
          })
          .catch(error => dispatch(fetchMessagesError(error)))
  }
}

export function addNewMessage(message) {
  return dispatch => {
      dispatch(addMessageBegin());
      return fetch("http://localhost:9000/messages", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type' : 'application/json',
          },
        body: JSON.stringify(message)
        },
      )
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(addMessageSuccess(json));
        return json;
      })
      .catch(error => {
        console.log(error);
        dispatch(addMessageError(error));
      })
  }
}


export function editMessage(message) {
  return dispatch => {
    dispatch(editMessageBegin());
    return fetch("http://localhost:9000/messages/" + message._id, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type' : 'application/json',
        },
      body: JSON.stringify(message)
      },
    )
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      dispatch(editMessageSuccess(json));
      return json;
    })
    .catch(error => {
      console.log(error);
      dispatch(editMessageError(error));
    })
  }
}

export function deleteMessage(message) {
  return dispatch => {
    dispatch(deleteMessageBegin());
      return fetch("http://localhost:9000/messages/" + message._id, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(deleteMessageSuccess(message._id));
        return json;
      })
      .catch(error => dispatch(deleteMessageError(error)));
    }
  }


export function clearAllMessages() {
  return dispatch => {
    dispatch(fetchMessagesBegin());
    return fetch("http://localhost:9000/messages", {
          method: 'DELETE',
          mode: 'cors',
          cache: 'no-cache'
        })
          .then(handleErrors)
          .then(res => res.json())
          .then(json => {
            dispatch(fetchMessagesSuccess(json));
            return json;
          })
          .catch(error => dispatch(fetchMessagesError(error)))
  }
}

function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
}
