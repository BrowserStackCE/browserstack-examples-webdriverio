const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo filters', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Apply vendor filter', async () => {
    await $("input[value='Apple'] + span").click();
    await browser.pause(5000)                                               // Example for static wait
    all_phones = await $$(".shelf-item__title").map(function(element){
      return element.getText()
    });
    expectChai(_.every(all_phones,  function (value) {
      return (_.includes(value, 'iPhone'))
    })).to.equal(true, "Vendor filter is not applied");
  })
})
