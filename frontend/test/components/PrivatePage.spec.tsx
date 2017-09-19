import { mount } from 'enzyme';
import { Provider } from 'react-intl-redux';
import React from 'react';

import privateRoute from '../../src/router/privateRoute';
import PrivatePage from '../../src/ui/container/PrivatePage';
import initStore, { RootState } from '../../src/config/store';

const messages = {
  'private.title': { id: 'private.title', defaultMessage: 'abc', description: '' },
  'private.greeting': { id: 'private.greeting', defaultMessage: 'abc', description: '' }
};

describe('PrivatePage', () => {
  it('should render loader when not authenticated', () => {
    const WrappedRoute = privateRoute(PrivatePage);
    const store = initStore([]);
    const component = mount(<Provider store={store}><WrappedRoute /></Provider>);

    expect(component.find('.loader').length).toEqual(1);
  });

  it('should render the page when authenticated', () => {
    const WrappedRoute = privateRoute(PrivatePage);
    const store = initStore([], {
      authentication: { isAuthenticated: true, debugError: null, errorMessage: null, loading: false, username: '' },
      intl: { messages, locale: 'en' }
    });

    const component = mount(<Provider store={store}><WrappedRoute /></Provider>);

    expect(component.find('.loader').length).toEqual(0);
  });
});
