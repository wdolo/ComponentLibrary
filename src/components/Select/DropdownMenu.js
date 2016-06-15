import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  /* Only have the click events enabled when the menu is open */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isOpen && !prevProps.isOpen) {
      window.addEventListener('click', this.handleClickOutside);
    } else if (!this.props.isOpen && prevProps.isOpen) {
      window.removeEventListener('click', this.handleClickOutside);
    }
  }
  componentWillUnMount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  /* If clicked element is not in the dropdown menu children, close menu */
  handleClickOutside(e) {
    const children = ReactDOM.findDOMNode(this).getElementsByTagName('*');
    for (let x in children) {
      if (children[x] == e.target) { return; }
    }
    this.props.forceCloseFunction(e);
  }

  handleKeyDown(e) {
    const key = e.which || e.keyCode;
    if (key !== 9) { // tab
      return;
    }
    const items = ReactDOM.findDOMNode(this).querySelectorAll('button,a');
    const id = e.shiftKey ? 1 : items.length - 1;
    if (e.target == items[id]) {
      this.props.forceCloseFunction(e);
    }
  }
  render() {
    const items = this.props.isOpen ? this.props.children : null;

    return (
      <div className={'dd-menu' + (this.props.className ? ' ' + this.props.className : '')}>
        <CSSTransitionGroup
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionName={'grow-from-' + this.props.direction}
          component="div"
          className="dd-menu-items" onKeyDown={this.handleKeyDown}
        >
          {items}
        </CSSTransitionGroup>
      </div>
    );
  }
}

DropdownMenu.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  forceCloseFunction: React.PropTypes.func.isRequired,
  direction: React.PropTypes.oneOf(['center', 'right', 'left']),
  className: React.PropTypes.string,
  component: React.PropTypes.oneOf(['div', 'span', 'li']),
  searchable: React.PropTypes.bool.isRequired,
};

DropdownMenu.defaultProps = {
  direction: 'center',
  className: '',
  component: 'div',
  searchable: false,
};

export default DropdownMenu;
