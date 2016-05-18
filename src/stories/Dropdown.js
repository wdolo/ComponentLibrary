import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

// Components
import { Dropdown, DropdownMenuItem } from '../components/Dropdown';
storiesOf('Dropdown', module)
  .add('Regular Dropdown', () => (
    <Dropdown
      trigger={<button className="form-button btn">Hello</button>}
    >
      <DropdownMenuItem>Example 1</DropdownMenuItem>
      <DropdownMenuItem>Example 2</DropdownMenuItem>
      <DropdownMenuItem>Lorem ipsum pretend</DropdownMenuItem>
      <li className="separator" role="separator" />
      <DropdownMenuItem>Example 3</DropdownMenuItem>
    </Dropdown>
  ))
  .add('Dropdown With Search', () => (
    <Dropdown
      trigger={<button className="form-button btn">Search</button>}
      searchable={true}
    >
      <DropdownMenuItem>Example 1</DropdownMenuItem>
      <DropdownMenuItem>Example 2</DropdownMenuItem>
    </Dropdown>
  ))
