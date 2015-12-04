import { describeWithDOM, mount } from 'reagent';
import { expect, spy } from '../utils/chai';
import mockStore from '../utils/store';

import React from 'react';
import MyComponent from 'ui/Component';

const items = ['one', 'two', 'three'];
const store = mockStore({ simple : {items}});

const fetchSimple = spy(() => {});
let props = { fetchSimple, store };

describe('components', () => {

  describeWithDOM('MyComponent', () => {

    it('should render three items', () => {
      const component = mount(<MyComponent {...props} />);
      expect(component.find('li')).to.have.length(3);
    });
  });
});
