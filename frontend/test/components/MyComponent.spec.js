//import expect from 'expect';
//import jsdomReact from '../jsdomReact';
//import React from 'react/addons';
//import MyComponent from '../../src/ui/Component';
//import { createStore } from 'redux';
//import reducers from '../../src/reducers';
//
//const { TestUtils } = React.addons;
//
//function setup() {
//  const items = ['one', 'two'];
//  const store = createStore(reducers, {
//    simple: {
//      items: items
//    }
//  });
//
//  let props = {
//    fetch: expect.createSpy(),
//    store: store
//  };
//
//  const component = TestUtils.renderIntoDocument(<MyComponent {...props} />);
//
//  return {
//    output: component,
//    ul: TestUtils.findRenderedDOMComponentWithTag(component, 'ul').getDOMNode()
//  };
//}
//
//describe('components', () => {
//  jsdomReact();
//
//  describe('MyComponent', () => {
//
//    it('should render correctly', () => {
//      const { ul } = setup();
//
//      expect(ul.children.length).toBe(2);
//    });
//  });
//});
