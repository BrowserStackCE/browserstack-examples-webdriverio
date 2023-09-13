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

  it('Logged in user should be able to add favourite', async() => {
    await $('#signin').click();
    await $('#username input').setValue(accounts[3].username + '\n');
    await $('#password input').setValue(accounts[3].password + '\n');
    await $('#login-btn').click();

    await $("//p[text() = 'iPhone 12']/../div/button").waitForDisplayed({ timeout: 5000 });
    await $("//p[text() = 'iPhone 12']/../div/button").click();

    await $('#favourites').click();

    await browser.waitUntil(async () => {
      let pageUrl = await browser.getUrl();
      return pageUrl.indexOf('favourites') > -1
    }, 5000)
    await browser.pause(5000)
    expect(await $$('p.shelf-item__title')).toHaveTextContaining('iPhone 12');
  })
})
