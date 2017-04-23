const _ = require("lodash");

module.exports = class {
  constructor() {
    console.log("created Model");
    this.observers = [];
    // All data of the model should be stored here
    this.state = {
      currencies: [],
      sparklineObject: {},
      latestCurrency: null,
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
    if(_.isObject(data)) {
      const updatedData = data;
      //console.log(updatedData);
      // Check if this newly received data is already in our model or not
      const index = _.findIndex(this.state.currencies, {'name' : updatedData.name});
      this.Notify();
      if (-1 === index) {
        this.state.currencies.push(updatedData);
        this.state.latestCurrency = updatedData;
      } else {
        this.state.currencies[index] = updatedData;
      }
      this.addToSparkline(updatedData);
      // console.log(this.state.currencies);
    }
  }

  addToSparkline(updatedData) {
    // console.log(updatedData.bestBid);
    // console.log(updatedData.beskAsk);
    const meanValue = (parseFloat(updatedData.bestBid) + parseFloat(updatedData.bestAsk)) / 2;
    if(!_.has(this.state.sparklineObject, updatedData.name)) {
      this.state.sparklineObject[updatedData.name] = [meanValue];
    } else {
      this.state.sparklineObject[updatedData.name].push(meanValue);
    }
  }

  clearSparkLine() {
    Object.keys(this.state.sparklineObject).forEach((key) => {
      this.state.sparklineObject[key] = [];
    });
  }
}
