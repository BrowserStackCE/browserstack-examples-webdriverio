const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Logged in user should be able to add favourite', () => {
    $('#signin').click();
    $('#username input').setValue(testData[2].split(',')[0] + '\n');
    $('#password input').setValue(testData[2].split(',')[1] + '\n');
    $('#login-btn').click();

    $("//p[text() = 'iPhone 12']/../div/button").waitForDisplayed({ timeout: 5000 });
    $("//p[text() = 'iPhone 12']/../div/button").click();

    $('#favourites').click();

    browser.waitUntil(() => {
      let pageUrl = browser.getUrl();
      return pageUrl.indexOf('favourites') > -1
    }, 5000)
    browser.pause(5000)
    expect($$('p.shelf-item__title')).toHaveTextContaining('iPhone 12');
  })
})
