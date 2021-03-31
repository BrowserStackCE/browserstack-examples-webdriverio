const HomePage = require('../../../app/pages/homePage');
const SignInPage = require('../../../app/pages/signInPage');
const CheckoutPage = require('../../../app/pages/checkoutPage');
const ConfirmationPage = require('../../../app/pages/confirmationPage');
const OrdersPage = require('../../../app/pages/ordersPage');

describe('Order a product', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Login and order a product', () => {
    HomePage.navigateToSignIn();
    SignInPage.login(browser.config.accounts[0].username, browser.config.accounts[0].password);
    expect(SignInPage.getSignedInUsername()).toHaveText(browser.config.accounts[0].username);

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

