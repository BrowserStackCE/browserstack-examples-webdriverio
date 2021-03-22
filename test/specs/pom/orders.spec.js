const HomePage = require('../../pageobjects/homePage');
const SignInPage = require('../../pageobjects/signInPage');
const CheckoutPage = require('../../pageobjects/checkoutPage');
const ConfirmationPage = require('../../pageobjects/confirmationPage');
const checkoutPage = require('../../pageobjects/checkoutPage');
const OrdersPage = require('../../pageobjects/ordersPage');

describe('Order a product', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Login and order a product', () => {
    HomePage.navigateToSignIn();

    SignInPage.login('fav_user\n', 'testingisfun99\n');
    expect(SignInPage.getSignedInUsername()).toHaveText('fav_user');

    HomePage.selectPhone('iPhone XS');
    HomePage.closeCartModal();
    HomePage.selectPhone('Galaxy S20');
    HomePage.clickBuyButton();

    CheckoutPage.enterFirstName('firstname');
    CheckoutPage.enterLastName('lastname');
    CheckoutPage.enterAddressLine1('address');
    CheckoutPage.enterProvince('state');
    CheckoutPage.enterPostCode('12345');
    CheckoutPage.clickSubmit();

    ConfirmationPage.waitForConfirmationToBeDisplayed();
    expect(ConfirmationPage.confirmationMessage).toHaveText('Your Order has been successfully placed.');
    ConfirmationPage.clickContinueShoppingButton();
    
    HomePage.navigateToOrders();
    OrdersPage.waitforOrdersToDisplay();
    expect(OrdersPage.allOrders).toHaveLength(1);
  })
})

