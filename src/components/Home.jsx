import React from 'react';

const Home = ({ img }) => {
  return (
    <div className="container">
      <img style={{ width: '50vw' }} src={img} alt="logo" />
    </div>
  );
};

export default Home;
