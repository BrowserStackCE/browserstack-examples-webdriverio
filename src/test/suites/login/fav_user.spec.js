describe('StackDemo login', () => {

    beforeEach('Open StackDemo', () => {
      browser.url('');
    })

    afterEach('clear sessionstorage', () => {
      browser.execute(() => sessionStorage.clear())
    })

    it(`Login sholud be successful for account with username 'fav_user'`, async function() {
        await (await $('#signin')).click();
        await (await $('#username input')).setValue(browser.config.accounts[0].username + '\n');
        await (await $('#password input')).setValue(browser.config.accounts[0].password + '\n');
        await (await $('#login-btn')).click();

        expect(await $('.username')).toHaveText(browser.config.accounts[0].username);
        await (await $('#logout')).click();
    });
})
