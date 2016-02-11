import jsdom from 'mocha-jsdom';

export default function describeWithDOM(a, b) {
  describe('(uses jsdom)', () => {
    jsdom();
    describe(a, b);
  });
}
