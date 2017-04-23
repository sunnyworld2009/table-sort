module.exports = class {
  constructor() {
    console.log("observer created");
    this.observerState = [];
    this.currency = null;
  }

  Update(Subject) {
    this.observerState = Subject.GetState();
    // Append rows in the table
    // There is a chance for enhancement if we seperate out render in a Grid class
    this.renderGrid();
  }

  renderGrid() {
    // console.log(this.observerState);
    let table =document.getElementById("tableBody");
    this.addRows();
    this.observerState.currencies.forEach((currency) => {
       //console.log(currency);
      for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        if(row.getAttribute("id") === currency.name) {
          // console.log(row);

          row.cells[0].innerHTML = currency.name;
          row.cells[1].innerHTML = currency.openBid;
          row.cells[2].innerHTML = currency.openAsk;
          row.cells[3].innerHTML = currency.lastChangeAsk;
          row.cells[4].innerHTML = currency.lastChangeBid;
        }
      }
    });
  }

  addRows() {
    console.log("latestCurrency currency",this.observerState.latestCurrency);
    let currency = this.observerState.latestCurrency;
    let toBeAdded = true;
    let table =document.getElementById("tableBody");
    for (var i = 0, row; row = table.rows[i]; i++) {
      if( !!currency && row.getAttribute("id") === currency.name) {
        toBeAdded = false;
      }
    }
    if(toBeAdded && !!currency) {
      let row = table.insertRow(0);
      row.id = currency.name;
      var cell1 =row.insertCell(0);
      cell1.innerHTML = currency.name;
      var cell2 =row.insertCell(1);
      cell2.innerHTML = currency.openBid;
      var cell3 =row.insertCell(2);
      cell3.innerHTML = currency.openAsk;
      var cell4 =row.insertCell(3);
      cell4.innerHTML = currency.lastChangeAsk;
      var cell5 =row.insertCell(4);
      cell5.innerHTML = currency.lastChangeBid;
    }
  }
}
