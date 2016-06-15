import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class DropdownMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);

  }
  handleKeyDown(e) {
    const key = e.which || e.keyCode;
    if (key === 32) { // spacebar
      e.preventDefault(); // prevent page scrolling
      this.props.action();
    }
  }
  handleClick(e) {
    e.preventDefault();
    this.props.action();
  }
  render() {
    const children = React.createElement(this.props.component, this.props.childrenProps, this.props.children);
    return (
      <li className={this.props.className + (this.props.isSelected ? ' selected' : '')} onClick={this.handleClick}>
        {children}
      </li>
    );
  }
}
DropdownMenuItem.propTypes = {
  action: React.PropTypes.func.isRequired,
  childrenProps: React.PropTypes.object,
  tabIndex: React.PropTypes.number,
  component: React.PropTypes.oneOf(['button', 'a']),
  className: React.PropTypes.string,
  isSelected: React.PropTypes.bool,
};
DropdownMenuItem.defaultProps = {
  tabIndex: 0,
  component: 'button',
  className: '',
  childrenProps: { type: 'button' },
  action: () => {},
  isSelected: false,
};

export default DropdownMenuItem;
