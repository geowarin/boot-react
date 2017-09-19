import { mount, ReactWrapper } from 'enzyme';
import describeWithDOM from '../utils/describeWithDOM';

import React, { InputHTMLAttributes } from 'react';
import LoginForm from '../../src/ui/component/LoginForm';
import { IntlProvider } from 'react-intl';

const login = jest.fn();
const messages = {
  'login.title': { id: 'login.title', defaultMessage: 'cde', description: '' },
  'login.hint': { id: 'login.hint', defaultMessage: 'abc', description: '' }
};
const props = { login, messages };

function changeInputValue(input: ReactWrapper<React.InputHTMLAttributes<any>, any>, text: string) {
  input.simulate('change', { target: { value: text } });
}

describe('components', () => {
  describe('LoginForm', () => {

    it('should call login with form data', () => {
      const component = mount(<IntlProvider><LoginForm {...props} /></IntlProvider>);

      const inputs = component.find('input');
      changeInputValue(inputs.at(0), 'logincontent');
      changeInputValue(inputs.at(1), 'passwordcontent');

      component.find('form').simulate('submit');
      expect(login).toHaveBeenCalledWith('logincontent', 'passwordcontent');
    });
  });
});
