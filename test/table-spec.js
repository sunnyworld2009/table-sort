
const tableModel = require('../site/table/table');

describe('live currenypairs change', () => {    //Main Application suite

  describe('should add currency pairs in state', () => {

    it('should check if state is defined and is an object', () => {   //spec 1: Check if state is defined and is an object
        let tableModelObj = new tableModel();
        let state = tableModelObj.GetState();
        expect(state).toBeDefined();
        expect(state).toEqual({
          currencies: [],
          latestCurrency: null,
          sparklineObject: {}
        });
    });

    it('should update state with apiData', () => {     //spec 1: Check if state updates with apiData
        let apiData = {
          name: "gbpeur",
          bestBid: 1.2916442438116895,
          bestAsk: 1.2921409356688505,
          openBid: 1.2643718626560676,
          openAsk: 1.3116281373439324
        };
        let tableModelObj = new tableModel();
        let state = tableModelObj.GetState();
        expect(state.currencies.length).toBe(0);
        expect(state.latestCurrency).toBe(null);
        tableModelObj.addCurrencyPair(apiData);
        let newState = tableModelObj.GetState();
        expect(newState.currencies.length).toBe(1);
        expect(newState.latestCurrency).toEqual(apiData);
    });

  });

});
