import expect from 'expect';
import fetchResource from 'actions/fetchResource';
import { ON_FETCH } from 'actions/fetchResource';
import nock from 'nock';

describe('actions', () => {

  before(() => {
    global.XMLHttpRequest = undefined;
  });

  it('fetchResource must call an ON_FETCH action', (done) => {
    nock('http://localhost')
      .get('/api/simple')
      .reply(200, [
        'test', 'test2'
      ]);
    const dispatch = (obj) => {
      expect(obj).toEqual({type: ON_FETCH, payload: [
        'test', 'test2'
      ]});
      done();
    };
    fetchResource()(dispatch);
  });
});
