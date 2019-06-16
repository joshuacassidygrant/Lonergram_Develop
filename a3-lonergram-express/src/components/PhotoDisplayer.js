import React, {Component} from 'react';

export default class PhotoDisplay extends Component {

  render() {
    if (this.props.imageSource == null) return "";
   return (
      <img
        src={this.props.imageSource}
        style={this.getStyleObject(
          this.props.filters
        )}
        alt="Wow!"
      />
    )
  }

  getStyleObject = (filters) => {
    let styleString = "";
    styleString += `blur(${this.denormalizeBlurValue(filters.blur)}) `;
    styleString += `contrast(${this.denormalizeContrastValue(filters.contrast)}) `;
    styleString += `sepia(${this.denormalizeSepiaValue(filters.sepia)}) `;
    styleString += `hue-rotate(${this.denormalizeHueShiftValue(filters.hueShift)}) `;
    return {
      filter: styleString
    };
  }

  denormalizeBlurValue = (value) => {
    return value/15 + "px";
  }

  denormalizeSepiaValue = (value) => {
    return value/100;
  }

  denormalizeHueShiftValue = (value) => {
    return value * 3.6 + "deg";
  }

  denormalizeContrastValue = (value) => {
    return (value + 1)/10;
  }

}
