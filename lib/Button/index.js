'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('Button', module).add('with a text', function () {
  return _react2.default.createElement(
    'button',
    { onClick: (0, _storybook.action)('clicked') },
    'My First Button'
  );
}).add('with no text', function () {
  return _react2.default.createElement('button', null);
});