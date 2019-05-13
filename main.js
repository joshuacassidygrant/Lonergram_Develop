var sampleMessage = {
  text: "hello",
  user: "Barry Bluejeans",
  time: 19028222,
  photo: "https://images.unsplash.com/photo-1557502706-5a0e03129173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1309&q=80"
}

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
  addMessage(textNode.value, userNode.value, time, photoNode.value, renderMessage);

}

let addMessage = (text, user, time, photo, callback) => {
  let message = {
    text,
    user,
    time,
    photo
  }
  callback(message);
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
  var parentNode = document.getElementById('message-scroll');
  parentNode.appendChild(messageNode);
}
