describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('login should be successful', function() {
    describe('login should be successful for all data set', function() {
        beforeEach('Open StackDemo', () => {
          browser.url('');
        })
      
        afterEach('clear sessionstorage', () => {
          browser.execute(() => sessionStorage.clear())
        })
        testData.forEach(function(val, index) {
          it(`login sholud be successful for account with username '${ val.split(',')[0] }'`, function() {
              console.log("login sholud be successful for account with username " + val.split(',')[0])
              $('#signin').click();
              $('#username input').setValue(val.split(',')[0] + '\n');
              $('#password input').setValue(val.split(',')[1] + '\n');
              $('#login-btn').click();
        
              expect($('.username')).toHaveText(val.split(',')[0]);

              $('#logout').click();
          });
        });
    }); 
  });

  it('locked account should see error message', () => {
    $('#signin').click();
    $('#username input').setValue(testData[3].split(',')[0] + '\n');
    $('#password input').setValue(testData[3].split(',')[1] + '\n');
    $('#login-btn').click();
    
    expect($('.api-error')).toHaveText('Your account has been locked.');
  })

  it('Navigated to login on clicking favourites Nav Item', () => {
    $('#favourites').click();
    
    browser.waitUntil(() => {
      let pageUrl = browser.getUrl();
      return pageUrl.indexOf('signin?favourites=true') > -1
    }, 5000)
  })

})
