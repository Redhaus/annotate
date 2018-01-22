import React, { Component } from 'react';
import Poem from './components/poem';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Poem/>
      </div>
    );
  }
}

export default App;
