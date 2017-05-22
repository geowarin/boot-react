import {mount} from "enzyme";
import describeWithDOM from "../utils/describeWithDOM";
import expect, {createSpy} from "expect";

import React from "react";
import LoginForm from "component/LoginForm";

const login = createSpy();
let props = {login};

function changeInputValue(input, name, text) {
  input.simulate('change', {target: {value: text, name: name}});
}

describeWithDOM('components', () => {

  describe('LoginForm', () => {

    it.only('should call login with form data', () => {
      const component = mount(<LoginForm {...props} />);

      const inputs = component.find('input');
      changeInputValue(inputs.at(0), 'username', 'login');
      changeInputValue(inputs.at(1), 'password', 'password');

      component.find('form').simulate('submit');
      expect(login).toHaveBeenCalledWith('login', 'password');
    })
  });
});
