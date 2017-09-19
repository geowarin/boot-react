import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSession } from '../../reducers/authentication';
import { setLocale } from '../../reducers/locale';
import { locales } from '../../config/translation';
import { RootState } from '../../config/store';

import 'stylus/main.styl';

interface LocaleSwitcherProps {
  currentLocale: string;
  onLocaleChange: (newLocale: string) => void;
}

const LocaleSwitcher: React.SFC<LocaleSwitcherProps> = props => (
  <select value={props.currentLocale} onChange={e => props.onLocaleChange(e.target.value)}>
    {locales.map((lang: string) => <option key={lang} value={lang}>{lang}</option>)}
  </select>
);

interface TopMenuProps {
  items: {link: string, label: string}[];
  currentLocale: string;
  setLocale: (newLocale: string) => void;
}

const TopMenu: React.SFC<TopMenuProps> = (props) => {
  const items = props.items.map((item, key) => (
    <li key={key} className="pure-menu-item">
      <Link to={item.link} className="pure-menu-link">{item.label}</Link>
    </li>
  ));

  return (
    <div className="pure-menu pure-menu-horizontal">
      <ul className="pure-menu-list">
        {items}
      </ul>
      <LocaleSwitcher currentLocale={props.currentLocale} onLocaleChange={props.setLocale} />
    </div>
  );
};

interface AppProps {
  getSession: () => { types: string[]; promise: (client: any) => any; };
  setLocale: (locale: string) => { type: string; locale: string; };
  isAuthenticated: boolean;
  currentLocale: string;
}

class App extends React.Component<AppProps, {}> {

  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { currentLocale, setLocale } = this.props;
    const menuItems = [
      { label: 'Home', link: '/' },
      this.props.isAuthenticated ? { label: 'Logout', link: 'logout' } : { label: 'Login', link: 'login' },
      { label: 'Private page', link: 'private' }
    ];

    return (
      <div id="application">
        <TopMenu items={menuItems} currentLocale={currentLocale} setLocale={setLocale}/>
        {this.props.children}
      </div>
    );
  }
}

type StateProps = Pick<AppProps, 'currentLocale' | 'isAuthenticated'>;
type DispatchProps = Pick<AppProps, 'setLocale' | 'getSession'>;

const mapStateToProps = (state: RootState, ownProps: {}): StateProps => {
  return {
    currentLocale: state.locale.currentLocale,
    isAuthenticated: state.authentication.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    getSession: () => dispatch(getSession()),
    setLocale: (locale: string) => dispatch(setLocale(locale))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
