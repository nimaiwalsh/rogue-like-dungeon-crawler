function actionTileType(neighbourTile, state) {
  //weapon
  if (neighbourTile && neighbourTile.type === 'weapon') {
    tileTypeAction.weapon(neighbourTile, state);
  }
  //Health potion
  if (neighbourTile && neighbourTile === 'health') {
    tileTypeAction.health(neighbourTile, state);
  }
  //monster + boss
  if (neighbourTile && neighbourTile.type === 'monster') {
    tileTypeAction.monster(neighbourTile, state);
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
    playerStats.weapon = neighbourTile.class
    return playerStats;
  },
  health: function healthAction(neighbourTile, state) {
    let { playerStats } = state;
    playerStats.health += 20;  
    return playerStats;
  },
  monster: function monsterActions(neighbourTile, state) {
    let { playerStats } = state
    //Level 1 monster
    //Attack between 10-20
    //Health - 20
    if (neighbourTile.typeClass === 'lvl1') {
      
      console.log('lvl1 monster')
    }
  }
}

export default actionTileType;