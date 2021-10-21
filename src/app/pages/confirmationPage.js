const Page = require('./basePage');
/**
 * sub page containing specific selectors and methods for a specific page
 */
class ConfirmationPage extends Page {
  /**
   * define selectors using getter methods
   */
  get confirmationMessage() {
    return $('#confirmation-message')
  }

  get continueShoppingButton() {
    return $('div.continueButtonContainer button')
  }

  async clickContinueShoppingButton() {
    await (await this.continueShoppingButton).click();
  }

  async waitForConfirmationToBeDisplayed() {
    await (await this.confirmationMessage).waitForDisplayed({ timeout: 5000 });
  }

}

module.exports = new ConfirmationPage();
