import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  static propTypes ={
    fish: PropTypes.shape({
      mage: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string
    }),
    updateFish:PropTypes.func,
    index: PropTypes.string,
    deleteFish: PropTypes.func
  };

  handleChange = (event) => {
    console.log(event.currentTarget.value);
    console.log(event.currentTarget.name);
    //update the fish

    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    };
    console.log(updatedFish);
    this.props.updateFish(this.props.index, updatedFish);
  }

  render() {
    return (
      <div className="fish-edit">
        <input className="name" name="name"  type="text" onChange={this.handleChange} value={this.props.fish.name} index={this.props.index}/>
        <input className="price" name="price"  type="text" onChange={this.handleChange} value={this.props.fish.price}/>
        <select className="status" name="status" onChange={this.handleChange} value={this.props.fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea className="desc" name="desc" onChange={this.handleChange} value={this.props.fish.desc}></textarea>
        <input className="image" name="image" type="text" onChange={this.handleChange} value={this.props.fish.image}/>
        <button onClick={() => this.props.deleteFish(this.props.index)} >Remove Fish</button>
      </div>
    );
  }
}

export default EditFishForm;
