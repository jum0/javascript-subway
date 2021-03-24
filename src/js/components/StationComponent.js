import Component from './Component.js';
import STATION_TEMPLATE from '../templates/stationTemplate.js';
import $ from '../utils/querySelector.js';
import {
  CLASS_SELECTOR,
  ID_SELECTOR,
  REQUEST_URL,
  STATE_KEY,
} from '../constants.js';
import { fetchStationList } from '../utils/fetch.js';
import State from './State.js';

class StationComponent extends Component {
  constructor(props) {
    super(props);
  }

  initLoad() {
    this.#loadStationList();
  }

  initState() {
    this.state = new State({
      [STATE_KEY.STATION]: {
        names: [],
      },
    });

    this.state.setListener(STATE_KEY.STATION, this.handleStationListToUpdate);
  }

  // TODO: 메서드 선언 순서 고민해보기
  initEvent() {
    $(`#${ID_SELECTOR.STATION_FORM}`).addEventListener(
      'submit',
      this.#onStationSubmit
    );
  }

  handleStationListToUpdate = station => {
    const template = station.names.map(this.#makeStationTemplate).join('');

    $(`#${ID_SELECTOR.STATION_LIST}`).innerHTML = template;
  };

  #onStationSubmit = async event => {
    event.preventDefault();
    const $input = event.target[ID_SELECTOR.STATION_FORM_NAME];
    const name = $input.value;
    const url = REQUEST_URL + '/stations';
    const data = { name };
    const accessToken = this.props.appState.getData(STATE_KEY.ACCESS_TOKEN);

    try {
      const response = await fetchStationList(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      //TODO:스낵바로 확인
      alert('역 추가 완료');

      const stationResponse = await response.json();
      const station = this.state.getData(STATE_KEY.STATION);

      // TODO: State 클래스에 pushData 만들기
      station.names.push(stationResponse.name);
      this.state.setData({ [STATE_KEY.STATION]: station });
      $input.value = '';
    } catch (err) {
      alert(err.message);
      $input.value = '';
      return;
    }
  };

  async #loadStationList() {
    const url = REQUEST_URL + '/stations';
    const accessToken = this.props.appState.getData(STATE_KEY.ACCESS_TOKEN);

    try {
      const response = await fetchStationList(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const stationResponse = await response.json();
      const names = stationResponse.map(station => station.name);

      this.state.setData({ [STATE_KEY.STATION]: { names } });
    } catch (err) {
      alert(err.message);
      return;
    }
  }

  // TODO: 위치 생각해보기
  #makeStationTemplate(name) {
    return `
    <li class="${CLASS_SELECTOR.STATION_LIST_ITEM} d-flex items-center py-2">
      <span class="w-100 pl-2">${name}</span>
      <button
        type="button"
        class="${CLASS_SELECTOR.STATION_LIST_ITEM_REVISION} bg-gray-50 text-gray-500 text-sm mr-1"
      >
        수정
      </button>
      <button
        type="button"
        class="${CLASS_SELECTOR.STATION_LIST_ITEM_DELETION} bg-gray-50 text-gray-500 text-sm"
      >
        삭제
      </button>
    </li>
    <hr class="my-0" />
    `;
  }

  render() {
    super.render(STATION_TEMPLATE);
  }
}

export default StationComponent;