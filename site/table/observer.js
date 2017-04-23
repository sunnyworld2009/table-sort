module.exports = class {
  constructor() {
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
    const table =document.getElementById("tableBody");
    this.addRows();
    let currentPosition = null;
    let rowToBeUpdated = null;
    this.observerState.currencies.forEach((currency) => {
       //console.log(currency);
     for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        if(row.getAttribute("id") === currency.name) {
          // console.log(row);
          rowToBeUpdated = i;

          row.cells[0].innerHTML = currency.name;
          row.cells[1].innerHTML = currency.openBid;
          row.cells[2].innerHTML = currency.openAsk;
          row.cells[3].innerHTML = currency.lastChangeAsk;
          row.cells[4].innerHTML = currency.lastChangeBid;

          let dupNode = !!rowToBeUpdated && table.rows[rowToBeUpdated].cloneNode(true);
          if(!!dupNode) {
            let pos = this.getSortedPosition(table, currency.lastChangeBid);
            if(pos === -1) {
              table.appendChild(row);
            } else {
              table.insertBefore(row, table.rows[pos]);
            }
          }
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
    const lastChangeBid = !!currency && currency.lastChangeBid;
    let pos = this.getSortedPosition(table, lastChangeBid);
    console.log("sorted position is" + pos);
    if(toBeAdded && !!currency) {
      const row = document.createElement("tr");
      // let row = table.insertRow(0);
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

      if(pos === -1) {
        table.appendChild(row);
      } else {
        table.insertBefore(row, table.rows[pos]);
      }
    }
  }

  getSortedPosition(table, lastChangeBid) {
    debugger;
    let returnPos = -1;
    for (var i = 0, row; row = table.rows[i]; i++) {
      const tableLastChanged = row.cells[4].innerHTML;
      // console.log("the last changed bid is", tableLastChanged);
      if(lastChangeBid > tableLastChanged) {
        return i;
      }
    }
    return returnPos;
  }

  insertAfter(newElement,targetElement) {
    // target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    // if the parents lastchild is the targetElement...
    if (parent.lastChild == targetElement) {
        // add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
  }
}
