import Test from 'legit-tests';
import expect from 'expect';
import { Promise } from 'es6-promise';
import { LoginPage } from 'ui/LoginPage';

function ChangeValues(data) {
  let elements = this.helpers.elements[data.elements];
  elements.forEach((element, index) => {
    element.getDOMNode().value = data.values[index];
  });
}

describe('components', () => {

  describe('LoginPage', () => {

    it('should call login', () => {

      let props = {
        login: expect.createSpy().andCall(() => Promise.resolve())
      };

      Test(<LoginPage {...props}/>)
        .find('input')
        .use(ChangeValues, {elements: 'input', values: ['username', 'password']})
        .find('form')
        .simulate({element: 'form', method: 'submit'})
        .test(() => {
          expect(props.login).toHaveBeenCalledWith('username', 'password');
        });
    });
  });
});
