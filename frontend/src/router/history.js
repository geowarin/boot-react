import { createHistory, createMemoryHistory } from 'history';
export default process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory();
