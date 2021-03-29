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
    $('#username input').setValue(testData[2].split(',')[0] + '\n');
    $('#password input').setValue(testData[2].split(',')[1] + '\n');
    $('#login-btn').click();
    expect($('.username')).toHaveText('existing_orders_user');

    $('#orders').click();
    $(".order").waitForDisplayed({ timeout: 5000 });
    expect($$('.order')).toHaveLength(5);
  })
})
