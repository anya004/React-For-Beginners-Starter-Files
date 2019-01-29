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

  updateFish = (key, updatedFish) => {
    console.log("updating a fish!");
    //1. Take a copy of the existing state
    const fishes = { ...this.state.fishes};
    //2. Update the fish
    fishes[key] = updatedFish;
    //3. Set the new fishes to state
    this.setState({
      fishes: fishes
      }
    );
  };

  deleteFish = (key) => {
    console.log("deleting a fish!");
    //1. take a copy
    const fishes = { ...this.state.fishes};
    //2. update state... firebase needs the item to be set to null in order to remove from the db
    // other potentional option 'delete fishes.key' (not for firebase)
    fishes[key] = null;
    //3. Set the new fishes to state
    this.setState({ fishes });
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

  deleteFromOrder = (key) => {
    //1. take a copy of the existing state
    const order = { ...this.state.order};
    //2. Delete part of the order
    if (order[key]!=1) {
        order[key] = order[key] - 1;
    } else {
      delete order[key];
    }
    //3. set state to the new state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key =>
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            )}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFromOrder={this.deleteFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    )
  }
}

export default App;
