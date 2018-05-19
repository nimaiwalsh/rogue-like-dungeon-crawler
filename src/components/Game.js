import React, { Component, Fragment } from 'react';
import DungeonBoard from './DungeonBoard';
import Hud from './Hud';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardTyles: [],
      playerPos: [0,0],
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
    const { boardTyles, playerPos } = this.state;
    boardTyles[playerPos[0]][playerPos[1]] = 1;
    this.setState({ boardTyles: boardTyles })
  }

  movePlayer = (direction) => {
    const { boardTyles, playerPos } = this.state;
    let playerPosY = playerPos[0];
    let playerPosX = playerPos[1];

    boardTyles[playerPosY][playerPosX] = 0;
    if (direction === 'right' && playerPosX < boardTyles.length - 1) {
      playerPosX += 1;
    }
    if (direction === 'left' && playerPosX > 0) {
      playerPosX -= 1;
    }
    if (direction === 'down' && playerPosY < boardTyles.length - 1) {
      playerPosY += 1;
    }
    if (direction === 'up' && playerPosY > 0) {
      playerPosY -= 1;
    }
    boardTyles[playerPosY][playerPosX] = 1;
    this.setState({ boardTyles: boardTyles, playerPos: [playerPosY, playerPosX] });
  }

  handleKeyPress = (e) => {
    e.preventDefault();
    // a/left = 65, w/up = 87, d/right = 68, s/down = 83
    switch (e.keyCode) {
      case 65:
        this.movePlayer('left');
        break;
      case 87:
        this.movePlayer('up');
        break;
      case 68: 
        this.movePlayer('right');
        break;
      case 83:
        this.movePlayer('down');
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
        row.push(0);
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
