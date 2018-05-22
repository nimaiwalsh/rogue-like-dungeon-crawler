import styled from 'react-emotion';

export const Container = styled('div')`
  width: 100%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
`

export const DungeonGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(50, 2rem);
  grid-template-rows: repeat(50, 2rem);
  border: 1rem solid brown;
`

export const Tyle = styled('div')`
  color: #FFF;
  background-color: ${props => 
    props.type === 1 ? 'red' :
    props.type === 'wall' ? 'brown' :
    'black' 
  };
  display: flex;
  justify-content: center;
`