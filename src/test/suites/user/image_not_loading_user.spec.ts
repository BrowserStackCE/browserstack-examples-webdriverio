import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('All product images should load for user', () => {
    $('#signin').click();
    $('#username input').setValue(accounts[2].username + '\n');
    $('#password input').setValue(accounts[2].password + '\n');
    $('#login-btn').click();
    expect($('.username').getText()).to.equal('image_not_loading_user');

    const all_images = $$("div.shelf-item__thumb img").map(function (element) {
      return element.getAttribute("src")
    });

    expect(all_images.filter(x => x === '').length).to.equal(0, 'One or more images for this user has not loaded.');
  })
})
