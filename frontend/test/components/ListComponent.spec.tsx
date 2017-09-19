import { shallow } from 'enzyme';

import React from 'react';
import ListComponent from '../../src/ui/component/ListComponent';
import { Router } from 'react-router';

const fetchSimple = jest.fn();
const items = ['one', 'two', 'three'];
const props = { fetchSimple, items, wasSuccessfull: true };

describe('components', () => {
  describe('ListComponent', () => {

    it('should render three items', () => {
      const component = shallow(<ListComponent {...props} />);
      expect(component.find('li').length).toEqual(3);
    });

    it('should fetch items on click', () => {
      const component = shallow(<ListComponent {...props} />);
      component.find('button').simulate('click');
      expect(fetchSimple).toHaveBeenCalled();
    });
  });
});
