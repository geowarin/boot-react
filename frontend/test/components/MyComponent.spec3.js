import expect from 'expect';
import jsdomReact from '../jsdomReact';
import React from 'react/addons';
import { MyComponent } from '../../src/ui/Component';
import { createStore } from 'redux';
import reducers from '../../src/reducers';

const { TestUtils } = React.addons;

function setup() {
  const items = ['one', 'two'];

  let props = {
    dispatch: expect.createSpy(),
    items: items
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<MyComponent {...props} />);

  let output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  jsdomReact();

  describe('MyComponent', () => {

    it('should render correctly using shallow renderer', () => {
      const { output, renderer } = setup();

      expect(output.type).toBe('div');

      const ul = output.props.children.find(item => item.type === 'ul');
      expect(ul).toNotEqual(null);

      const li = ul.props.children.list.filter(item => item.type === 'li');
      expect(li.length).toEqual(2);
    });
  });
});
