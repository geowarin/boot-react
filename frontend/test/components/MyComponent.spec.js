import expect from 'expect';
import jsdomReact from '../utils/jsdomReact';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import MyComponent from 'ui/Component';
import { createStore } from 'redux';
import reducers from 'reducers/index';

function setup() {
  const items = ['one', 'two', 'three'];
  const store = createStore(reducers, {
    simple: {
      items: items
    }
  });

  let props = {
    fetch: expect.createSpy(),
    store: store
  };

  const component = TestUtils.renderIntoDocument(<MyComponent {...props} />);

  return {
    output: component,
    ul: TestUtils.findRenderedDOMComponentWithTag(component, 'ul')
  };
}

describe('components', () => {
  jsdomReact();

  describe('MyComponent', () => {

    it('should render correctly', () => {
      const { ul } = setup();

      expect(ul.children.length).toBe(3);
      expect(ul.children[0].textContent).toBe('one');
    });
  });
});
