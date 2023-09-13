const accounts = require('../../../../resources/data/user.json')

describe('StackDemo Offers', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Check offers for India', async () => {
    await $('#signin').click();
    await $('#username input').setValue(accounts[0].username + '\n');
    await $('#password input').setValue(accounts[0].password + '\n');
    await $('#login-btn').click();

    await browser.execute(function() {
      window.navigator.geolocation.getCurrentPosition = function(success) {
        var position = { coords : { latitude: "1", longitude: "103" } }; 
        success(position);
      }
    });
    await $('#offers').click();

    await $(".offer").waitForDisplayed({ timeout: 5000 });
    expect(await $$('.offer')).toHaveLength(3);
  })
})
