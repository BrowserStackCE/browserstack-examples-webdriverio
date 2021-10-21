const expectChai = require('chai').expect;

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('All product images should load for user', async () => {
    await (await $('#signin')).click();
    await (await $('#username input')).setValue(browser.config.accounts[2].username + '\n');
    await (await $('#password input')).setValue(browser.config.accounts[2].password + '\n');
    await (await $('#login-btn')).click();
    expect(await (await $('.username'))).toHaveText('image_not_loading_user');

    all_images = await (await $$("div.shelf-item__thumb img")).map(async function(element){
      return (await (await element).getAttribute("src"));
    });
    for (let value of all_images.values()){
      const image_name = await value;
      expectChai(!image_name.isEqual('')).to.equal(true, "All images are not loaded");
    }
  })
})
