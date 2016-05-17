import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import './dropdown.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    }
    this.close     = this.close.bind(this);
    this.toggle    = this.toggle.bind(this);
    this.getToggle = this.getToggle.bind(this);
    this.click     = this.click.bind(this)
  }
  close = () => {
    const open = false;
    this.setState({ open });
  }
  toggle = () => {
    const open = !this.state.open;
    this.setState({ open });
  }
  getToggle = (text, onClick, isOpen) => {
    return (
      <div className={'' + (isOpen ? ' active' : '')}>
        <button className="dropdown-button btn" type="button" onClick={onClick}>{text}</button>
      </div>
    );
  }
  click = () => {
    this.close();
  }
  render() {
    const {text, direction, className} = this.props;
    return (
      <DropdownMenu
        isOpen={this.state.open}
        forceCloseFunction={this.close}
        toggle={this.getToggle(text, this.toggle, this.state.open)}
         direction={direction}
         key={'example'}
         className={className}
       >
        <ul>
          <DropdownMenuItem>Example 1</DropdownMenuItem>
          <DropdownMenuItem>Example 2</DropdownMenuItem>
          <DropdownMenuItem>Lorem ipsum pretend</DropdownMenuItem>
          <li className="separator" role="separator" />
          <DropdownMenuItem>Example 3</DropdownMenuItem>
        </ul>
      </DropdownMenu>

    )
  }
}

Dropdown.propTypes = {};
Dropdown.defaultProps = { open: false, text: 'hello', direction: 'left', className: '' };

class DropdownMenu extends Component{
  constructor(props) {
    super(props);
  }
  /* Only have the click events enabled when the menu is open */
  componentDidUpdate(prevProps, prevState) {
    if(this.props.isOpen && !prevProps.isOpen) {
      window.addEventListener('click', this.handleClickOutside);
    } else if(!this.props.isOpen && prevProps.isOpen) {
      window.removeEventListener('click', this.handleClickOutside);
    }
  }

  /* If clicked element is not in the dropdown menu children, close menu */
  handleClickOutside(e) {
    const children = this.getDOMNode().getElementsByTagName('*');
    for(let x in children) {
      if(children[x] == e.target) { return; }
    }
    this.props.forceCloseFunction(e);
  }

  handleKeyDown(e) {
    const key = e.which || e.keyCode;
    if(key !== 9) { // tab
      return;
    }
    const items = this.getDOMNode().querySelectorAll('button,a');
    const id = e.shiftKey ? 1 : items.length - 1;
    if(e.target == items[id]) {
      this.props.forceCloseFunction(e);
    }
  }

  render() {
    const items = this.props.isOpen ? this.props.children : null;

    return (
      <div className={'dd-menu' + (this.props.className ? ' ' + this.props.className : '')}>
        {this.props.toggle}
        <CSSTransitionGroup
          transitionEnterTimeout={500}
          transitionExitTimeout={500}
          transitionName={'grow-from-' + this.props.direction}
          component="div"
          className="dd-menu-items" onKeyDown={this.handleKeyDown}>
          {items}
        </CSSTransitionGroup>
      </div>
    );
  }
};

DropdownMenu.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  forceCloseFunction: React.PropTypes.func.isRequired,
  toggle: React.PropTypes.node.isRequired,
  direction: React.PropTypes.oneOf(['center', 'right', 'left']),
  className: React.PropTypes.string,
  component: React.PropTypes.oneOf(['div', 'span', 'li'])
};

DropdownMenu.defaultProps =  {
  direction: 'center',
  className: 'dropdown-button btn',
  component: 'div'
};

class DropdownMenuItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
    }

  }
  handleKeyDown(e) {
    const key = e.which || e.keyCode;
    if(key === 32) { // spacebar
      e.preventDefault(); // prevent page scrolling
      this.props.action();
    }
  }

  render() {
    const children = React.createElement(this.props.component, this.props.childrenProps, this.props.children);
    return (
      <li className={this.props.className} onClick={this.props.action}>
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
  className: React.PropTypes.string
};
DropdownMenuItem.defaultProps = {
  tabIndex: 0,
  component: 'button',
  className: '',
  childrenProps: {}
};

export default Dropdown;
