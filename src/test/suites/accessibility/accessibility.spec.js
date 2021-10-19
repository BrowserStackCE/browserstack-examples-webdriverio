const AxeBuilder = require('@axe-core/webdriverio').default;
const expectChai = require('chai').expect;
describe('Accessibility test', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Performs accessibility tests', async() => {
    const builder = new AxeBuilder({ client: browser });
    
    //const builder = new AxeBuilder({ client: browser }).withRules([])
    // this can be used to run the accessibility tests using a specific set of accessibility rules
    //const builder = new AxeBuilder({ client: browser }).withTags([]) 
    // this can be used to run the accessibility tests on a specific tag instead of full page
    
    const results = await builder.analyze();
    violations = results.violations;
    expectChai(violations).to.deep.equal([]);
  });
});
