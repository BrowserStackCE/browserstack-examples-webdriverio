const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('User with favourites should see 5 items', () => {
    $('#signin').click();
    $('#username input').setValue(testData[0].split(',')[0] + '\n');
    $('#password input').setValue(testData[0].split(',')[1] + '\n');
    $('#login-btn').click();

    $('#favourites').click();

    browser.waitUntil(() => {
      let pageUrl = browser.getUrl();
      return pageUrl.indexOf('favourites') > -1
    }, 5000)

    expect($$('.shelf-item')).toHaveLength(5);
  })
})
