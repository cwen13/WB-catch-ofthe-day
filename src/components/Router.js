import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import StorePicker from "./StorePicker";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact
	     path="/"
	     component={StorePicker}
      />
      <Router path="/store/:storeId"
	      component={App}
      />
      <Router component={NotFound}
      />
      </Switch>
    </BrowserRouter>
);
    
export default Router;
