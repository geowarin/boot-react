import jsdom from 'jsdom-global';

export default function describeWithDOM(a, b) {
  describe('(uses jsdom)', () => {
    let cleanup;
    before(() => cleanup = jsdom());
    describe(a, b);
    after(() => cleanup());
  });
}
