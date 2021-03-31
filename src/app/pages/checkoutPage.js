const Page = require('./basePage');
/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutPage extends Page {
  /**
   * define selectors using getter methods
   */
  get firstNameInput() {
    return $('#firstNameInput')
  }

  get lastNameInput() {
    return $('#lastNameInput')
  }

  get addressLine1Input() {
    return $('#addressLine1Input')
  }

  get provinceInput() {
    return $('#provinceInput')
  }

  get postCodeInput() {
    return $('#postCodeInput')
  }

  get checkoutShippingContinue() {
    return $('#checkout-shipping-continue')
  }

  enterFirstName(firstName) {
    this.firstNameInput.setValue(firstName);
  }

  enterLastName(lastName) {
    this.lastNameInput.setValue(lastName);
  }

  enterAddressLine1(addressLine1) {
    this.addressLine1Input.setValue(addressLine1);
  }

  enterProvince(province) {
    this.provinceInput.setValue(province);
  }

  enterPostCode(postCode) {
    this.postCodeInput.setValue(postCode);
  }

  clickSubmit() {
    this.checkoutShippingContinue.click();
  }

  open() {
    return super.open('');
  }
}

module.exports = new CheckoutPage();
