import React from "react";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";

import sampleFishes from "./../sample-fishes";

class App extends React.Component {

  state = {
    fishes: {},
    order: {}
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
	/> 
	<Inventory addFish={this.addFish}
		   loadSampleFishes={this.loadSampleFishes}
	/>
      </div>
    );
  };  
};

export default App;
