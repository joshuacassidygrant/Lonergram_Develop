import {fetchMessagesBegin, fetchMessagesSuccess, fetchMessagesError} from './index';

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

function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
}
