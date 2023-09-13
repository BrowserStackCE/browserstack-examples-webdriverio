const accounts = require('../../../../resources/data/user.json')

describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it(`Login sholud not be successful for account with username 'locked_user'`, async function() {
    await $('#signin').click();
    await $('#username input').setValue(accounts[1].username + '\n');
    await $('#password input').setValue(accounts[1].password + '\n');
    await $('#login-btn').click();

      expect($('.api-error')).toHaveText('Your account has been locked.');
  });
})
