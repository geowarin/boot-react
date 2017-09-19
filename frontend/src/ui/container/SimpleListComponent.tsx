import * as React from 'react';
import { connect } from 'react-redux';

import ListComponent, { ListComponentProps } from '../component/ListComponent';
import { fetchSimple } from '../../reducers/simple';
import { RootState } from '../../config/store';
import { Messages } from 'react-intl';

type DispatchProps = Pick<ListComponentProps, 'fetchSimple'>;
type StateProps = Pick<ListComponentProps, 'items' | 'wasSuccessfull' | 'messages'>;

const mapStateToProps = (state: RootState, ownProps: StateProps): StateProps => {
  return {
    items: state.simple.items,
    wasSuccessfull: state.simple.wasSuccessfull,
    messages: state.intl.messages
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    fetchSimple: () => dispatch(fetchSimple())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
