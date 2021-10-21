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

  it('Login and order a product', async () => {
    await HomePage.navigateToSignIn();
    await SignInPage.login(browser.config.accounts[0].username, browser.config.accounts[0].password);
    expect(await SignInPage.getSignedInUsername()).toHaveText(browser.config.accounts[0].username);

    await HomePage.selectPhone('iPhone XS');
    await HomePage.closeCartModal();
    await HomePage.selectPhone('Galaxy S20');
    await HomePage.clickBuyButton();

    await CheckoutPage.enterFirstName('firstname');
    await CheckoutPage.enterLastName('lastname');
    await CheckoutPage.enterAddressLine1('address');
    await CheckoutPage.enterProvince('state');
    await CheckoutPage.enterPostCode('12345');
    await CheckoutPage.clickSubmit();

    await ConfirmationPage.waitForConfirmationToBeDisplayed();
    expect(await ConfirmationPage.confirmationMessage).toHaveText('Your Order has been successfully placed.');
    await ConfirmationPage.clickContinueShoppingButton();
    
    await HomePage.navigateToOrders();
    await OrdersPage.waitforOrdersToDisplay();
    expect(await OrdersPage.allOrders).toHaveLength(1);
  })
})

