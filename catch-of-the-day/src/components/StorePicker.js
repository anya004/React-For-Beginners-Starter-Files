import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();


  goToStore = (event) => {
    // 1. stop form from submitting
    event.preventDefault();
    // 2. get text from input
    const storeName = this.myInput.value.value;
    // 3. route to that store
    this.props.history.push(`/store/${storeName}`);
  }

  render() {
    return (
      <React.Fragment>
        <form className="store-selector" onSubmit={this.goToStore}>
          { /* comment */ }
          <h2>Please Enter a Store</h2>
          <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()}/>
          <button type="submit">Visit Store → </button>
        </form>
      </React.Fragment>
    )
  }
}

export default StorePicker;
