import React, { Component, Fragment } from 'react';
//Dungeon generator NPM package by Matthew Burfield
import { NewDungeon } from 'random-dungeon-generator';
import DungeonBoard from './DungeonBoard';
import Hud from './Hud';
import actionTileType from '../utils/tileTypeActions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardTiles: [],
      playerPos: [2, 1],
      playerStats: {
        health: 100,
        weapon: 'stick',
        attack: 5,
        xp: 0,
        level: 0,
        dungeon: 0
      },
      monsters: []
    };
  }

  componentDidMount() {
    this.createMapTiles();
    document.addEventListener('keydown', this.handleKeyPress);
    this.randomPositionGenerator();
  }

  createMapTiles = () => {
    const dungeonOptions = {
      width: 50,
      height: 50,
      minRoomSize: 5,
      maxRoomSize: 20
    };
    const dungeon = NewDungeon(dungeonOptions);

    this.setState({ boardTiles: dungeon }, this.setUpTileTypes);
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
    //Set a wall tile for every 1 on the board array
    boardTiles.map(row => {
      row.map((tile, index, rowArr) => {
        if (tile === 1) {
          rowArr[index] = 'wall';
        }
      });
    });

    this.setState({ boardTiles: boardTiles });
  };

  createPlayerPos = () => {
    const { boardTiles, playerPos } = this.state;
    boardTiles[playerPos[0]][playerPos[1]] = 'player';
    this.setState({ boardTiles: boardTiles });
  };

  createWeaponTiles = () => {
    let weapons = ['knife', 'axe', 'sword', 'excalibur'];

    for (let weapon of weapons) {
      this.placeTileOnBoard({ type: 'weapon', typeClass: weapon });
    }
  };

  createHealthTiles = () => {
    //3 health tiles 
    for (let i = 0; i < 3; i++) {
      this.placeTileOnBoard('health');
    }
  };

  createMonsterTiles = () => {
    const { monsters } = this.state;
    //Create monsters 
    //lvl1
    for (let i = 0; i < 3; i++) {
      monsters.push({
        type: 'monster',
        monsterLevel: 1,
        monsterID: `${i}lvl1`,
        health: 20,
        pos: []
      });
    }
    //lvl2
    for (let i = 0; i < 2; i++) {
      monsters.push({
        type: 'monster',
        monsterLevel: 2,
        monsterID: `${i}lvl2`,
        health: 30,
        pos: []
      });
    }
    //lvl3
    for (let i = 0; i < 2; i++) {
      monsters.push({
        type: 'monster',
        monsterLevel: 3,
        monsterID: `${i}lvl3`,
        health: 40,
        pos: []
      });
    }
    //Place monsters on the tiles
    for (let monster of monsters ) {
      this.placeTileOnBoard(monster);
    }

    this.setState({ monsters: monsters });
  };

  randomPositionGenerator = () => {
    //Generate a random position for row and col
    return [
      Math.floor(Math.random() * 49 + 1),
      Math.floor(Math.random() * 49 + 1)
    ];
  };

  placeTileOnBoard = (tiletype) => {
    const { boardTiles, monsters } = this.state;
    let pos = this.randomPositionGenerator();
    //If tile pos is a wall, generate new pos
    while (
      boardTiles[pos[0]][pos[1]] === 'wall'
    ) {
      pos = this.randomPositionGenerator();
    }
    //If tiletype is a monster, add the position to tile for reference
    if (tiletype && tiletype.type === 'monster') {
      tiletype.pos = pos;
    }

    boardTiles[pos[0]][pos[1]] = tiletype;

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
        this.setState(newStateFromAction);
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
    const { playerStats, gameState } = this.state;
    return (
      <div>
        <Hud playerStats={playerStats} gameState={gameState} />
        <DungeonBoard tiles={this.state.boardTiles} />
      </div>
    );
  }
}

export default Game;
