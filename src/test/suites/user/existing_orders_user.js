const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Login with user having existing orders', async () => {
    await (await $('#signin')).click();
    await (await $('#username input')).setValue(browser.config.accounts[3].username + '\n');
    await (await $('#password input')).setValue(browser.config.accounts[3].password + '\n');
    await (await $('#login-btn')).click();
    await (await expect($('.username'))).toHaveText('existing_orders_user');

    await (await $('#orders')).click();
    await (await $(".order")).waitForDisplayed({ timeout: 5000 });
    expect(await (await $$('.order'))).toHaveLength(5);
  })
})
