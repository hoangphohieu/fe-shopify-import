import React, { useState } from 'react';
import Home from './Home/Home';
import './App.css';
import LocalItem from './Home/LocalItem';

function App() {

  return (
    <div className="App">
      <Home />
      <LocalItem />
      <a link="https://www.facebook.com/july.hph" className="july">July Hoang</a>
    </div>
  );
}

export default App;
