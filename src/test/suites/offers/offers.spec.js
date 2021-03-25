describe('StackDemo Offers', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Check offers for India', () => {
    $('#signin').click();
    $('#username input').setValue(testData[0].split(',')[0] + '\n');
    $('#password input').setValue(testData[0].split(',')[1] + '\n');
    $('#login-btn').click();

    // browser.setGeoLocation({latitude: 1, longitude: 103, altitude: 0});
    browser.execute(function() {
      window.navigator.geolocation.getCurrentPosition = function(success) {
        var position = { coords : { latitude: "40.748440", longitude: "-73.984559" } }; 
        success(position);
      }
    });
    $('#offers').click();

    $(".offer").waitForDisplayed({ timeout: 5000 });
    expect($$('.offer')).toHaveLength(3);
  })
})
