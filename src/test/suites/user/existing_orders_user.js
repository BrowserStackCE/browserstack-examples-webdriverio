const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Login with user having existing orders', () => {
    $('#signin').click();
    $('#username input').setValue(browser.config.accounts[3].username + '\n');
    $('#password input').setValue(browser.config.accounts[3].password + '\n');
    $('#login-btn').click();
    expect($('.username')).toHaveText('existing_orders_user');

    $('#orders').click();
    $(".order").waitForDisplayed({ timeout: 5000 });
    expect($$('.order')).toHaveLength(5);
  })
})
