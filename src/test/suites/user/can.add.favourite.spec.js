const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Logged in user should be able to add favourite', async () => {
    await (await $('#signin')).click();
    await (await $('#username input')).setValue(browser.config.accounts[3].username + '\n');
    await (await $('#password input')).setValue(browser.config.accounts[3].password + '\n');
    await (await $('#login-btn')).click();

    await (await $("//p[text() = 'iPhone 12']/../div/button")).waitForDisplayed({ timeout: 5000 });
    await (await $("//p[text() = 'iPhone 12']/../div/button")).click();

    await (await $('#favourites')).click();

    await browser.waitUntil(async () => {
      let pageUrl = await browser.getUrl();
      return await pageUrl.indexOf('favourites') > -1
    }, 5000)
    await browser.pause(5000)
    expect(await (await $$('p.shelf-item__title'))).toHaveTextContaining('iPhone 12');
  })
})
