import React from 'react';
import { Container, DungeonGrid, Tyle } from './DungeonBoard.css';

const DungeonBoard = ({ tyles }) => {
  
  return (
    <Container>
      <DungeonGrid>
        {tyles.map(tylerow => {
          return tylerow.map((tyle, num) => {
            return (
              <Tyle key={num} type={tyle}>{num}</Tyle>
            )
          });
        })}
      </DungeonGrid>
    </Container>
  );
};

export default DungeonBoard;
