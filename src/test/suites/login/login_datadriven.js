const items = require('../../../../resources/data/login_cases.json')

describe('Password input validation', function () {
  items.forEach((item) => {

    beforeEach('Open StackDemo', () => {
      browser.url('');
    })

    afterEach('clear sessionstorage', () => {
      browser.execute(() => sessionStorage.clear())
    })

    it(`Login should not be successful for account with username ''`, async () => {
      await (await $('#signin')).click();
      await (await $('#username input')).setValue(item.username + '\n');
      await (await $('#password input')).setValue(item.password + '\n');
      await (await $('#login-btn')).click();

      expect(await $('.api-error')).toHaveText(item.expected_message);
    });
  })
});
