import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

// Components
import Dropdown from '../components/Dropdown';
storiesOf('Dropdown', module)
  .add('Regular Dropdown', () => (
    <Dropdown
      text="Yo"
       />
  ))
