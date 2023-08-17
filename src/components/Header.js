import React from "react";

const Header = ({ tagline, age }) => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
	<span className="of">of</span>
	<span className="the">the</span>
      </span>
    day</h1>
    <h3 className="tagline">
      <span>{tagline} {age}</span>
    </h3>
  </header>
);


export default Header;
