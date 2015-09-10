import expect from 'expect';
import FakeRest from 'fakerest';
import sinon from 'sinon';
import fetchResource from 'actions/fetchResource';
import { ON_FETCH } from 'constants/index';

describe('actions', () => {
  beforeEach(() => {
    var restServer = new FakeRest.Server();
    restServer.init({
      'api/simple': [
        {id: 1, item: 'test'},
        {id: 2, item: 'test2'}
      ]
    });
    var server = sinon.fakeServer.create();
    server.autoRespond = true;
    server.respondWith(restServer.getHandler());
  });

  afterEach(() => {
    sinon.fakeServer.restore();
  });

  it('fetchResource must call an ON_FETCH action', () => {
    const dispatch = expect.createSpy();
    fetchResource()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({type: ON_FETCH, payload: [
      {id: 1, item: 'test'},
      {id: 2, item: 'test2'}
    ]});
  });
});
