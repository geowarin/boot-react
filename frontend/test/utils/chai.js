import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);

const expect = chai.expect;
const spy = chai.spy;

export {
  expect,
  spy
}
