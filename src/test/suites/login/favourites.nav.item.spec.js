const accounts = require('../../../../resources/data/user.json')
describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Navigated to login on clicking favourites Nav Item', async () => {
    await $('#favourites').click();
    
    await browser.waitUntil(async () => {
      let pageUrl = await browser.getUrl();
      return pageUrl.indexOf('signin?favourites=true') > -1
    }, 5000)
  })

})
