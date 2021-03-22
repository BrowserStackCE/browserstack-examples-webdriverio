var fs = require('fs');
describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('login should be successful', function() {
    describe('login should be successful for all data set', function() {
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
})
