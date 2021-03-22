describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('account with favourites should see 5 items', () => {
    $('#signin').click();
    $('#username input').setValue('fav_user\n');
    $('#password input').setValue('testingisfun99\n');
    $('#login-btn').click();

    $('#favourites').click();

    browser.waitUntil(() => {
      let pageUrl = browser.getUrl();
      return pageUrl.indexOf('favourites') > -1
    }, 5000)

    expect($$('.shelf-item')).toHaveLength(5);
  })

  it('logged in user should be able to add favourite', () => {
    $('#signin').click();
    $('#username input').setValue('existing_orders_user\n');
    $('#password input').setValue('testingisfun99\n');
    $('#login-btn').click();

    $("//p[text() = 'iPhone 12']/../div/button").waitForDisplayed({ timeout: 5000 });
    $("//p[text() = 'iPhone 12']/../div/button").click();

    $('#favourites').click();

    browser.waitUntil(() => {
      let pageUrl = browser.getUrl();
      return pageUrl.indexOf('favourites') > -1
    }, 5000)
    browser.pause(5000)
    expect($$('p.shelf-item__title')).toHaveTextContaining('iPhone 12');
  })
})
