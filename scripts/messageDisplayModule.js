function MessageDisplayModule() {
  this.messages = [];


  this.addMessage = (text, user, time, photo, filters, callback) => {
      let message = {
        text,
        user,
        time,
        photo,
        filters
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
        this.applyFiltersToImage(message.filters, imageNode);
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
    },


    this.applyFiltersToImage = (filters, imageNode) => {
      let styleString = "filter: ";
      styleString += `blur(${this.denormalizeBlurValue(filters.blur)}) `;
      styleString += `contrast(${this.denormalizeContrastValue(filters.contrast)}) `;
      styleString += `sepia(${this.denormalizeSepiaValue(filters.sepia)}) `;
      styleString += `hue-rotate(${this.denormalizeHueShiftValue(filters.hueShift)}) `;

      styleString += ";";
      imageNode.setAttribute("style", styleString)
    },

    this.clearMessageList = () => {
      //Clears all messages in list.
      let node = document.getElementById("message-scroll");
      let child = node.lastElementChild;
      while (child) {
        node.removeChild(child);
        child = node.lastElementChild;
      }
    },

    this.loadContent = (files, formId) => {
      let that = this;
      let reader = new FileReader();
         reader.readAsText(files[0]);
         reader.onload = function () {
           that.messages = JSON.parse(reader.result);
           that.renderMessages();
         };
      let formNode = document.getElementById(formId);
      formNode.reset();
    },

    this.clearContent = () => {
      this.messages = [];
      this.renderMessages();
    },

    this.exportContent = () => {
      //TODO: this is hacky -- fix it
      let blob = new Blob([JSON.stringify(this.messages)], { type: "json" });
      let dl = document.createElement('a');
      dl.download = "content.json";
      dl.href = URL.createObjectURL(blob);
      dl.dataset.downloadurl = ["json", dl.download, dl.href].join(':');
      dl.style.display = "none";
      document.body.appendChild(dl);
      dl.click();
      document.body.removeChild(dl);
    },

    this.denormalizeBlurValue = (value) => {
      return value/15 + "px";
    },

    this.denormalizeSepiaValue = (value) => {
      return value/100;
    },

    this.denormalizeHueShiftValue = (value) => {
      return value * 3.6 + "deg";
    },

    this.denormalizeContrastValue = (value) => {
      return Math.log(value+ 1) + 0.5;
    }




    this.renderMessages();
}
