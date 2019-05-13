let messages = [];

let captureMessage = (nodeId) => {
  //Get each useful element from the form and create a message object with it
  let formNode = document.getElementById(nodeId);
  console.log(formNode);
  let textNode = document.querySelector("#" + nodeId + " #message-text");
  console.log(textNode);
  let userNode = document.querySelector("#" + nodeId + " #message-user");
  let photoNode = document.querySelector("#" + nodeId + " #message-photo");
  let time = new Date().getTime();

  //Then pass that object to addMessage with a callback to render the form
  addMessage(textNode.value, userNode.value, time, photoNode.value, renderMessages);

}

let addMessage = (text, user, time, photo, callback) => {
  let message = {
    text,
    user,
    time,
    photo
  }
  messages.push(message);
  callback();
}

let renderMessages = () => {
  clearMessageList();
  for (let i = 0; i < messages.length; i++){
    renderMessage(messages[i]);
  }
}

let renderMessage = (message) => {
  //Message node created
  var messageNode = document.createElement("div");
  messageNode.setAttribute("class", "message");

  //Inner nodes created and parented to message node
  if (message.photo !== null) {
    var imageNode = document.createElement("img");
    imageNode.setAttribute("src", message.photo);
    messageNode.appendChild(imageNode);
  }

  var textNode = document.createElement("p");
  textNode.innerHTML = message.text;
  messageNode.appendChild(textNode);

  var authorNode = document.createElement("div");
  authorNode.setAttribute("class", "from");
  authorNode.innerHTML = "— " + message.user + " at " + new Date(message.time).toLocaleString();
  messageNode.appendChild(authorNode);

  //Parent message node to parent
  var parentNode = document.getElementById("message-scroll");
  parentNode.appendChild(messageNode);
}

let clearMessageList = () => {
  //Clears all messages in list.
  let node = document.getElementById("message-scroll");
  let child = node.lastElementChild;
  while (child) {
    node.removeChild(child);
    child = node.lastElementChild;
  }
}
