import React, { Component } from 'react';
import FilterInput from './FilterInput';
import PhotoDisplayer from './PhotoDisplayer';
import {addMessage} from '../actions/index';
import {connect} from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    addMessage: message => dispatch(addMessage(message))
  };
}

class ConnectedFormPanel extends Component {

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
            <FilterInput labelText="SEPIA" filterType="sepia" filterChangedEvent={this.handleFilterChanged} value={this.state.sepia} max="100"/>
            <FilterInput labelText="HUE" filterType="hueShift" filterChangedEvent={this.handleFilterChanged} value={this.state.hueShift} max="100"/>
            <FilterInput labelText="BLUR" filterType="blur" filterChangedEvent={this.handleFilterChanged} value={this.state.blur} max="100"/>
            <FilterInput labelText="CONTRAST" filterType="contrast" filterChangedEvent={this.handleFilterChanged} value={this.state.contrast} max="6"/>
          </div>
        </div>

        <input type="button" name="clear" value="CLEAR" onClick={this.handleClear} />
        <input type="submit" name="submit" value="SUBMIT"/>
      </form>
    )
  }

  handleSubmit = (event) => {
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

  handleClear = () => {
    this.setState(this.defaultState());
  }

  messageModule = null;

  wireUpMessageModule = (messageModule) => {
    this.messageModule = messageModule;
  }

  captureMessage = (formData) => {
    let time = new Date().getTime();
    let id = time + Math.floor(Math.random() * 100);
    let message = {
      text: formData.get("message"),
      user: formData.get("user"),
      time: time,
      id: id,
      photo: formData.get("image"),
      filters: {
        sepia: formData.get("sepia"),
        contrast: formData.get("contrast"),
        hueShift: formData.get("hueShift"),
        blur: formData.get("blur")
      }
    }

    this.props.addMessage(message);
  }
}

const FormPanel = connect(null, mapDispatchToProps)(ConnectedFormPanel);

export default FormPanel;
