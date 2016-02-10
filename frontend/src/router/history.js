import { browserHistory, createMemoryHistory } from 'react-router';
export default process.env.NODE_ENV === 'test' ? createMemoryHistory() : browserHistory;
