import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

// Components
import Button from '../components/Button';
storiesOf('Button', module)
  .add('with a text', () => (
    <Button onClick={action('clicked')} text="My First Button" />
  ))
  .add('with no text', () => (
    <Button onClick={action('clicked')}/>
  ));
