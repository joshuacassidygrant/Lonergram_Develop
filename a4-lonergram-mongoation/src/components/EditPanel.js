import React, {Component} from 'react';
import {editMessage} from '../actions/messageActions';
import {connect} from 'react-redux';
import FilterInput from './FilterInput';
import PhotoDisplayer from './PhotoDisplayer';

function mapDispatchToProps(dispatch) {
  return {
    editMessage: message => dispatch(editMessage(message))
  };
}

class ConnectedEditPanel extends Component {
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
        <div className="column quarter">
          <form>
            <div>
              EDITED TEXT:
              <textarea name="text" onChange={this.handleTextChange} />
            </div>
            <div>
              YOUR NAME:
              <input type="text" onChange={this.handleEditorNameChange} />
            </div>
            <div className="filters-list">
              <FilterInput labelText="SEPIA" filterType="sepia" filterChangedEvent={this.handleFilterChanged} value={this.state.sepia} max="100"/>
              <FilterInput labelText="HUE" filterType="hueShift" filterChangedEvent={this.handleFilterChanged} value={this.state.hueShift} max="100"/>
              <FilterInput labelText="BLUR" filterType="blur" filterChangedEvent={this.handleFilterChanged} value={this.state.blur} max="100"/>
              <FilterInput labelText="CONTRAST" filterType="contrast" filterChangedEvent={this.handleFilterChanged} value={this.state.contrast} max="6"/>
            </div>
            <button onClick={this.handleSubmit}>Submit</button>
            <button onClick={this.props.dismiss}>Dismiss</button>
          </form>
        </div>
        <div className="column three-quarter">
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
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let message = this.captureMessage();
    this.props.editMessage(message);
    this.props.dismiss();
  }

  handleEditorNameChange = (event) => {
    this.setState({
      editorName: event.target.value
    })
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
    let editTime = new Date().getTime();
    let editId = this.props.message._id + editTime + Math.floor(Math.random() * 100);
    let editEntry = {
      editorName: this.state.editorName,
      id: editId,
      time: editTime
    }

    if (this.props.message.edits === undefined) {
        this.props.message.edits = [
          editEntry
        ]
    } else {
      this.props.message.edits.push(editEntry);
    }

    let message = {
      text: this.state.text,
      user: this.props.message.user,
      time: this.props.message.time,
      _id: this.props.message._id,
      edits: this.props.message.edits,
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

const EditPanel = connect(null, mapDispatchToProps)(ConnectedEditPanel);

export default EditPanel;
