import React, {Component} from 'react';

export default class PhotoDisplay extends Component {

  render() {
    //TODO: add filter stuff.
    return (
      <img
        src={this.props.imageSource}
      />
    )
  }

}
