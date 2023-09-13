const Page = require('./basePage');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OrdersPage extends Page {
  /**
   * define selectors using getter methods
   */
  get allOrders() {
    return $$('.order')
    
  }

  get firstOrder() {
    return $('.order')
  }

  async waitforOrdersToDisplay() {
    await this.firstOrder.waitForDisplayed({ timeout: 5000 });
  }
}

module.exports = new OrdersPage();
