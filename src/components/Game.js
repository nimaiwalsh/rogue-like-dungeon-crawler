import React, { Component, Fragment } from 'react';
import DungeonBoard from './DungeonBoard';
import Hud from './Hud';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardTyles: [],
      playerPos: [0, 0],
      tyleTypes: {
        player: 1,
        wall: 2,
        enemy: {
          level1: 31,
          level2: 32,
          level3: 33,
          boss: 34
        },
        weapons: {
          knife: 41,
          axe: 42,
          sword: 43,
          excalibur: 44
        },
        health: 5
      }
    };
  }

  componentDidMount() {
    this.createMapTyles();
    document.addEventListener('keydown', this.handleKeyPress);
  }

  createMapTyles = () => {
    const rownum = 50;
    const colnum = 50;
    let board = [];
    //Create a 50 rows of 50 columns
    for (let i = 0; i < rownum; i++) {
      let row = [];
      for (let j = 0; j < colnum; j++) {
        row.push(0);
      }
      board.push(row);
    }

    this.setState({ boardTyles: board }, this.setUpTyleTypes);
  };

  setUpTyleTypes = () => {
    this.createWalls();
    this.createPlayerPos();
  };

  createWalls = () => {
    const { boardTyles } = this.state;
    boardTyles[0][2] = 'wall';
    boardTyles[1][2] = 'wall';
    boardTyles[2][2] = 'wall';
    this.setState({ boardTyles: boardTyles });
  };

  createPlayerPos = () => {
    const { boardTyles, playerPos } = this.state;
    boardTyles[playerPos[0]][playerPos[1]] = 1;
    this.setState({ boardTyles: boardTyles });
  };

  handleKeyPress = e => {
    e.preventDefault();
    // a/left = 65, w/up = 87, d/right = 68, s/down = 83
    switch (e.keyCode) {
      case 65:
        this.checkNeighbourTyle('left');
        break;
      case 87:
        this.checkNeighbourTyle('up');
        break;
      case 68:
        this.checkNeighbourTyle('right');
        break;
      case 83:
        this.checkNeighbourTyle('down');
        break;
      default:
        break;
    }
  };

  checkNeighbourTyle = direction => {
    const { boardTyles, playerPos } = this.state;
    let playerPosY = playerPos[0];
    let playerPosX = playerPos[1];
    //Do not move if Next tyle is a wall
    if (direction === 'right' && boardTyles[playerPosY][playerPosX + 1] === 'wall') {
      return;
    }
    if (
      direction === 'left' && boardTyles[playerPosY][playerPosX - 1] === 'wall'
    ) {
      return;
    }
    if (direction === 'down' && 
      boardTyles[playerPosY + 1] !== undefined &&
      boardTyles[playerPosY + 1][playerPosX] === 'wall' 
    ) {
      return;
    }
    if (
      direction === 'up' &&
      boardTyles[playerPosY - 1] !== undefined &&
      boardTyles[playerPosY - 1][playerPosX] === 'wall'
    ) {
      return;
    }

    this.movePlayer(direction);
  };

  movePlayer = direction => {
    const { boardTyles, playerPos } = this.state;
    let playerPosY = playerPos[0];
    let playerPosX = playerPos[1];

    //Set previous player position with blank tyle
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
    //Update new tyle with new player position
    boardTyles[playerPosY][playerPosX] = 1;
    this.setState({
      boardTyles: boardTyles,
      playerPos: [playerPosY, playerPosX]
    });
  };

  render() {
    return (
      <div>
        <DungeonBoard tyles={this.state.boardTyles} />
        <Hud />
      </div>
    );
  }
}

export default Game;
