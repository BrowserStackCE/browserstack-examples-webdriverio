describe('StackDemo login', () => {

    beforeEach('Open StackDemo', () => {
      browser.url('');
    })

    afterEach('clear sessionstorage', () => {
      browser.execute(() => sessionStorage.clear())
    })

    it(`Login sholud be successful for account with username 'fav_user'`, function() {
        $('#signin').click();
        $('#username input').setValue(testData[0].split(',')[0] + '\n');
        $('#password input').setValue(testData[0].split(',')[1] + '\n');
        $('#login-btn').click();

        expect($('.username')).toHaveText(testData[0].split(',')[0]);
        $('#logout').click();
    });
})
