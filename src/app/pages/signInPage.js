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

  async login(username, password) {
    await this.inputUsername.setValue(username + '\n');
    await this.inputPassword.setValue(password + '\n');
    await this.btnSubmit.click();
  }

  getSignedInUsername() {
    return this.signedInUsername;
  }


}

module.exports = new SignInPage();
