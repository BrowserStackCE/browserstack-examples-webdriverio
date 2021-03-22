const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('locked account should see error message', () => {
    $('#signin').click();
    $('#username input').setValue('locked_user\n');
    $('#password input').setValue('testingisfun99\n');
    $('#login-btn').click();
    expect($('.api-error')).toHaveText('Your account has been locked.');
  })

  it('valid account should see username', () => {
    $('#signin').click();
    $('#username input').setValue('fav_user\n');
    $('#password input').setValue('testingisfun99\n');
    $('#login-btn').click();
    expect($('.username')).toHaveText('fav_user');
  })

  it('Login with user for which images doesnt load', () => {
    $('#signin').click();
    $('#username input').setValue('image_not_loading_user\n');
    $('#password input').setValue('testingisfun99\n');
    $('#login-btn').click();
    expect($('.username')).toHaveText('image_not_loading_user');

    all_images = $$("div.shelf-item__thumb img").map(function(element){
      return element.getAttribute("src")
    });

    expectChai(_.every(all_images,  function (value) {
      return (_.isEqual(value,'') )
    })).to.equal(true, "All images are not broken");
  })

  it('invalid password should see error message', () => {
    $('#signin').click();
    $('#username input').setValue('fav_user\n');
    $('#password input').setValue('wrongpass\n');
    $('#login-btn').click();
    expect($('.api-error')).toHaveText('Invalid Password');
  })

  it('Login with user having existing orders', () => {
    $('#signin').click();
    $('#username input').setValue('existing_orders_user\n');
    $('#password input').setValue('testingisfun99\n');
    $('#login-btn').click();
    expect($('.username')).toHaveText('existing_orders_user');

    $('#orders').click();
    $(".order").waitForDisplayed({ timeout: 5000 });
    expect($$('.order')).toHaveLength(5);
  })
})
