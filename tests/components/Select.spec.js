import assert from 'assert';
import React from 'react';
import {mount, render, shallow} from 'enzyme';
import Select from 'components/Select';
import { DropdownMenuItem } from 'components/Select';


describe('A Select Dropdown', function () {
  let _component

  beforeEach(() => {
    _component = Select.component();
  })
  it('Should return a configuration object', function () {
    expect(typeof(Select)).to.equal('object')
  })
  it('Should define a component', () => {
    expect(_component.type).to.equal('div')
  })
})
