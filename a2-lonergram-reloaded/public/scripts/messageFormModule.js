function MessageFormModule(messageModule) {
/*  this.messageModule = messageModule;

  this.captureMessage = (nodeId) => {
      //Get each useful element from the form and create a message object with it
      let formNode = document.getElementById(nodeId);
      let textNode = document.querySelector("#" + nodeId + " #message-text");
      let userNode = document.querySelector("#" + nodeId + " #message-user");
      let photoNode = document.querySelector("#" + nodeId + " #message-photo");
      let filters = this.getFilters();
      let time = new Date().getTime();

      //TODO: someday, add error handling/verification/notificaitons here.
      if (photoNode == null) {
        this.clearPreviewImage();
        let parentNode = document.getElementById("message-photo-frame");
        let warningNode = document.createElement("p");
        warningNode.classList.add("warning");
        warningNode.innerHTML = "You must add a photo to submit a message!";
        parentNode.appendChild(warningNode);
        return;
      }
      //Then pass that object to addMessage with a callback to render the form
      messageModule.addMessage(textNode.value, userNode.value, time, photoNode.getAttribute("src"), filters, messageModule.renderMessages);
      this.clearForm(nodeId);
  }

  this.handleImageUpload = (files) => {
    var that = this;
    var reader = new FileReader();
       reader.readAsDataURL(files[0]);
       reader.onload = function () {
         that.renderPreviewImageFromBase64(reader.result);
       };
  }

  this.clearPreviewImage = () => {
    let node = document.getElementById("message-photo-frame");
    let child = node.lastElementChild;
    while (child) {
      node.removeChild(child);
      child = node.lastElementChild;
    }
  }

  this.renderPreviewImageFromBase64 = (b64Image) => {
    this.clearPreviewImage();
    let node = document.getElementById("message-photo-frame");


    let imageNode = document.createElement("img");
    imageNode.setAttribute("src", b64Image);
    imageNode.setAttribute("id", "message-photo");
    node.appendChild(imageNode);
  }

  this.setFilter = (id, value) => {
    let imagePreviewNode = document.getElementById("message-photo");
    let filters = this.getFilters();
    messageModule.applyFiltersToImage(filters, imagePreviewNode);
  }

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
  }


  this.clearForm = (nodeId) => {
    let formNode = document.querySelector("#" + nodeId);
    formNode.reset();

    let photoFrameNode = document.querySelector("#" + nodeId + " #message-photo-frame");

    let child = photoFrameNode.lastElementChild;
    while (child) {
      photoFrameNode.removeChild(child);
      child = photoFrameNode.lastElementChild;
    }

  }*/
}
