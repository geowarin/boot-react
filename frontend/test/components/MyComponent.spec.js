import Test from 'legit-tests';
import expect from 'expect';
import { MyComponent } from 'ui/Component';

describe('components', () => {

  describe('MyComponent', () => {

    it('should render correctly using shallow renderer', () => {

      const items = ['one', 'two'];
      let props = {
        fetchResource: expect.createSpy(),
        items: items
      };

      Test(<MyComponent {...props}/>)
        .find('button')
        .simulate({method: 'click', element: 'button'})
        .test(() => {
          expect(props.fetchResource).toHaveBeenCalled();
        });
    });
  });
});
