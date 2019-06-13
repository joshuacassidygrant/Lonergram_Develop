import React, {Component} from 'react';
import {editMessage} from '../actions/messageActions';
import FilterInput from './FilterInput';
import PhotoDisplayer from './PhotoDisplayer';

export default class EditPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sepia: this.props.message.filters.sepia,
      blur: this.props.message.filters.blur,
      contrast: this.props.message.filters.contrast,
      hueShift: this.props.message.filters.hueShift
    }
  }

  render() {
    return (
      <div>
        <textarea name="text" onChange={this.handleTextChange} />
        <div className="filters-list">
          <FilterInput labelText="SEPIA" filterType="sepia" filterChangedEvent={this.handleFilterChanged} value={this.state.sepia} max="100"/>
          <FilterInput labelText="HUE" filterType="hueShift" filterChangedEvent={this.handleFilterChanged} value={this.state.hueShift} max="100"/>
          <FilterInput labelText="BLUR" filterType="blur" filterChangedEvent={this.handleFilterChanged} value={this.state.blur} max="100"/>
          <FilterInput labelText="CONTRAST" filterType="contrast" filterChangedEvent={this.handleFilterChanged} value={this.state.contrast} max="6"/>
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
        <PhotoDisplayer
        filters = {{
            sepia: this.state.sepia,
            hueShift: this.state.hueShift,
            blur: this.state.blur,
            contrast: this.state.contrast
          }}
          imageSource={this.props.message.photo}
        />
      </div>
    )
  }

  handleSubmit = () => {
    let message = this.captureMessage();
    editMessage(message);
  }

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  handleFilterChanged = (filterType, value) => {
    this.setState({[filterType]: value});
  }

  captureMessage = () => {
    let time = this.props.message.time;
    let id = this.props.message.id;
    let message = {
      text: this.state.text,
      user: this.props.message.user,
      time: this.props.message.time,
      id: id,
      photo: this.props.message.photo,
      filters: {
        sepia: this.state.sepia,
        contrast: this.state.contrast,
        hueShift: this.state.hueShift,
        blur: this.state.blur
      }
    }

    return message;
  }
}
