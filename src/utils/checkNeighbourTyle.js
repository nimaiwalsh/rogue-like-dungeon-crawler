export const checkNeighbourTyle = (direction, state) => {
  const { boardTyles, playerPos } = state;
  let playerPosY = playerPos[0];
  let playerPosX = playerPos[1];
  //Do not move if Next tyle is a wall
  if (direction === 'right') {
    //Do not move if it is a wall
    if (boardTyles[playerPosY][playerPosX + 1] === 'wall') {
      return;
    }
  }
  if (direction === 'left') {
    if (boardTyles[playerPosY][playerPosX - 1] === 'wall') {
      return;
    }
  }
  if (direction === 'down')
    if (
      boardTyles[playerPosY + 1] !== undefined &&
      boardTyles[playerPosY + 1][playerPosX] === 'wall'
    ) {
      return;
    }
  if (direction === 'up')
    if (
      boardTyles[playerPosY - 1] !== undefined &&
      boardTyles[playerPosY - 1][playerPosX] === 'wall'
    ) {
      return;
    }

  return this.movePlayer(direction);
};