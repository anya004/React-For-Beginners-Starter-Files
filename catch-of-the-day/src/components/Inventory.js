import React from "react";
import PropTypes from "prop-types";
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends React.Component {
  static propTypes = {
    addFish: PropTypes.func,
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };
  render() {
      return (
        <div className="inventory">
          <h2>Inventory</h2>
          <AddFishForm addFish={this.props.addFish}/>
          {Object.keys(this.props.fishes).map(key =>
            <EditFishForm
              key={key}
              index={key}
              fish={this.props.fishes[key]}
              updateFish={this.props.updateFish}
              deleteFish={this.props.deleteFish}
              />
            )}
          <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
        </div>
    );
  }
}

export default Inventory;
