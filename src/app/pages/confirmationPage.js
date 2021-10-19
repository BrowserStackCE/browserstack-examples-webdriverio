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

  get downloadPDFLink() {
    return $('#downloadpdf');
  }

  clickContinueShoppingButton() {
    this.continueShoppingButton.click();
  }

  waitForConfirmationToBeDisplayed() {
    this.confirmationMessage.waitForDisplayed({ timeout: 5000 });
  }

  clickDownloadPdf() {
    this.downloadPDFLink.click();
  }

  downloadedFileExists(browser, fileName) {
    browser.pause(2000);
    const fileExists = browser.executeScript('browserstack_executor: {"action": "fileExists", "arguments": {"fileName": "'+ fileName + '"}}');
    expect(fileExists).toEqual(true);
  }

}

module.exports = new ConfirmationPage();
