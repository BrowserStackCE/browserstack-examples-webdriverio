const _ = require('lodash');
const expectChai = require('chai').expect;
const accounts = require('../../../../resources/data/user.json')

describe('StackDemo login', () => {

    beforeEach('Open StackDemo', () => {
      browser.url('');
    })

    afterEach('clear sessionstorage', () => {
      browser.execute(() => sessionStorage.clear())
    })

    it(`Login should be successful for account with username 'image_not_loading_user'`, async function() {
      await $('#signin').click();
      await $('#username input').setValue(accounts[2].username + '\n');
      await $('#password input').setValue(accounts[2].password + '\n');
      await $('#login-btn').click();

        expect($('.username')).toHaveText(accounts[2].username);
        await $('#logout').click();
    });
})
