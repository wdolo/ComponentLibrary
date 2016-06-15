import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

// Components
import Select from '../components/Select';

storiesOf('Select Dropdown', module)
  .add('Regular Dropdown', () => (
      <Select
        searchable={true}
        onChange={() => null}
        value={''}
        items={['example 1', 'example 2', 'example 3']}
      >
      </Select>
  ))
