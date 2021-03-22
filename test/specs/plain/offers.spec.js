describe('StackDemo Offers', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Check offers for India', () => {
    $('#signin').click();
    $('#username input').setValue('fav_user\n');
    $('#password input').setValue('testingisfun99\n');
    $('#login-btn').click();

    $('#offers').click();
    browser.waitUntil(() => {
      let pageUrl = browser.getUrl();
      return pageUrl.indexOf('offers') > -1
    }, 5000)
  })
})
