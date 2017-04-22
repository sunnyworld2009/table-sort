const _ = require("lodash");

module.exports = class Model {
  constructor() {
    console.log("created Model");
    this.currencies =[];
    // For now just running this algorithm in my mind, Dont bother
    this.averageValueArr = [{usdeur:[3,7,510]},{jpyeur:[2,6,5]}]
  }
  // Attach the observer to model
  attach() {

  }

  addCurrencyPair(data) {
    //console.log(typeof data.body);
    if(typeof data.body === 'string') {
      const updatedData = JSON.parse(data.body);
      //console.log(updatedData);
      // Check if this newly received data is already in our model or not
      const index = _.findIndex(this.currencies, {'name' : updatedData.name});
      if (-1 === index) {
        this.currencies.push(updatedData);
      } else {
        this.currencies[index] = updatedData;
      }
      console.log(this.currencies);
    }

  }
}
