describe('StackDemo Offers', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Check offers for India', () => {
    $('#signin').click();
    $('#username input').setValue(browser.config.accounts[0].username + '\n');
    $('#password input').setValue(browser.config.accounts[0].password + '\n');
    $('#login-btn').click();

    browser.execute(function() {
      window.navigator.geolocation.getCurrentPosition = function(success) {
        var position = { coords : { latitude: "1", longitude: "103" } }; 
        success(position);
      }
    });
    $('#offers').click();

    $(".offer").waitForDisplayed({ timeout: 5000 });
    expect($$('.offer')).toHaveLength(3);
  })
})
