import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

// Components
import TestComponent from '../components/TestComponent';

storiesOf('TestComponent', module)
  .add('Just a test', () => (
    <TestComponent/>
  ))
