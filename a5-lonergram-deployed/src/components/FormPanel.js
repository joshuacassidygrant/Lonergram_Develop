import React, { Component } from 'react';
import FilterInput from './FilterInput';
import PhotoDisplayer from './PhotoDisplayer';
import WarningBox from './WarningBox';
import {connect} from 'react-redux';
import {addNewMessage} from '../actions/messageActions';


function mapDispatchToProps(dispatch) {
  return {
    addMessage: message => dispatch(addNewMessage(message))
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
      contrast: 1,
      warningHidden: true,
      warningText: ""
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
        <WarningBox hidden={this.state.warningHidden} message={this.state.warningMessage} dismissWarning={this.dismissWarning}/>
        <div>
          YOUR MESSAGE:
          <textarea name="message" className="message-input" id="message-text" onChange={this.handleMessageChanged} value={this.state.message}></textarea>
        </div>
        <div>
          YOUR NAME:
          <input name="user" type="text" id="message-user" onChange={this.handleUserChanged} value={this.state.user} />
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
          <input type="file" name="image" id="message-photo-upload" accept="image/*"  onChange={this.handleImageUpload}/>
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
    this.dismissWarning();
    let data = new FormData(event.target);
    if (!this.validateMessage(data)) {
      this.warn("All messages must include a photo and a username!");
      return;
    }

    this.captureMessage(data);
  }

  handleImageUpload = (event) => {
    var file = event.target.files[0];
    var that = this;
    if (file == null) return;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      that.setState({image: reader.result});
      that.setState({photoData: reader.result});
    };
  }

  handleFilterChanged = (filterType, value) => {
    this.setState({[filterType]: value});
  }

  handleMessageChanged = (event) => {
    this.setState({message: event.target.value});
  }

  handleUserChanged = (event) => {
    this.setState({user: event.target.value});
  }

  handleClear = () => {
    this.setState(this.defaultState());
  }

  validateMessage = (data) => {
    return (data.get("user") && this.state.photoData);
  }

  warn = (message) => {
    this.setState({
      warningHidden: false,
      warningMessage: message
    })
  }

  dismissWarning = () => {
    this.setState({
      warningHidden: true,
      warningMessage: false
    })
  }

  captureMessage = (formData) => {
    let time = new Date().getTime();
    let id = time + Math.floor(Math.random() * 100);
    let message = {
      text: formData.get("message"),
      user: formData.get("user"),
      time: time,
      _id: id,
      photo: this.state.photoData,
      filters: {
        sepia: formData.get("filter-sepia"),
        contrast: formData.get("filter-contrast"),
        hueShift: formData.get("filter-hueShift"),
        blur: formData.get("filter-blur")
      }
    }

    this.props.addMessage(message);
    this.setState(this.defaultState());
  }
}

const FormPanel = connect(null, mapDispatchToProps)(ConnectedFormPanel);

export default FormPanel;
