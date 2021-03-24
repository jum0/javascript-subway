import { ALERT_MESSAGE, ID_SELECTOR, URL } from '../../src/js/constants.js';

const EMAIL = 'wnsah052@naver.com';
const NAME = '한준모';
const PASSWORD = '1';

context('로그인 및 정보 수정', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  // TODO: cypress 첫 번째 테스트일 경우 alert를 감지하지 못하는 문제
  it('회원 가입 시 `email`, `name`, `password`를 제출해야한다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    getByHref(URL.LOGIN).click();
    getByHref(URL.SIGNUP).click();

    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_EMAIL}`).type(EMAIL);
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_NAME}`).type(NAME);
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_PASSWORD}`).type(PASSWORD);
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_PASSWORD_CONFIRM}`).type(PASSWORD);

    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_SUBMIT}`)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          ALERT_MESSAGE.DUPLICATED_EMAIL_FAIL
        );
      });
  });

  it('알맞은 이메일과 비밀번호를 입력해야 로그인할 수 있다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    getByHref(URL.LOGIN).click();

    login().then(() => {
      expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.LOGIN_SUCCESS);
    });
  });

  it('로그인 하게되면 로그인 버튼은 로그아웃 버튼으로 변경된다.', () => {
    login();

    getByHref(URL.LOGIN).should('not.be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LOGOUT}`).should('be.visible');
  });

  it('로그인하지 않은 유저에게는 로그인 외 버튼은 보이지 않는다.', () => {
    // 처음에 not.be.visible
    cy.get(`#${ID_SELECTOR.NAV_STATION}`).should('not.be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LINE}`).should('not.be.visible');
    cy.get(`#${ID_SELECTOR.NAV_SECTION}`).should('not.be.visible');
    cy.get(`#${ID_SELECTOR.NAV_FULL_MAP}`).should('not.be.visible');
    cy.get(`#${ID_SELECTOR.NAV_SEARCH}`).should('not.be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LOGIN}`).should('be.visible');

    login();

    cy.get(`#${ID_SELECTOR.NAV_STATION}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LINE}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_SECTION}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_FULL_MAP}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_SEARCH}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LOGOUT}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LOGIN}`).should('not.be.visible');
  });

  it('로그아웃하고 나면 로그인 버튼으로 변경되어야 한다.', () => {
    login();

    cy.get(`#${ID_SELECTOR.NAV_LOGOUT}`).click();
    cy.get(`#${ID_SELECTOR.NAV_LOGIN}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LOGOUT}`).should('not.be.visible');
  });

  it('로그인 하게되면 정보 수정 페이지로 접근이 가능하다.', () => {
    cy.get(`#${ID_SELECTOR.NAV_MY_INFO}`).should('not.be.visible');
    login();

    cy.get(`#${ID_SELECTOR.NAV_MY_INFO}`).click();
    cy.url().should('eq', `http://127.0.0.1:5500${URL.MY_INFO}`);
  });
});

context('지하철 역 관리 페이지', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('지하철역을 등록할 수 있다.', () => {
    const station = '사당';
    const stub = cy.stub();

    cy.on('window:alert', stub);

    login();

    getByHref(URL.STATION).click();
    cy.get(`#${ID_SELECTOR.STATION_FORM_NAME}`).type(station);
    cy.get(`#${ID_SELECTOR.STATION_FORM_SUBMIT}`)
      .click()
      .then(() => {
        expect(stub.getCall(1)).to.be.calledWith(
          ALERT_MESSAGE.DUPLICATED_STATION_FAIL
        );
      });
  });
});

function login() {
  getByHref(URL.LOGIN).click();

  cy.get(`#${ID_SELECTOR.LOGIN_FORM_EMAIL}`).type(EMAIL);
  cy.get(`#${ID_SELECTOR.LOGIN_FORM_PASSWORD}`).type(PASSWORD);
  return cy.get(`#${ID_SELECTOR.LOGIN_FORM_SUBMIT}`).click();
}

function getByHref(href, selector = '#app') {
  return cy.get(selector).find(`[href="${href}"]`);
}
