module.exports = class Observer {
  constructor() {
    console.log("observer created");
    this.observerState = '';
  }

  Update (Subject){
      this.observerState = Subject.GetState();
  }
}
