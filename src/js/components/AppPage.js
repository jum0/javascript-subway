import $ from '../utils/querySelector.js';
import HomeComponent from './HomeComponent.js';
import StationComponent from './StationComponent.js';
import LineComponent from './LineComponent.js';
import LoginComponent from './LoginComponent.js';
import SignupComponent from './SignupComponent.js';
import MyInfoComponent from './MyInfoComponent.js';
import Page from './Page.js';
import State from './State.js';
import { ID_SELECTOR, KEYWORD, URL } from '../constants.js';
import { show, hide } from '../utils/DOM.js';
import { loadStationList } from '../utils/loadByAJAX.js';
class AppPage extends Page {
  constructor(props) {
    super(props);
  }

  initState() {
    this.accessTokenState = new State(KEYWORD.LOGOUT);
    this.stationsState = new State([]);
    this.linesState = new State([]);
  }

  initStateListener() {
    this.accessTokenState.setListener(this.handleUserDataToInit);
    this.accessTokenState.setListener(this.handleNavButtonToChange);
    this.accessTokenState.setListener(this.handlePageToRedirect);

    // TODO: 라우터 독립에 대해서 생각해보기
    this._router = {
      [URL.HOME]: new HomeComponent(),
      [URL.STATION]: new StationComponent({
        accessTokenState: this.accessTokenState,
        stationsState: this.stationsState,
      }),
      [URL.LINE]: new LineComponent(),
      [URL.LOGIN]: new LoginComponent({
        route: this.route,
        accessTokenState: this.accessTokenState,
      }),
      [URL.SIGNUP]: new SignupComponent({ route: this.route }),
      [URL.MY_INFO]: new MyInfoComponent({
        accessTokenState: this.accessTokenState,
      }),
    };
  }

  initEvent() {
    //TODO: popstate 매직넘버 3 정리하기
    window.addEventListener('popstate', e => {
      this.route('/' + e.state.path.split('/')[3], false);
    });

    $('header').addEventListener('click', this._onAnchorClicked);
    $(`#${ID_SELECTOR.NAV_LOGOUT}`).addEventListener('click', this.#onLogout);
  }

  #onLogout = () => {
    this.accessTokenState.Data = KEYWORD.LOGOUT;
  };

  handleUserDataToInit = accessToken => {
    const isLogout = accessToken === KEYWORD.LOGOUT;

    if (isLogout) {
      this.#renderGuestNavBar();
      return;
    }

    loadStationList(this.stationsState, this.accessTokenState.Data);
  };

  handleNavButtonToChange = accessToken => {
    const isLogout = accessToken === KEYWORD.LOGOUT;

    if (isLogout) {
      this.#renderGuestNavBar();
      return;
    }

    this.#renderUserNavBar();
  };

  handlePageToRedirect = accessToken => {
    const isLogout = accessToken === KEYWORD.LOGOUT;

    if (isLogout) {
      this.route(URL.LOGIN);
      return;
    }

    this.route(URL.HOME);
  };

  #renderUserNavBar() {
    show(`#${ID_SELECTOR.NAV_LINE}`);
    show(`#${ID_SELECTOR.NAV_STATION}`);
    show(`#${ID_SELECTOR.NAV_SECTION}`);
    show(`#${ID_SELECTOR.NAV_FULL_MAP}`);
    show(`#${ID_SELECTOR.NAV_SEARCH}`);
    show(`#${ID_SELECTOR.NAV_MY_INFO}`);
    show(`#${ID_SELECTOR.NAV_LOGOUT}`);

    hide(`#${ID_SELECTOR.NAV_LOGIN}`);
  }

  #renderGuestNavBar() {
    hide(`#${ID_SELECTOR.NAV_LINE}`);
    hide(`#${ID_SELECTOR.NAV_STATION}`);
    hide(`#${ID_SELECTOR.NAV_SECTION}`);
    hide(`#${ID_SELECTOR.NAV_FULL_MAP}`);
    hide(`#${ID_SELECTOR.NAV_SEARCH}`);
    hide(`#${ID_SELECTOR.NAV_MY_INFO}`);
    hide(`#${ID_SELECTOR.NAV_LOGOUT}`);

    show(`#${ID_SELECTOR.NAV_LOGIN}`);
  }
}

export default AppPage;
