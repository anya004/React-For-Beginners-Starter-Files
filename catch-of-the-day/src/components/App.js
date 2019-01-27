import React from "react";
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from "../sample-fishes"
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    // //first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.StoreId);
    if(localStorageRef) {
       this.setState({ order: JSON.parse(localStorageRef) });
     };
    this.ref = base.syncState(`${params.StoreId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.StoreId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }



  addFish = (fish) => {
    console.log("adding a fish!");
    console.log(fish);
    //1. Take a copy of the existing state
    const fishes = { ...this.state.fishes}
    //2. Add new fish to that fishes
    fishes[`fish${Date.now()}`] = fish;
    //3. Set the new fishes to state
    this.setState({
      fishes: fishes
      }
    );
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = (key) => {
    //1. take a copy of the existing state
    const order = { ...this.state.order};
    //2. Add new part of the order
    order[key] = order[key] + 1 || 1;
    //3. set the new state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
}

export default App;
