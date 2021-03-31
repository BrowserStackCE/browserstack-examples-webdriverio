describe('StackDemo login', () => {

    beforeEach('Open StackDemo', () => {
      browser.url('');
    })

    afterEach('clear sessionstorage', () => {
      browser.execute(() => sessionStorage.clear())
    })

    it(`Login sholud be successful for account with username 'existing_orders_user'`, function() {
        $('#signin').click();
        $('#username input').setValue(browser.config.accounts[2].username + '\n');
        $('#password input').setValue(browser.config.accounts[2].password + '\n');
        $('#login-btn').click();

        expect($('.username')).toHaveText(browser.config.accounts[2].username);
        $('#logout').click();
    });
})
