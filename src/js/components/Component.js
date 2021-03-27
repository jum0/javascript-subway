import { ID_SELECTOR } from '../constants.js';
import $ from '../utils/querySelector.js';

class Component {
  constructor(props) {
    if (!props) {
      this.props = {};
      return;
    }

    this.props = props;
  }

  initialize() {
    this.initEvent();
    this.initState();
    this.initStateListener();
    this.initLoad();
  }

  initLoad() {}

  initState() {}

  initStateListener() {}

  initEvent() {}

  render({ TITLE, MAIN, MODAL }) {
    $('title').innerHTML = TITLE;
    $(`#${ID_SELECTOR.MAIN}`).innerHTML = MAIN;
    $(`#${ID_SELECTOR.MODAL}`).innerHTML = MODAL ? MODAL : '';
  }

  _onAnchorClicked = event => {
    event.preventDefault();
    const anchor = event.target.closest('a');

    if (!anchor) {
      return;
    }

    const path = anchor.getAttribute('href');
    const route = this.props?.route || this.route;

    route(path);
  };
}

export default Component;
