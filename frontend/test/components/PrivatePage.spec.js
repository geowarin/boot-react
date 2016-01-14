import { describeWithDOM, mount } from 'enzyme';
import { expect } from '../utils/chai';

import React from 'react';
import privateRoute from 'router/privateRoute';
import { PrivatePage } from 'ui/PrivatePage';

import initStore from 'config/store';

describeWithDOM('PrivatePage', () => {

  it('should render loader when not authenticated', () => {
    const WrappedRoute = privateRoute(PrivatePage);
    const store = initStore();
    const component = mount(<WrappedRoute store={store} />);

    expect(store.getState().routing.path).to.be.equal('/login');
    expect(component.find('.loader')).to.have.length(1);
  });

  it('should render the page when authenticated', () => {
    const WrappedRoute = privateRoute(PrivatePage);
    const store = initStore({authentication: {isAuthenticated: true}});
    const component = mount(<WrappedRoute store={store} />);

    expect(component.find('.loader')).to.have.length(0);
  });

});
