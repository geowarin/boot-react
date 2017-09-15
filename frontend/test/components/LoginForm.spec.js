import {mount} from "enzyme";
import describeWithDOM from "../utils/describeWithDOM";

import React from "react";
import LoginForm from "component/LoginForm";

const login = jest.fn();
let props = {login};

function changeInputValue(input, name, text) {
  input.simulate('change', {target: {value: text, name: name}});
}

test.only('should call login with form data', () => {
    const component = mount(<LoginForm {...props} />);

    const inputs = component.find('input');
    changeInputValue(inputs.at(0), 'username', 'login');
    changeInputValue(inputs.at(1), 'password', 'password');

    component.find('form').simulate('submit');
    expect(login).toHaveBeenCalledWith('login', 'password');
})
