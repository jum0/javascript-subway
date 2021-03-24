import { ALERT_MESSAGE } from '../constants.js';

const fetchSignup = async (url, option) => {
  const response = await fetch(url, option);
  if (response.status === 400) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_EMAIL_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLogin = async (url, option) => {
  const response = await fetch(url, option);
  if (response.status === 400) {
    throw new Error(ALERT_MESSAGE.LOGIN_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchMyInfo = async (url, option) => {
  const response = await fetch(url, option);

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchStationList = async (url, option) => {
  const response = await fetch(url, option);

  if (response.status === 400) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_STATION_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

export { fetchSignup, fetchLogin, fetchMyInfo, fetchStationList };
