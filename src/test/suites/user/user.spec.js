const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('account with favourites should see 5 items', () => {
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

  it('logged in user should be able to add favourite', () => {
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

  it('Login with user for which images doesnt load', () => {
    $('#signin').click();
    $('#username input').setValue(testData[1].split(',')[0] + '\n');
    $('#password input').setValue(testData[1].split(',')[1] + '\n');
    $('#login-btn').click();
    expect($('.username')).toHaveText('image_not_loading_user');

    all_images = $$("div.shelf-item__thumb img").map(function(element){
      return element.getAttribute("src")
    });

    expectChai(_.every(all_images,  function (value) {
      return (_.isEqual(value,'') )
    })).to.equal(true, "All images are not broken");
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
