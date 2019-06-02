import React, {Component} from 'react';

export default class FilterInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labelText: this.props.labelText,
      filterType: this.props.filterType,
      value: this.props.value
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.props.filterChangedEvent(this.props.filterType, event.target.value);
  }

  render = () => {
    let elementId = "filter-" + this.state.filterType;
    return (
      <div className="filter-group">
        <label>
          {this.state.labelText}
        </label>
        <input
          type="range"
          name={elementId}
          min="0"
          max={this.props.max}
          value={this.props.value}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
