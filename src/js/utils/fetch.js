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

const fetchStationCreation = async (url, option) => {
  const response = await fetch(url, option);

  if (response.status === 400) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_STATION_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

//TODO: fetchStationCreation랑 기능이 완전히 똑같음
const fetchStationNameRevision = async (url, option) => {
  const response = await fetch(url, option);

  if (response.status === 400) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_STATION_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchStationRemoval = async (url, option) => {
  const response = await fetch(url, option);

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLineCreation = async (url, option) => {
  const response = await fetch(url, option);

  if (response.status === 400) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_LINE_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

export {
  fetchSignup,
  fetchLogin,
  fetchMyInfo,
  fetchStationCreation,
  fetchStationNameRevision,
  fetchStationRemoval,
  fetchLineCreation,
};
