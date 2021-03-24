const Page = require('./basePage');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SignInPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $('#username input')
  }

  get inputPassword() {
    return $('#password input')
  }

  get btnSubmit() {
    return $('#login-btn')
  }

  get signedInUsername() {
    return $('.username')
  }

  login(username, password) {
    this.inputUsername.setValue(username);
    this.inputPassword.setValue(password);
    this.btnSubmit.click();
  }

  getSignedInUsername() {
    return this.signedInUsername;
  }


}

module.exports = new SignInPage();
