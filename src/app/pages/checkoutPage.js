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

  async enterFirstName(firstName) {
    await this.firstNameInput.setValue(firstName);
  }

  async enterLastName(lastName) {
    await this.lastNameInput.setValue(lastName);
  }

  async enterAddressLine1(addressLine1) {
    await this.addressLine1Input.setValue(addressLine1);
  }

  async enterProvince(province) {
    await this.provinceInput.setValue(province);
  }

  async enterPostCode(postCode) {
    await this.postCodeInput.setValue(postCode);
  }

  async clickSubmit() {
    await this.checkoutShippingContinue.click();
  }

  open() {
    return super.open('');
  }
}

module.exports = new CheckoutPage();
