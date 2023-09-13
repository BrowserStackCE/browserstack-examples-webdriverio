const accounts = require('../../../../resources/data/user.json')

describe('StackDemo login', () => {

    beforeEach('Open StackDemo', () => {
      browser.url('');
    })

    afterEach('clear sessionstorage', () => {
      browser.execute(() => sessionStorage.clear())
    })

    it(`Login sholud be successful for account with username 'existing_orders_user'`, async function() {
      await $('#signin').click();
      await $('#username input').setValue(accounts[2].username + '\n');
      await $('#password input').setValue(accounts[2].password + '\n');
      await $('#login-btn').click();

        expect(await $('.username')).toHaveText(accounts[2].username);
        await $('#logout').click();
    });
})
