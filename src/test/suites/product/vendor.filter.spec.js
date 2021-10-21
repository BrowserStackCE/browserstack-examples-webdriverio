const expectChai = require('chai').expect;

describe('StackDemo filters', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Apply vendor filter', async () => {
    await (await $("input[value='Apple'] + span")).click();
    await browser.pause(1000)                                               // Example for static wait
    all_phones = await (await $$(".shelf-item__title")).map(async function(element){
      return (await (await element).getText());
    });
    for (let value of all_phones.values()){
      const phone_name = await value;
      expectChai(phone_name.includes('iPhone')).to.equal(true, "Vendor filter is not applied");
    }
  })
})
