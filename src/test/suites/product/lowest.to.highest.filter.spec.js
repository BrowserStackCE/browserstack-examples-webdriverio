const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo filters', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Lowest to Highest filter is applied', async () => {
    await $('.sort select').selectByAttribute('value', 'lowestprice');
    await browser.waitUntil(
      () => $("//*[@class = 'shelf-item__title'][1]").getText() === 'Pixel 2',
      {
          timeout: 5000,
          timeoutMsg: 'expected filtering to happen within 5s'
      }
    );
    all_prices = await $$(".val > b").map(function(element){
      return parseInt(element.getText())
    });
    expectChai(_.isEqual(all_prices, _.orderBy(all_prices, [], ['asc']))).to.equal(true, "Lowest to Highest filter is not applied");
  })
})
