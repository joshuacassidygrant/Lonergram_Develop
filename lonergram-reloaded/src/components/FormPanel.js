import React, { Component } from 'react';

export default class FormPanel extends Component {

  render = () => {
    return (
      <form className="message-form" id="message-form">
        <div>
          YOUR MESSAGE:
          <textarea className="message-input" id="message-text"></textarea>
        </div>
        <div>
          YOUR NAME:
          <input type="text" id="message-user" />
        </div>
        <div>
        YOUR PHOTO:
          <div id="message-photo-frame"></div>
        </div>

        <div>
          <input type="file" id="message-photo-upload" accept="image/*" onChange={this.handleImageUpload(this.files)}/>
        </div>
        <div>
          CHOOSE FILTERS:
          <div class="filters-list">
            <div class="filter-group"><label>SEPIA</label><input type="range" id="filter-sepia" min="0" max="100" value="0" onChange={this.setFilter('sepia', value)} /></div>
            <div class="filter-group"><label>HUE</label><input type="range" id="filter-hueshift" min="0" max="100" value="0" onChange={this.setFilter('hueShift', value)}  /></div>
            <div class="filter-group"><label>BLUR </label><input type="range" id="filter-blur" min="0" max="100" value="0" onChange={this.setFilter('blur', value)} /></div>
            <div class="filter-group"><label>CONTRAST </label><input type="range" id="filter-contrast" min="0" max="5" value="1" onChange={this.setFilter('contrast', value)} /></div>
          </div>
        </div>

        <input type="button" name="clear" value="CLEAR" onClick={this.clearForm('message-form')}/>
        <input type="button" name="submit" value="SUBMIT" onClick={this.captureMessage('message-form')}/>
      </form>
    )
  }

  messageModule = null;

  wireUpMessageModule = (messageModule) => {
    this.messageModule = messageModule;
  }

  captureMessage = (nodeId) => {
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
        if (parentNode == null) return;
        let warningNode = document.createElement("p");
        warningNode.classList.add("warning");
        warningNode.innerHTML = "You must add a photo to submit a message!";
        parentNode.appendChild(warningNode);
        return;
      }
      //Then pass that object to addMessage with a callback to render the form
      this.messageModule.addMessage(textNode.value, userNode.value, time, photoNode.getAttribute("src"), filters, this.messageModule.renderMessages);
      this.clearForm(nodeId);
  }

  handleImageUpload = (files) => {
    var that = this;
    if (files == null) return;
    var reader = new FileReader();
       reader.readAsDataURL(files[0]);
       reader.onload = function () {
         that.renderPreviewImageFromBase64(reader.result);
       };
  }

  clearPreviewImage = () => {
    let node = document.getElementById("message-photo-frame");
    if (node == null) return;

    let child = node.lastElementChild;
    while (child) {
      node.removeChild(child);
      child = node.lastElementChild;
    }
  }

  renderPreviewImageFromBase64 = (b64Image) => {
    this.clearPreviewImage();
    let node = document.getElementById("message-photo-frame");


    let imageNode = document.createElement("img");
    imageNode.setAttribute("src", b64Image);
    imageNode.setAttribute("id", "message-photo");
    node.appendChild(imageNode);
  }

  setFilter = (id, value) => {
    let imagePreviewNode = document.getElementById("message-photo");
    let filters = this.getFilters();
    this.messageModule.applyFiltersToImage(filters, imagePreviewNode);
  }

  getFilters = () => {
    let sepiaNode = document.getElementById("filter-sepia");
    let hueNode = document.getElementById("filter-hueshift");
    let blurNode = document.getElementById("filter-blur");
    let contrastNode = document.getElementById("filter-contrast");
    //// TEMP:
    return {
      sepia: 0,
      hueShift: 0,
      blur: 0,
      contrast: 0
    }
    return {
      sepia: sepiaNode.value,
      hueShift: hueNode.value,
      blur: blurNode.value,
      contrast: contrastNode.value
    }
  }


  clearForm = (nodeId) => {
    let formNode = document.querySelector("#" + nodeId);
    if (formNode == null) return;
    formNode.reset();

    let photoFrameNode = document.querySelector("#" + nodeId + " #message-photo-frame");

    let child = photoFrameNode.lastElementChild;
    while (child) {
      photoFrameNode.removeChild(child);
      child = photoFrameNode.lastElementChild;
    }

  }
}
