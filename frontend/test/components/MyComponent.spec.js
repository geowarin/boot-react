import { describeWithDOM, mount } from 'enzyme';
import { expect, spy } from '../utils/chai';

import React from 'react';
import { MyComponent } from 'ui/Component';
import { StatelessWrapper } from '../utils/StatelessWrapper';

const TestComponent = StatelessWrapper(MyComponent);

const fetchSimple = spy();
const items = ['one', 'two', 'three'];
let props = {fetchSimple, items};

describe('components', () => {

  describeWithDOM('MyComponent', () => {

    it('should render three items', () => {
      const component = mount(<TestComponent {...props} />);
      expect(component.find('li')).to.have.length(3);
    });

    it('should fetch items on click', () => {
      const component = mount(<TestComponent {...props} />);
      component.find('button').simulate('click');
      expect(fetchSimple).to.have.been.called();
    })
  });
});
