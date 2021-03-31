const Page = require('./basePage');
require('./signInPage');
let phoneName = '';
/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  get signInLink() {
    return $('#signin')
  }

  get ordersLink() {
    return $('#orders')
  }

  get ordersLink() {
    return $('#orders')
  }

  get iPhoneXSElement() {
    return $("//p[text() = 'iPhone XS']/../div[@class = 'shelf-item__buy-btn']")
  }

  get phonesBuyButton() {
    return $("//p[text() = '" + phoneName + "']/../div[@class = 'shelf-item__buy-btn']")
  }

  get cartCloseButton() {
    return $('.float-cart__close-btn')
  }

  get buyButton() {
    return $('.buy-btn')
  }

  navigateToSignIn() {
    this.signInLink.click();
  }

  navigateToOrders() {
    this.ordersLink.click();
  }

  selectPhone(phoneToSelect) {
    phoneName = phoneToSelect;
    this.phonesBuyButton.click();
  }

  closeCartModal() {
    this.cartCloseButton.click();
  }

  clickBuyButton() {
    this.buyButton.waitForClickable({ timeout: 5000 });
    this.buyButton.click();
  }

  open() {
    return super.open('');
  }
}

module.exports = new HomePage();
