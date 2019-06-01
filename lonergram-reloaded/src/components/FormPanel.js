import React, { Component } from 'react';
import FilterInput from './FilterInput';
import PhotoDisplayer from './PhotoDisplayer';

export default class FormPanel extends Component {

  defaultState = () => {
    return {
      image: null,
      message: "",
      user: "",
      sepia: 0,
      hueShift: 0,
      blur: 0,
      contrast: 1
    }
  }

  constructor(props) {
    super(props);
    this.state = this.defaultState();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render = () => {
    return (
      <form className="message-form" id="message-form" onSubmit={this.handleSubmit}>
        <div>
          YOUR MESSAGE:
          <textarea name="message" className="message-input" id="message-text"></textarea>
        </div>
        <div>
          YOUR NAME:
          <input name="author" type="text" id="message-user" />
        </div>
        <div>
        YOUR PHOTO:
          <div id="message-photo-frame">
            <PhotoDisplayer
              filters = {{
                sepia: this.state.sepia,
                hueShift: this.state.hueShift,
                blur: this.state.blur,
                contrast: this.state.contrast
              }}
              imageSource={this.state.image}
              />
          </div>
        </div>

        <div>
          <input type="file" name="image" id="message-photo-upload" accept="image/*" onChange={this.handleImageUpload}/>
        </div>
        <div>
          CHOOSE FILTERS:
          <div className="filters-list">
            <FilterInput labelText="SEPIA" filterType="sepia" filterChangedEvent={this.handleFilterChanged} value={this.state.sepia}/>
            <FilterInput labelText="HUE" filterType="hueShift" filterChangedEvent={this.handleFilterChanged} value={this.state.hueShift}/>
            <FilterInput labelText="BLUR" filterType="blur" filterChangedEvent={this.handleFilterChanged} value={this.state.blur}/>
            <FilterInput labelText="CONTRAST" filterType="contrast" filterChangedEvent={this.handleFilterChanged} value={this.state.contrast}/>
          </div>
        </div>

        <input type="button" name="clear" value="CLEAR"/>
        <input type="submit" name="submit" value="SUBMIT"/>
      </form>
    )
  }

  handleSubmit (event) {
    event.preventDefault();
    let data = new FormData(event.target);
    this.captureMessage(data);
  }

  handleImageUpload = (event) => {
    var file = event.target.files[0];
    var that = this;
    if (file == null) return;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      that.setState({image: reader.result})
    };
  }

  handleFilterChanged = (filterType, value) => {
    this.setState({[filterType]: value});
  }

  messageModule = null;

  wireUpMessageModule = (messageModule) => {
    this.messageModule = messageModule;
  }

  captureMessage = (formData) => {
    let time = new Date().getTime();
    let message = {
      text: formData.get("message"),
      user: formData.get("user"),
      time: time,
      photo: formData.get("image"),
      filters: {
        sepia: formData.get("sepia"),
        contrast: formData.get("contrast"),
        hueShift: formData.get("hueShift"),
        blur: formData.get("blur")
      }
    }

    console.log(message);
    //TODO: send message to state
  }


  /*setFilter = (id, value) => {
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
  }*/


  /*clearForm = (nodeId) => {
    let formNode = document.querySelector("#" + nodeId);
    if (formNode == null) return;
    formNode.reset();

    let photoFrameNode = document.querySelector("#" + nodeId + " #message-photo-frame");

    let child = photoFrameNode.lastElementChild;
    while (child) {
      photoFrameNode.removeChild(child);
      child = photoFrameNode.lastElementChild;
    }

  }*/


}
