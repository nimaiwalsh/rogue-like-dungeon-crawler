import React from 'react';
import { Container, DungeonGrid, Tile } from './DungeonBoard.css';

const DungeonBoard = ({ tiles }) => {

  return (
    <Container>
      <DungeonGrid>
        {tiles.map(tilerow => {
          return tilerow.map((tile, num) => {
            return (
              <Tile key={num} type={tile}>{num}</Tile>
            )
          });
        })}
      </DungeonGrid>
    </Container>
  );
};

export default DungeonBoard;
