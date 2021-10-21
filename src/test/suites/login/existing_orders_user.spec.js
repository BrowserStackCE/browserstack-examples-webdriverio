describe('StackDemo login', () => {

    beforeEach('Open StackDemo', () => {
      browser.url('');
    })

    afterEach('clear sessionstorage', () => {
      browser.execute(() => sessionStorage.clear())
    })

    it(`Login sholud be successful for account with username 'existing_orders_user'`, async function() {
        await (await $('#signin')).click();
        await (await $('#username input')).setValue(browser.config.accounts[2].username + '\n');
        await (await $('#password input')).setValue(browser.config.accounts[2].password + '\n');
        await (await $('#login-btn')).click();

        expect(await $('.username')).toHaveText(browser.config.accounts[2].username);
        await (await $('#logout')).click();
    });
})
