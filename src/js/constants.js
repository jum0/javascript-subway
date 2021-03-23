const ID_SELECTOR = {
  MAIN: 'main',
  MODAL: 'modal',

  NAV_STATION: 'nav__station',
  NAV_LINE: 'nav__line',
  NAV_SECTION: 'nav__section',
  NAV_FULL_MAP: 'nav__full-map',
  NAV_SEARCH: 'nav__search',
  NAV_LOGIN: 'nav__login',
  NAV_LOGOUT: 'nav__logout',
  NAV_MY_INFO: 'nav__my-info',

  MY_INFO_FORM: 'my-info-form',
  MY_INFO_FORM_EMAIL: 'my-info-form__email',
  MY_INFO_FORM_NAME: 'my-info-form__name',
  MY_INFO_FORM_PASSWORD: 'my-info-form__password',
  MY_INFO_FORM_PASSWORD_CONFIRM: 'my-info-form__password-confirm',
  MY_INFO_FORM_SUBMIT: 'my-info-form__submit',

  SIGNUP_FORM: 'signup-form',
  SIGNUP_FORM_EMAIL: 'signup-form__email',
  SIGNUP_FORM_NAME: 'signup-form__name',
  SIGNUP_FORM_PASSWORD: 'signup-form__password',
  SIGNUP_FORM_PASSWORD_CONFIRM: 'signup-form__password-confirm',
  SIGNUP_FORM_SUBMIT: 'signup-form__submit',

  LOGIN_FORM: 'login-form',
  LOGIN_FORM_EMAIL: 'login-form__email',
  LOGIN_FORM_PASSWORD: 'login-form__password',
  LOGIN_FORM_SUBMIT: 'login-form__submit',
};

const CLASS_SELECTOR = {
  ANCHOR: 'js-anchor',
};

const ALERT_MESSAGE = {
  // SIGNUP
  SIGNUP_SUCCESS: '회원 가입에 성공했습니다.',
  DUPLICATED_EMAIL_FAIL: '중복된 이메일이 있습니다.',

  // LOGIN
  LOGIN_SUCCESS: '로그인에 성공했습니다.',
  LOGIN_FAIL: '가입하지 않은 이메일이거나, 잘못된 비밀번호입니다.',
};

const STATE_KEY = {
  LOGIN_RESPONSE: 'loginResponse',
};

const KEYWORD = {
  LOGOUT: 'logout',
};

const REQUEST_URL = 'https://www.boorownie.com';

const URL = {
  HOME: '/',
  LOGIN: '/pages/login.html',
  SIGNUP: '/pages/signup.html',
  MY_INFO: '/pages/myInfo.html',
};

export {
  ID_SELECTOR,
  CLASS_SELECTOR,
  ALERT_MESSAGE,
  STATE_KEY,
  KEYWORD,
  REQUEST_URL,
  URL,
};
