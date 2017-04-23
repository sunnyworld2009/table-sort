const _ = require("lodash");
//const sparkline = require("./sparkline");

module.exports = class {
  constructor() {
    this.observerState = [];
    this.currency = null;
    this.subject = null;
    setInterval(() =>{
      this.initiateSparkLine();
    }, 30000);
  }

  Update(Subject) {
    this.observerState = Subject.GetState();
    this.subject = Subject;
    // Append rows in the table
    // There is a chance for enhancement if we seperate out render in a Grid class
    this.renderGrid();
  }

  initiateSparkLine() {
    console.log("I will be called every 30 secs");
    console.log(this.observerState);
    const sparkLineData = this.observerState.sparklineObject;
    const table =document.getElementById("tableBody");

    if(_.isObject(sparkLineData)) {
      Object.keys(sparkLineData).forEach((key) => {
        let data = sparkLineData[key];
        console.log("in sparkline", key, data);

        for (var i = 0, row; row = table.rows[i]; i++) {
          const rowName = row.getAttribute("id");
          if(key == rowName) {
            Sparkline.draw(row.cells[5], data);
          }
        }
      });
      this.subject.clearSparkLine();
    }

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
          if(!row.cells[5].hasChildNodes) {
            console.log("I AM THE CULPRIT", row.cells[5].innerHTML);
            row.cells[5].innerHTML = '';
          }


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
      var cell6 =row.insertCell(5);
      cell6.innerHTML = '';

      if(pos === -1) {
        table.appendChild(row);
      } else {
        table.insertBefore(row, table.rows[pos]);
      }
    }
  }

  getSortedPosition(table, lastChangeBid) {
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
