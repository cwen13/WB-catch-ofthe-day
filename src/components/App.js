import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "./../sample-fishes";
import base from "./../base";


class App extends React.Component {
 
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };
  
  componentDidMount() {
    const { params } = this.props.match;
    //reinstate local storeage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef)});
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  };

  componentWillUnmount() {
    base.removeBinding(this.ref);
  };
  
  addFish = fish => {
    //copt old fish
    const fishes = {...this.state.fishes};
    //add new fish to set
    fishes[`fish${Date.now}`] = fish;
    //set the state object to new state
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    console.log(fishes)
    fishes[key] = updatedFish;
    this.setState({fishes});
  };

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  };

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId,
			 JSON.stringify(this.state.order));
  };
  
  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  }

  addToOrder = (key) => {
    // take a copy of state
    const order = { ...this.state.order };
    // either add or subtract from order
    order[key] = order[key] + 1 || 1;
    //call set state to update state objet
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order});
  };
  
  render() {
    return (
      <div className="catch-of-the-day">
	<div className="menu">
	  <Header tagline="Fresh sea food market"/>
	  <ul className="fishes">
	    {Object.keys(this.state.fishes).map(key => (
	      <Fish key={key}
		    index={key}
		    details={this.state.fishes[key]}
		    addToOrder={this.addToOrder}
	      />
	    ))}
	  </ul>
	</div>
	<Order fishes={this.state.fishes}
	       order={this.state.order}
	       removeFromOrder={this.removeFromOrder}
	/> 
	<Inventory addFish={this.addFish}
		   updateFish = {this.updateFish}
		   deleteFish = {this.deleteFish}
		   loadSampleFishes={this.loadSampleFishes}
		   fishes = {this.state.fishes}
	/>
      </div>
    );
  };  
};

export default App;
