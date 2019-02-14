import React from "react";
import PropTypes from "prop-types";
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import firebase from "firebase";
import base, {firebaseApp} from '../base';

class Inventory extends React.Component {
  static propTypes = {
    addFish: PropTypes.func,
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }
    })
  }

  authHandler = async (authData) => {
    console.log(authData);
    //1. Look up the current store in firebaseApp
    const store = await base.fetch(this.props.storeId, { context: this}); //returns a promise, therefore await
    console.log(store);
    //2. Claim store if no owner
    if (!store.owner) {
      //save it as their's
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    };
    //3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.iud
    })
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    console.log("Logout");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logoutButton = <button onClick={this.logout}>Logout</button>;

    //1. Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate}/>;
    }
    //2. Check if they are the owner
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you're not the owner of the store.</p>
          {logoutButton}
        </div>
      )
    }
    //3. Must be the owner, therefore render the inventory editing page
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logoutButton}
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
