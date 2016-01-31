import ListComponent from 'component/ListComponent';
import {connect} from 'react-redux';
import {fetchSimple} from 'reducers/simple';

export default connect(
  state => ({items: state.simple.items}),
  {fetchSimple}
)(ListComponent);
