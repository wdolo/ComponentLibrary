import React, { Component, PropTypes } from 'react';
import './button.css';

class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { text, onClick } = this.props;
    return (
      <button className="tempus--button" onClick={onClick}>{text}</button>
    )
  }
}

Button.propTypes = {

}

export default Button;
