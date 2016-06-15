import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import './dropdown.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      items: this.props.children
    }
    this.close     = this.close.bind(this);
    this.toggle    = this.toggle.bind(this);
    this.getToggle = this.getToggle.bind(this);
    this.search    = this.search.bind(this);
    this.click     = this.click.bind(this);
    this.getSearch = this.getSearch.bind(this);
  }
  close = () => {
    const open = false;
    this.setState({ open });
  }
  toggle = () => {
    const open = !this.state.open;
    this.setState({ open });
  }
  search = (e) => {
    this.setState({
      items: this.props.children
      .filter(child => child.props.children.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
    })
  }
  getSearch() {
    return this.state.open && this.props.searchable ? (
      <div classBane="input-field col s6">
        <input
          placeholder="Search"
          id="dropdown_search"
          type="text"
          className="validate"
          onFocus={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onChange={this.search}
         />
      </div>
    ) : null;
  }
  getToggle = (onClick, isOpen) => {
    return (
      <div onClick={onClick} className={'' + (isOpen ? ' active' : '')}>
        <div className={isOpen && this.props.searchable ? ' hideTrigger' : null}>
          {this.props.trigger}
        </div>
        {this.getSearch()}
      </div>
    );
  }
  click = () => {
    this.close();
  }
  render() {
    // TODO: make key unique
    const {direction, className} = this.props;
    return (
      <div>
      {this.getToggle(this.toggle, this.state.open)}
      <DropdownMenu
        isOpen={this.state.open}
        forceCloseFunction={this.close}
        direction={direction}
        key={'example'}
        className={className}
        searchable={this.props.searchable}
       >
        <ul>
          {this.state.items}
        </ul>
      </DropdownMenu>
      </div>
    )
  }
}

Dropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  directon: PropTypes.string,
  className: PropTypes.string,
  searchable: PropTypes.bool
};
Dropdown.defaultProps = {
  open: false,
  direction: 'left',
  className: '',
  trigger: <div></div>,
  searchable: false
 };

class DropdownMenu extends Component{
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyDown      = this.handleKeyDown.bind(this);
  }
  /* Only have the click events enabled when the menu is open */
  componentDidUpdate(prevProps, prevState) {
    if(this.props.isOpen && !prevProps.isOpen) {
      window.addEventListener('click', this.handleClickOutside);
    } else if(!this.props.isOpen && prevProps.isOpen) {
      window.removeEventListener('click', this.handleClickOutside);
    }
  }
  componentWillUnMount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  /* If clicked element is not in the dropdown menu children, close menu */
  handleClickOutside(e) {
    console.log('handling click outside');
    const children = ReactDOM.findDOMNode(this).getElementsByTagName('*');
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
    const items = ReactDOM.findDOMNode(this).querySelectorAll('button,a');
    const id = e.shiftKey ? 1 : items.length - 1;
    if(e.target == items[id]) {
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
  direction: React.PropTypes.oneOf(['center', 'right', 'left']),
  className: React.PropTypes.string,
  component: React.PropTypes.oneOf(['div', 'span', 'li']),
  searchable: React.PropTypes.bool.isRequired
};

DropdownMenu.defaultProps =  {
  direction: 'center',
  className: '',
  component: 'div',
  searchable: false
};

class DropdownMenuItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this);

  }
  handleKeyDown(e) {
    const key = e.which || e.keyCode;
    if(key === 32) { // spacebar
      e.preventDefault(); // prevent page scrolling
      this.props.action();
    }
  }
  handleClick(e) {

    this.props.action();
  }
  render() {
    const children = React.createElement(this.props.component, this.props.childrenProps, this.props.children);
    return (
      <li className={this.props.className} onClick={this.handleClick}>
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
  childrenProps: {},
  action: () => {}
};

export {
  DropdownMenuItem,
  Dropdown,
  DropdownMenu
}
