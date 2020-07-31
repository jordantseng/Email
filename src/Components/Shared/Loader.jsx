import React from 'react';

const Loader = () => {
  return (
    <div className="ui segment h-100">
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
      <p></p>
    </div>
  );
};

export default Loader;
