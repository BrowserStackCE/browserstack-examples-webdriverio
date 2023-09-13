const items = require('../../../../resources/data/login_cases.json')
const accounts = require('../../../../resources/data/user.json')

describe('Password input validation', function () {
  items.forEach((item) => {

    beforeEach('Open StackDemo', () => {
      browser.url('');
    })

    afterEach('clear sessionstorage', () => {
      browser.execute(() => sessionStorage.clear())
    })

    it(`Login should not be successful for account with username ''`, async () => {
      await $('#signin').click();
      await $('#username input').setValue(item.username + '\n');
      await $('#password input').setValue(item.password + '\n');
      await $('#login-btn').click();

      expect($('.api-error')).toHaveText(item.expected_message);
    });
  })
});
