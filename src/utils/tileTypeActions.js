function actionTileType(neighbourTile, state) {
  //weapon
  if (neighbourTile && neighbourTile.type === 'weapon') {
    return tileTypeAction.weapon(neighbourTile, state);
  }
  //Health potion
  if (neighbourTile && neighbourTile === 'health') {
    return tileTypeAction.health(neighbourTile, state);
  }
  //monster + boss
  if (neighbourTile && neighbourTile.type === 'monster') {
    return tileTypeAction.monster(neighbourTile, state);
  }
  //new dungeon door
} 

//Different actions to perform depending on tile
const tileTypeAction = {
  weapon: function weaponAction (neighbourTile, state) {
    let { playerStats } = state;
    switch(neighbourTile.typeClass) {
      case 'knife':
        playerStats.attack = 10;
        break;
      case 'axe':
        playerStats.attack = 15;
        break;
      case 'sword':
        playerStats.attack = 20;
        break;
      case 'excalibur':
        playerStats.attack = 25;
        break;
      default:
        break;
    }
    playerStats.weapon = neighbourTile.typeClass
    return playerStats;
  },
  health: function healthAction(neighbourTile, state) {
    let { playerStats } = state;
    playerStats.health += 20;  
    return playerStats;
  },
  monster: function monsterActions(neighbourTile, state) {
    let { playerStats, monsters, boardTiles } = state
    //Level 1 monster
    //Random attack between 10 - 20
    if (neighbourTile.monsterLevel === 1) {
      playerStats.health -= 10;
    }

    if (neighbourTile.monsterLevel === 2) {
      playerStats.health -= 20;
    }

    if (neighbourTile.monsterLevel === 3) {
      playerStats.health -= 30;
    }
    //Kill monster or reduce its health
    for (let monster of monsters) {
      if (monster.monsterID === neighbourTile.monsterID) {
        //Perform last attack to kill monster
        if (monster.health <= playerStats.attack) {
          monster.health -= playerStats.attack;
          //remove monster from the board
          boardTiles[monster.pos[0]][monster.pos[1]] = 'dead';
        } else {
          monster.health -= playerStats.attack;
        }
      }
    };
    
    return { playerStats, monsters, boardTiles };
  }
}

export default actionTileType;