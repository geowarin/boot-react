import { shallow } from 'enzyme';
import  expect, { createSpy } from 'expect';

import React from 'react';
import { MyComponent } from 'ui/Component';

const fetchSimple = createSpy();
const items = ['one', 'two', 'three'];
let props = {fetchSimple, items};

describe('components', () => {

  describe('MyComponent', () => {

    it('should render three items', () => {
      const component = shallow(<MyComponent {...props} />);
      expect(component.find('li').length).toEqual(3);
    });

    it('should fetch items on click', () => {
      const component = shallow(<MyComponent {...props} />);
      component.find('button').simulate('click');
      expect(fetchSimple).toHaveBeenCalled();
    })
  });
});
