import { configure } from '@kadira/storybook';
import '../src/_statics/materialize.min.css';

function loadStories() {
  require('../src/stories/Button');
  require('../src/stories/TestComponent.js');
  require('../src/stories/Dropdown.js');
  require('../src/stories/Select.js');
  // require as many as stories you need.
}

configure(loadStories, module);
