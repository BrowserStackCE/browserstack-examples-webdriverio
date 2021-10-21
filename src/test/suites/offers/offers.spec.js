describe('StackDemo Offers', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Check offers for India', async () => {
    await (await $('#signin')).click();
    await (await $('#username input')).setValue(browser.config.accounts[0].username + '\n');
    await (await $('#password input')).setValue(browser.config.accounts[0].password + '\n');
    await (await $('#login-btn')).click();

    browser.execute(async function() {
        window.navigator.geolocation.getCurrentPosition = async function(success) {
        var position = { coords : { latitude: "1", longitude: "103" } }; 
        success(position);
      }
    });
    await (await $('#offers')).click();

    await (await $(".offer")).waitForDisplayed({ timeout: 5000 });
    expect(await $$('.offer')).toHaveLength(3);
  })
})
