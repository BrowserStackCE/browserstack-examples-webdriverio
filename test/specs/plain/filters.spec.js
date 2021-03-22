const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo filters', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Lowest to Highest filter is applied', () => {
    $('.sort select').selectByAttribute('value', 'lowestprice');
    browser.waitUntil(
      () => $("//*[@class = 'shelf-item__title'][1]").getText() === 'Pixel 2',
      {
          timeout: 5000,
          timeoutMsg: 'expected filtering to happen within 5s'
      }
    );
    all_prices = $$(".val > b").map(function(element){
      return parseInt(element.getText())
    });
    expectChai(_.isEqual(all_prices, _.orderBy(all_prices, [], ['asc']))).to.equal(true, "Lowest to Highest filter is not applied");
  })

  it('Apply vendor filter', () => {
    $("//span[contains(text(), 'Apple')]").click();
    $("//span[contains(text(), 'Samsung')]").click();
    browser.pause(5000)                                               // Example for static wait
    all_phones = $$(".shelf-item__title").map(function(element){
      return element.getText()
    });
    expectChai(_.every(all_phones,  function (value) {
      return (_.includes(value, 'iPhone') || _.includes(value, 'Galaxy'))
    })).to.equal(true, "Vendor filter is not applied");
  })
})
