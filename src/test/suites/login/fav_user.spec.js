describe('StackDemo login', () => {

    beforeEach('Open StackDemo', () => {
      browser.url('');
    })

    afterEach('clear sessionstorage', () => {
      browser.execute(() => sessionStorage.clear())
    })

    it(`Login sholud be successful for account with username 'fav_user'`, function() {
        $('#signin').click();
        $('#username input').setValue(browser.config.accounts[0].username + '\n');
        $('#password input').setValue(browser.config.accounts[0].password + '\n');
        $('#login-btn').click();

        expect($('.username')).toHaveText(browser.config.accounts[0].username);
        $('#logout').click();
    });
})
