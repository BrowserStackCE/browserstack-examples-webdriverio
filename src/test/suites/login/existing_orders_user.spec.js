describe('StackDemo login', () => {

    beforeEach('Open StackDemo', () => {
      browser.url('');
    })

    afterEach('clear sessionstorage', () => {
      browser.execute(() => sessionStorage.clear())
    })

    it(`Login sholud be successful for account with username 'existing_orders_user'`, function() {
        $('#signin').click();
        $('#username input').setValue(testData[2].split(',')[0] + '\n');
        $('#password input').setValue(testData[2].split(',')[1] + '\n');
        $('#login-btn').click();

        expect($('.username')).toHaveText(testData[2].split(',')[0]);
        $('#logout').click();
    });
})
