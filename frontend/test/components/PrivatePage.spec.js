import {mount} from 'enzyme';
import describeWithDOM from '../utils/describeWithDOM';

import React from 'react';
import privateRoute from 'router/privateRoute';
import { PrivatePage } from 'container/PrivatePage';

import initStore from 'config/store';

it('should render loader when not authenticated', () => {
    const WrappedRoute = privateRoute(PrivatePage);
    const store = initStore();
    const component = mount(<WrappedRoute store={store}/>);

    expect(component.find('.loader').length).toEqual(1);
});

it('should render the page when authenticated', () => {
    const WrappedRoute = privateRoute(PrivatePage);
    const store = initStore({authentication: {isAuthenticated: true}});
    const component = mount(<WrappedRoute store={store}/>);

    expect(component.find('.loader').length).toEqual(0);
});
