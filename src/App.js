import React, { Component } from 'react';
import './App.css';
import WordMerge from "./Components/WordMerge"
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Please select a word you would like to merge
          </p>
          <WordMerge />
        </header>
      </div>
    );
  }
}

export default App;
