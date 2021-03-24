describe('Order a product', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('http://localhost:3000/');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Login and order a product', () => {
    $('#signin').click();
    $('#username input').setValue('fav_user\n');
    $('#password input').setValue('testingisfun99\n');
    $('#login-btn').click();
    expect($('.username')).toHaveText('fav_user');

    $("//p[text() = 'iPhone XS']/../div[@class = 'shelf-item__buy-btn']").click();
    $(".float-cart__close-btn").click();

    $("//p[text() = 'Galaxy S20']/../div[@class = 'shelf-item__buy-btn']").click();
    $(".buy-btn").waitForClickable({ timeout: 5000 });
    $(".buy-btn").click();

    $("#firstNameInput").setValue("firstname");
    $("#lastNameInput").setValue("lastname");
    $("#addressLine1Input").setValue("address");
    $("#provinceInput").setValue("state");
    $("#postCodeInput").setValue("12345");
    $("#checkout-shipping-continue").click();

    $("#confirmation-message").waitForDisplayed({ timeout: 5000 });
    expect($('#confirmation-message')).toHaveText('Your Order has been successfully placed.');
    $("div.continueButtonContainer button").click();
    
    $('#orders').click();
    $(".order").waitForDisplayed({ timeout: 5000 });
    expect($$('.order')).toHaveLength(1);
  })
})
