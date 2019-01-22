import React from "react";

class AddFishForm extends React.Component {

  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (event) => {
    //1. Prevent form from submitting
    event.preventDefault();
    //2. Get all the data
    const fish = {
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value
    }
    this.props.addFish(fish);
    // refresh the AddFishForm
    event.currentTarget.reset();
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input className="name" ref={this.nameRef} type="text" placeholder="Name"/>
        <input className="price" ref={this.priceRef} type="text" placeholder="Price"/>
        <select className="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea className="desc" ref={this.descRef} placeholder="Desc"></textarea>
        <input className="image" ref={this.imageRef} type="text" placeholder="Image"/>
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
