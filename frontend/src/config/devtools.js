import React, { Component } from 'react';
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';

export default class DevToolsComponent extends Component {

  render() {
    return (
      <DebugPanel top right bottom>
        <DevTools store={this.props.store} monitor={LogMonitor}/>
      </DebugPanel>
    );
  }
}
