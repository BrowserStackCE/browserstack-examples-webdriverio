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

  it('User with favourites should see 5 items', async () => {
    await $('#signin').click();
    await $('#username input').setValue(accounts[0].username + '\n');
    await $('#password input').setValue(accounts[0].password + '\n');
    await $('#login-btn').click();

    await $('#favourites').click();

    await browser.waitUntil(async () => {
      let pageUrl = await browser.getUrl();
      return pageUrl.indexOf('favourites') > -1
    }, 5000)

    expect(await $$('.shelf-item')).toHaveLength(5);
  })
})
