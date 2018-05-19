import React, { Component } from 'react';
import Game from './components/Game';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles}>
        <h1>App</h1>
        <p>Dungeon Crawler</p>
        <Game />
      </div>
    );
  }
}

export default App;
