describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Navigated to login on clicking favourites Nav Item', () => {
    $('#favourites').click();
    
    browser.waitUntil(() => {
      let pageUrl = browser.getUrl();
      return pageUrl.indexOf('signin?favourites=true') > -1
    }, 5000)
  })

})
