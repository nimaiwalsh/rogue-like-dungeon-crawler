import React, { Component, Fragment } from 'react';
import DungeonBoard from './DungeonBoard';
import Hud from './Hud';
import { checkNeighbourTyle } from '../utils/checkNeighbourTyle';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardTyles: [],
      playerPos: [0, 0],
      playerStats: {
        health: 100,
        weapon: 'stick',
        attack: 5,
        level: 0
      },
      gameState: {
        dungeon: 0
      },
      enemies: {
        level1: {
          attack: 5,
          health: 100
        },
        level2: {
          attack: 10,
          health: 100
        },
        level3: {
          attack: 15,
          health: 100
        },
        boss: {
          attack: 25,
          health: 200
        }
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
    console.log(board)
    this.setState({ boardTyles: board }, this.setUpTyleTypes);
  };

  setUpTyleTypes = () => {
    this.createWalls();
    this.createPlayerPos();
    this.createWeaponTyles();
  };

  createWalls = () => {
    const { boardTyles } = this.state;
    boardTyles[0][2] = 'wall';
    boardTyles[1][2] = 'wall';
    boardTyles[2][2] = 'wall';
    this.setState({ boardTyles: boardTyles });
  };

  createWeaponTyles = () => {
    const { boardTyles } = this.state;
    boardTyles[6][3] = {type: 'weapon', class: 'knife'};
    boardTyles[6][5] = {type: 'weapon', class: 'axe'};
    boardTyles[6][7] = {type: 'weapon', class: 'sword'};
    boardTyles[6][9] = {type: 'weapon', class: 'excalibur'};
    this.setState({ boardTyles: boardTyles });
  };

  createPlayerPos = () => {
    const { boardTyles, playerPos } = this.state;
    boardTyles[playerPos[0]][playerPos[1]] = 'player';
    this.setState({ boardTyles: boardTyles });
  };

  handleKeyPress = e => {
    e.preventDefault();
    //Assign the W, A, S, D keys for movement
    // a/left = 65, w/up = 87, d/right = 68, s/down = 83
    switch (e.keyCode) {
      case 65:
        this.checkNeighbourTyleAndMove('left');
        break;
      case 87:
        this.checkNeighbourTyleAndMove('up');
        break;
      case 68:
        this.checkNeighbourTyleAndMove('right');
        break;
      case 83:
        this.checkNeighbourTyleAndMove('down');
        break;
      default:
        break;
    }
  };

  checkNeighbourTyleAndMove = direction => {
    const { boardTyles, playerPos } = this.state;
    const playerPosY = playerPos[0];
    const playerPosX = playerPos[1];
    let nextPlayerPosY = playerPos[0]
    let nextPlayerPosX = playerPos[1];
    let neighbourTyle = null;

    //Check neighbour tile type and
    //perform some action depending on the next tyle
    //update next player position
    if (direction === 'right' && playerPosX < boardTyles.length - 1) {
      neighbourTyle = boardTyles[playerPosY][playerPosX + 1];
      nextPlayerPosX += 1;
    }
    if (direction === 'left' && playerPosX > 0) {
      neighbourTyle = boardTyles[playerPosY][playerPosX - 1];
      nextPlayerPosX -= 1;
    }
    if (direction === 'down' && playerPosY < boardTyles.length - 1) {
      neighbourTyle = boardTyles[playerPosY + 1][playerPosX];
      nextPlayerPosY += 1;
    }
    if (direction === 'up' && playerPosY > 0) {
      neighbourTyle = boardTyles[playerPosY - 1][playerPosX];
      nextPlayerPosY -= 1;
    }
    //UTILITY FUNCTIONS FOR EACH TYPE TYPE
    
    //Restrict move if it is a wall
    if (neighbourTyle === 'wall' && neighbourTyle !== undefined) {
      return;
    }
    //Weapon Pickup
    if (neighbourTyle.type === 'weapon') {
      return console.log('weapon tyle');
    }
    
    this.movePlayer(playerPosX, playerPosY, nextPlayerPosX, nextPlayerPosY);
  };

  movePlayer = (playerPosX, playerPosY, nextPlayerPosX, nextPlayerPosY) => {
    const { boardTyles } = this.state;
    //Set previous player position with blank tyle
    boardTyles[playerPosY][playerPosX] = 0;
    //Update next tile with player tyle
    boardTyles[nextPlayerPosY][nextPlayerPosX] = 'player';
    this.setState({
      boardTyles: boardTyles,
      playerPos: [nextPlayerPosY, nextPlayerPosX]
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
