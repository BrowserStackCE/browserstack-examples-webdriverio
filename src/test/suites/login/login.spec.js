const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('locked account should see error message', () => {
    $('#signin').click();
    $('#username input').setValue('locked_user\n');
    $('#password input').setValue('testingisfun99\n');
    $('#login-btn').click();
    expect($('.api-error')).toHaveText('Your account has been locked.');
  })

  it('valid account should see username', () => {
    $('#signin').click();
    $('#username input').setValue('fav_user\n');
    $('#password input').setValue('testingisfun99\n');
    $('#login-btn').click();
    expect($('.username')).toHaveText('fav_user');
  })
})
