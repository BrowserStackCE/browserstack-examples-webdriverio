describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it(`Login sholud not be successful for account with username 'locked_user'`, function() {
      $('#signin').click();
      $('#username input').setValue(testData[3].split(',')[0] + '\n');
      $('#password input').setValue(testData[3].split(',')[1] + '\n');
      $('#login-btn').click();

      expect($('.api-error')).toHaveText('Your account has been locked.');
  });
})
