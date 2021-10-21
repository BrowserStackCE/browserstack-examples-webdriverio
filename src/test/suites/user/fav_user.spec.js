const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('User with favourites should see 5 items', async () => {
    await (await $('#signin')).click();
    await (await $('#username input')).setValue(browser.config.accounts[0].username + '\n');
    await (await $('#password input')).setValue(browser.config.accounts[0].password + '\n');
    await (await $('#login-btn')).click();

    await (await $('#favourites')).click();

    await browser.waitUntil(async () => {
      let pageUrl = await browser.getUrl();
      return await pageUrl.indexOf('favourites') > -1
    }, 5000)

    expect((await $$('.shelf-item'))).toHaveLength(5);
  })
})
