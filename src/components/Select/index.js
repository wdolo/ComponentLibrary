import React, { Component, PropTypes } from 'react';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';

import './dropdown.css';
const propTypes = {
  value: PropTypes.any,
  children: PropTypes.array,
  open: PropTypes.bool.isRequired,
  directon: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
};

const defaultProps = {
  value: '',
  children: [],
  open: false,
  direction: 'left',
  className: '',
  items: [],
  onChange: () => null,
};
class SelectDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      items: this.props.children,
      open: this.props.open,
      selectedItem: 0,
    };
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this.search = this.search.bind(this);
    this.selectDropdownItem = this.selectDropdownItem.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentWillReceiveProps() {
    this.setState({ value: '' });
  }
  close() {
    const open = false;
    this.setState({ open, selectedItem: 0 });
  }
  toggle(e) {
    e.stopPropagation();
    const open = !this.state.open;
    this.setState({ open });
  }
  search(e) {
    this.setState({
      value: e.target.value,
    });
  }
  selectDropdownItem(value) {
    console.log('this is getting called', 'this is the value');
    this.props.onChange(value);
    this.setState({
      value: value,
    });
  }
  handleKeyDown(e) {
    if (e.which === 13) {
      e.preventDefault();
      const items = this.props.items.filter(child => child && child.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1);
      const item = items[this.state.selectedItem] ? items[this.state.selectedItem] : items[0];
      this.selectDropdownItem(item);
      this.close();
    }
    if (e.which === 40) { // down key
      const items = this.props.items.filter(child => child && child.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1);
      this.setState(function (state) {
        if (state.selectedItem < items.length - 1) {
          return {
            open: true,
            selectedItem: state.selectedItem + 1,
          };
        } else {
          return {
            open: true,
            selectedItem: 0,
          };
        }
      });
    }
    if (e.which === 38) { // up key
      const items = this.props.items.filter(child => child && child.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1);
      this.setState(function (state) {
        if (state.selectedItem > 0) {
          return {
            open: true,
            selectedItem: state.selectedItem - 1,
          };
        } else {
          return {
            open: true,
            selectedItem: items.length - 1,
          };
        }
      });
    }
  }
  render() {
    const items = this.props.items.filter(child => child && child.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1);
    const { direction, className } = this.props;
    return (
      <div className="select-wrapper" onClick={this.toggle}>
        <span className="caret"><i className="material-icons">arrow_drop_down</i></span>
        <input type="text"
          style={{ marginBottom: 0 }}
          className="select-dropdown"
          onFocus={(e) => e.stopPropagation()}
          onChange={this.search}
          onKeyDown={this.handleKeyDown}
          value={this.state.value}
        />
        <DropdownMenu
          isOpen={this.state.open}
          forceCloseFunction={this.close}
          direction={direction}
          key={'example'}
          className={className}
          searchable={this.props.searchable}
        >
          <ul>
            {items.map((item, i) => <DropdownMenuItem isSelected={this.state.selectedItem === i} action={() => this.selectDropdownItem(item)} key={i}>{item}</DropdownMenuItem>)}
          </ul>
        </DropdownMenu>
      </div>
    );
  }
}

SelectDropdown.propTypes = propTypes;
SelectDropdown.defaultProps = defaultProps;
export default SelectDropdown;
