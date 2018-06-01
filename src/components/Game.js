import React, { Component, Fragment } from 'react';
import DungeonBoard from './DungeonBoard';
import Hud from './Hud';
import actionTileType from '../utils/tileTypeActions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardTiles: [],
      playerPos: [0, 0],
      playerStats: {
        health: 100,
        weapon: 'stick',
        attack: 5,
        xp: 0,
        level: 0,
      },
      gameState: {
        dungeon: 0
      },
      monsters: [],
    };
  }

  componentDidMount() {
    this.createMapTiles();
    document.addEventListener('keydown', this.handleKeyPress);
  }

  createMapTiles = () => {
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
    this.setState({ boardTiles: board }, this.setUpTileTypes);
  };

  setUpTileTypes = () => {
    this.createWalls();
    this.createPlayerPos();
    this.createWeaponTiles();
    this.createHealthTiles();
    this.createMonsterTiles();
  };

  createWalls = () => {
    const { boardTiles } = this.state;
    boardTiles[0][2] = 'wall';
    boardTiles[1][2] = 'wall';
    boardTiles[2][2] = 'wall';
    this.setState({ boardTiles: boardTiles });
  };

  createWeaponTiles = () => {
    const { boardTiles } = this.state;
    boardTiles[6][3] = { type: 'weapon', typeClass: 'knife' };
    boardTiles[6][5] = { type: 'weapon', typeClass: 'axe' };
    boardTiles[6][7] = { type: 'weapon', typeClass: 'sword' };
    boardTiles[6][9] = { type: 'weapon', typeClass: 'excalibur' };
    this.setState({ boardTiles: boardTiles });
  };

  createHealthTiles = () => {
    const { boardTiles } = this.state;
    boardTiles[8][4] = 'health';
    boardTiles[8][6] = 'health';
    this.setState({ boardTiles: boardTiles });
  }

  createMonsterTiles = () => {
    const { boardTiles, monsters } = this.state;

    //Randomly create monsters
    for (let i = 1; i < 4; i++) {
      monsters.push({type: 'monster', typeClass: 'lvl1', monsterID: i, health: 20, pos: [(7+i), i]});
    }

    //Place monsters on the tiles
    monsters.map(monster => {
      boardTiles[monster.pos[0]][monster.pos[1]] = monster
    })

    this.setState({ boardTiles: boardTiles });
  }

  createPlayerPos = () => {
    const { boardTiles, playerPos } = this.state;
    boardTiles[playerPos[0]][playerPos[1]] = 'player';
    this.setState({ boardTiles: boardTiles });
  };

  handleKeyPress = e => {
    e.preventDefault();
    //Assign the W, A, S, D keys for movement
    // a/left = 65, w/up = 87, d/right = 68, s/down = 83
    switch (e.keyCode) {
      case 65:
        this.actionNeighbourTileAndMove('left');
        break;
      case 87:
        this.actionNeighbourTileAndMove('up');
        break;
      case 68:
        this.actionNeighbourTileAndMove('right');
        break;
      case 83:
        this.actionNeighbourTileAndMove('down');
        break;
      default:
        break;
    }
  };

  actionNeighbourTileAndMove = direction => {
    const { boardTiles, playerPos } = this.state;
    const playerPosY = playerPos[0];
    const playerPosX = playerPos[1];
    let nextPlayerPosY = playerPos[0];
    let nextPlayerPosX = playerPos[1];
    let neighbourTile = null;

    //Check neighbour tile type
    //Update next playerpos
    if (direction === 'right' && playerPosX < boardTiles.length - 1) {
      neighbourTile = boardTiles[playerPosY][playerPosX + 1];
      nextPlayerPosX += 1;
    }
    if (direction === 'left' && playerPosX > 0) {
      neighbourTile = boardTiles[playerPosY][playerPosX - 1];
      nextPlayerPosX -= 1;
    }
    if (direction === 'down' && playerPosY < boardTiles.length - 1) {
      neighbourTile = boardTiles[playerPosY + 1][playerPosX];
      nextPlayerPosY += 1;
    }
    if (direction === 'up' && playerPosY > 0) {
      neighbourTile = boardTiles[playerPosY - 1][playerPosX];
      nextPlayerPosY -= 1;
    }

    //If next move tile is a wall, don't do anything
    if (neighbourTile !== 'wall') {
      //Perform actions for special tiles such as weapons, enemy battles and powerups
      if (neighbourTile !== 0) {
        let newStateFromAction = actionTileType(neighbourTile, this.state);
        this.setState( newStateFromAction );
      }
      //If the tile is not a monster move player
      if (neighbourTile !== null && neighbourTile.type !== 'monster') {
        this.movePlayer(playerPosX, playerPosY, nextPlayerPosX, nextPlayerPosY);
      }
    }
  };

  movePlayer = (playerPosX, playerPosY, nextPlayerPosX, nextPlayerPosY) => {
    const { boardTiles } = this.state;
    //Set previous player position with blank tile
    boardTiles[playerPosY][playerPosX] = 0;
    //Update next tile with player tile
    boardTiles[nextPlayerPosY][nextPlayerPosX] = 'player';
    this.setState({
      boardTiles: boardTiles,
      playerPos: [nextPlayerPosY, nextPlayerPosX]
    });
  };

  render() {
    const { playerStats, gameState } = this.state
    return (
      <div>
        <Hud playerStats={ playerStats } gameState={ gameState } />
        <DungeonBoard tiles={this.state.boardTiles} />
      </div>
    );
  }
}

export default Game;
