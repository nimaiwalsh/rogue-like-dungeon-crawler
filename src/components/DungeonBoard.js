import React from 'react';
import { Container, DungeonGrid, Tyle } from './DungeonBoard.css';

const DungeonBoard = ({ tyles }) => {
  return (
    <Container>
      <DungeonGrid>
        {tyles.map(tylerow => {
          return tylerow.map((tyle, num) => <Tyle key={num} type={tyle}>{tyle}</Tyle>);
        })}
      </DungeonGrid>
    </Container>
  );
};

export default DungeonBoard;
