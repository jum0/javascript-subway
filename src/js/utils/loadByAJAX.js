import { REQUEST_URL } from '../constants.js';
import { fetchStationCreation, fetchLineCreation } from './fetch.js';

//TODO: load = fetch + state에 담기라서 네이밍 고민해보기
const loadStationList = async (state, accessToken) => {
  const url = REQUEST_URL + '/stations';

  try {
    const response = await fetchStationCreation(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const stationResponse = await response.json();
    const stations = stationResponse.map(station => ({
      id: station.id,
      name: station.name,
    }));

    state.Data = stations;
  } catch (err) {
    alert(err.message);
    return;
  }
};

const loadLineList = async (state, accessToken) => {
  const url = REQUEST_URL + '/lines';

  try {
    const response = await fetchLineCreation(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });

    const lineResponse = await response.json();
    const lines = lineResponse.map(line => ({
      id: line.id,
      name: line.name,
      color: line.color,
    }));

    state.Data = lines;
  } catch (err) {
    alert(err.message);
    return;
  }
};

export { loadStationList, loadLineList };