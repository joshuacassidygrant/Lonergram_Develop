function MessageModule() {
  this.messages = [];
  this.captureMessage = (nodeId) => {
      //Get each useful element from the form and create a message object with it
      let formNode = document.getElementById(nodeId);
      let textNode = document.querySelector("#" + nodeId + " #message-text");
      let userNode = document.querySelector("#" + nodeId + " #message-user");
      let photoNode = document.querySelector("#" + nodeId + " #message-photo");
      let time = new Date().getTime();

      //Then pass that object to addMessage with a callback to render the form
      this.addMessage(textNode.value, userNode.value, time, photoNode.value, this.renderMessages);
  }

  this.addMessage = (text, user, time, photo, callback) => {
      let message = {
        text,
        user,
        time,
        photo
      }
      this.messages.push(message);
      callback();
  }

  this.renderMessages = () => {
      this.clearMessageList();

      if(this.messages.length == 0) {
        let parentNode = document.getElementById("message-scroll");
        let notificationNode = document.createElement("p");
        notificationNode.innerHTML = "No messages found! Use the form on the left to create one.";
        parentNode.appendChild(notificationNode);
        return;
      }

      for (let i = 0; i < this.messages.length; i++){
        this.renderMessage(this.messages[i]);
      }
  }

  this.renderMessage =  (message) => {
      //Message node created
      let messageNode = document.createElement("div");
      messageNode.setAttribute("class", "message");

      //Inner nodes created and parented to message node
      if (message.photo !== null) {
        let imageNode = document.createElement("img");
        imageNode.setAttribute("src", message.photo);
        messageNode.appendChild(imageNode);
      }

      let textNode = document.createElement("p");
      textNode.innerHTML = message.text;
      messageNode.appendChild(textNode);

      let authorNode = document.createElement("div");
      authorNode.setAttribute("class", "from");
      authorNode.innerHTML = "-- " + message.user + " at " + new Date(message.time).toLocaleString();
      messageNode.appendChild(authorNode);

      //Parent message node to parent
      let parentNode = document.getElementById("message-scroll");
      parentNode.appendChild(messageNode);
    }

    this.clearMessageList = () => {
      //Clears all messages in list.
      let node = document.getElementById("message-scroll");
      let child = node.lastElementChild;
      while (child) {
        node.removeChild(child);
        child = node.lastElementChild;
      }
    }

    this.renderMessages();
}
