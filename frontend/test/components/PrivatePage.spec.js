import { describeWithDOM, mount } from 'enzyme';
import expect from 'expect';

import React from 'react';
import privateRoute from 'router/privateRoute';
import { PrivatePage } from 'ui/PrivatePage';

import initStore from 'config/store';

describeWithDOM('PrivatePage', () => {

  it('should render loader when not authenticated', () => {
    const WrappedRoute = privateRoute(PrivatePage);
    const store = initStore();
    const component = mount(<WrappedRoute store={store} />);

    expect(component.find('.loader').length).toEqual(1);
  });

  it('should render the page when authenticated', () => {
    const WrappedRoute = privateRoute(PrivatePage);
    const store = initStore({authentication: {isAuthenticated: true}});
    const component = mount(<WrappedRoute store={store} />);

    expect(component.find('.loader').length).toEqual(0);
  });

});
