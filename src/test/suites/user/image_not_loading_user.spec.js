const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('All product images should load for user', () => {
    $('#signin').click();
    $('#username input').setValue(browser.config.accounts[2].username + '\n');
    $('#password input').setValue(browser.config.accounts[2].password + '\n');
    $('#login-btn').click();
    expect($('.username')).toHaveText('image_not_loading_user');

    all_images = $$("div.shelf-item__thumb img").map(function(element){
      return element.getAttribute("src")
    });

    expectChai(_.every(all_images,  function (value) {
      return (!_.isEqual(value,'') )
    })).to.equal(true, "All images are not loaded");
  })
})
