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

  it('All product images should load for user', async () => {
    await $('#signin').click();
    await $('#username input').setValue(accounts[2].username + '\n');
    await $('#password input').setValue(accounts[2].password + '\n');
    await $('#login-btn').click();
    expect($('.username')).toHaveText('image_not_loading_user');

    all_images = await $$("div.shelf-item__thumb img").map(function(element){
      return element.getAttribute("src")
    });

    expectChai(_.every(all_images,  function (value) {
      return (_.isEqual(value,'') )
    })).to.equal(true, "All images are not loaded");
  })
})
