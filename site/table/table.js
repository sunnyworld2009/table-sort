const _ = require("lodash");

module.exports = class Model {
  constructor() {
    console.log("created Model");
    this.observers = [];
    // All data of the model should be stored here
    this.state = {
      currencies: [],
      averageValues: [{usdeur:[3,7,510]},{jpyeur:[2,6,5]}]
    }
  }
  // Attach the observer to model
  Attach (Observer){
      this.observers.push(Observer);
  }

  Notify (){
      for(var i in this.observers){
          this.observers[i].Update(this);
      }
  }

  GetState() {
    return this.state;
  }

  addCurrencyPair(data) {
    //console.log(typeof data.body);
    if(typeof data.body === 'string') {
      const updatedData = JSON.parse(data.body);
      //console.log(updatedData);
      // Check if this newly received data is already in our model or not
      const index = _.findIndex(this.state.currencies, {'name' : updatedData.name});
      this.Notify();
      if (-1 === index) {
        this.state.currencies.push(updatedData);
      } else {
        this.state.currencies[index] = updatedData;
      }
      console.log(this.state.currencies);
    }

  }
}
