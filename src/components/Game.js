import React, { Component, Fragment } from 'react';
import DungeonBoard from './DungeonBoard';
import Hud from './Hud';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardTyles: [],
      tyleTypes: {
        player: 1,
        wall: 2,
        enemy: {
          level1: 31,
          level2: 32,
          level3: 33,
          boss: 34,
        },
        weapons: {
          knife: 41,
          axe: 42,
          sword: 43,
          excalibur: 44, 
        },
        health: 5,
      },
    };
  }

  componentDidMount() {
    this.createMapTyles();
    document.addEventListener("keydown", this.handleKeyPress);
  }

  createPlayerPos = () => {
    const { boardTyles } = this.state;
    const playerPos = [0,0];
    boardTyles[0][0] = 1;
    this.setState({ boardTyles: boardTyles })
  }

  handleKeyPress = (e) => {
    e.preventDefault();
    // a/left = 65, w/up = 87, d/right = 68, s/down = 83
    switch (e.keyCode) {
      case 65:
        console.log('a pressed');
        break;
      case 87:
        console.log('w pressed');
        break;
      case 68: 
        console.log('d pressed');
        break;
      case 83:
        console.log('s pressed');
        break;
      default: 
        break;
    }
  }

  createMapTyles = () => {
    const rownum = 50;
    const colnum = 50;
    let board = [];

    for (let i = 0; i < rownum; i++) {
      let row = [];
      for (let j = 0; j < colnum; j++) {
        row.push('x');
      }
      board.push(row);
    }
    // console.log(board);
    this.setState({ boardTyles: board }, this.createPlayerPos)
  }

  render() {
    const { tyles } = this.state;
    return (
      <div>
        <DungeonBoard tyles={this.state.boardTyles} />
        <Hud/>
      </div>
    );
  }
}

export default Game;
