import { describeWithDOM, mount } from 'reagent';
import { expect, spy } from '../utils/chai';

import React from 'react';
import {MyComponent} from 'ui/Component';

const items = ['one', 'two', 'three'];

const fetchSimple = spy();
let props = {fetchSimple, items};

describe('components', () => {

  describeWithDOM('MyComponent', () => {

    it('should render three items', () => {
      const component = mount(<MyComponent {...props} />);
      expect(component.find('li')).to.have.length(3);
    });

    it('should fetch items on click', () => {
      const component = mount(<MyComponent {...props} />);
      component.find('button').simulate('click');
      expect(fetchSimple).to.have.been.called();
    })
  });
});
