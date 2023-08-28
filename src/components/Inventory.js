import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "./../base";

class Inventory extends React.Component {
  static propTypes = {
    addFish: PropTypes.func,
    updateFish: PropTypes.func,
    loadSampleFish: PropTypes.func,
    fishes: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    })
  };

  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  
  authHandler = async authData => {
    //1 look up current store in firebase
    const store = await base.fetch(this.props.storeId, { context: this });
    //2 claim itif there is no owner
    if(!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
	data: authData.user.uid
      });
    }
    //3 set state of inventory to reflect currnet user
      this.setState({
	uid: authData.user.uid,
	owner: store.owner || authData.user.uid
      });
    
  };
  
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log("logging out!");
    awaitfirebase.auth().signout();
    this.setState({ uid: null });
  };
  
  render() {
    const logout = <button onClick={this.logout}>Logout</button>;
    
    if(!this.state.uid){
      return <Login authenticate={this.authenticate}/>
    }

    if(this,state.uid !== this.state.owner) {
      return(
	<div>
	  <p>Sorry you are not the owner</p>
	  {logout}
	</div>
      );
    }

    return (
      <div className="inventory">
	{logout}
	<h2>Inventory!!</h2>
	{Object.keys(this.props.fishes).map(key => (
	  <EditFishForm fish={this.props.fishes[key]}
			key={key}
			index={key}
			updateFish={this.props.updateFish}
			deleteFish={this.props.deleteFish}/>))};
	<AddFishForm addFish={this.props.addFish}/>
	<button onClick={this.props.loadSampleFishes}>
	  Load Sample Fishes
	</button>
      </div>
    );
  };
};

export default Inventory;
