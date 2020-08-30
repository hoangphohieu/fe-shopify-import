import React, { useState } from 'react';
import Home from './Home/Home';
import './App.css';
import LocalItem from './Home/LocalItem';

function App() {

  return (
    <div className="App">
      <Home />
      <LocalItem />
    </div>
  );
}

export default App;
