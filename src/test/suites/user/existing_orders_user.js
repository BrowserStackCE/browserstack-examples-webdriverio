const _ = require('lodash');
const expectChai = require('chai').expect;
const accounts = require('../../../../resources/data/user.json')

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Login with user having existing orders', async () => {
    await $('#signin').click();
    await $('#username input').setValue(accounts[3].username + '\n');
    await $('#password input').setValue(accounts[3].password + '\n');
    await $('#login-btn').click();
    expect(await $('.username')).toHaveText('existing_orders_user');

    await $('#orders').click();
    await $(".order").waitForDisplayed({ timeout: 5000 });
    expect(await $$('.order')).toHaveLength(5);
  })
})
