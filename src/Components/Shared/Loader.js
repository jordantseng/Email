import React from 'react';

const Loader = ({ text }) => {
  return (
    <div className="ui segment" style={{ height: '300px' }}>
      <div className="ui active inverted dimmer">
        <div className="ui text loader">{text}</div>
      </div>
      <p></p>
    </div>
  );
};

export default Loader;
