describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it(`Login sholud not be successful for account with username 'locked_user'`, async function() {
      await (await $('#signin')).click();
      await (await $('#username input')).setValue(browser.config.accounts[1].username + '\n');
      await (await $('#password input')).setValue(browser.config.accounts[1].password + '\n');
      await (await $('#login-btn')).click();

      expect(await $('.api-error')).toHaveText('Your account has been locked.');
  });
})
