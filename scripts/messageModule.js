function MessageModule() {
  this.messages = [];
  this.captureMessage = (nodeId) => {
      //Get each useful element from the form and create a message object with it
      let formNode = document.getElementById(nodeId);
      let textNode = document.querySelector("#" + nodeId + " #message-text");
      let userNode = document.querySelector("#" + nodeId + " #message-user");
      let photoNode = document.querySelector("#" + nodeId + " #message-photo");
      let filters = this.getFilters();
      let time = new Date().getTime();

      //Then pass that object to addMessage with a callback to render the form
      this.addMessage(textNode.value, userNode.value, time, photoNode.getAttribute("src"), filters, this.renderMessages);
  }

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
    }

    this.clearMessageList = () => {
      //Clears all messages in list.
      let node = document.getElementById("message-scroll");
      let child = node.lastElementChild;
      while (child) {
        node.removeChild(child);
        child = node.lastElementChild;
      }
    },

    this.handleImageUpload = (files) => {
      var that = this;
      var reader = new FileReader();
         reader.readAsDataURL(files[0]);
         reader.onload = function () {
           that.renderPreviewImageFromBase64(reader.result);
         };
    },

    this.renderPreviewImageFromBase64 = (b64Image) => {
      //Clear any previous photos
      let node = document.getElementById("message-photo-frame");
      let child = node.lastElementChild;
      while (child) {
        node.removeChild(child);
        child = node.lastElementChild;
      }

      let imageNode = document.createElement("img");
      imageNode.setAttribute("src", b64Image);
      imageNode.setAttribute("id", "message-photo");
      node.appendChild(imageNode);
    },

    this.setFilter = (id, value) => {
      let imagePreviewNode = document.getElementById("message-photo");
      let filters = this.getFilters();
      this.applyFiltersToImage(filters, imagePreviewNode);
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

    this.getFilters = () => {
      let sepiaNode = document.getElementById("filter-sepia");
      let hueNode = document.getElementById("filter-hueshift");
      let blurNode = document.getElementById("filter-blur");
      let contrastNode = document.getElementById("filter-contrast");

      return {
        sepia: sepiaNode.value,
        hueShift: hueNode.value,
        blur: blurNode.value,
        contrast: contrastNode.value
      }
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
      return Math.log(value+ 1) + 0.1;
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

    this.clearForm = (nodeId) => {
      let formNode = document.querySelector("#" + nodeId);
      formNode.reset();

      let photoFrameNode = document.querySelector("#" + nodeId + " #message-photo-frame");

      let child = photoFrameNode.lastElementChild;
      while (child) {
        photoFrameNode.removeChild(child);
        child = photoFrameNode.lastElementChild;
      }

    }



    this.renderMessages();
}
