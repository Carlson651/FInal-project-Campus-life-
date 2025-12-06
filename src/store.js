export class Store {
  constructor(initial = {}) {
    this.state = initial;
    this.listeners = [];
  }

  subscribe(fn) {
    this.listeners.push(fn);
    fn(this.state); // send initial
  }

  setState(update) {
    this.state = { ...this.state, ...update };
    this.listeners.forEach(fn => fn(this.state));
  }

  getState() {
    return this.state;
  }
}

// create a shared store instance
export const appStore = new Store({
  query: "",
  items: []
});

