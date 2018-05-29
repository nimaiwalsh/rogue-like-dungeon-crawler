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

export const Tile = styled('div')`
  color: #FFF;
  background-color: ${props => 
    props.type === 'player' ? 'red' :
    props.type === 'wall' ? 'brown' :
    props.type.type === 'weapon' ? 'orange' :
    props.type === 'health' ? 'green' :
    props.type.typeClass === 'lvl1' ? '#FA4766' :
    props.type.typeClass === 'lvl2' ? '#F4193F' :
    props.type.typeClass === 'lvl3' ? '#C50728' :
    props.type.typeClass === 'boss' ? '#DF0909' :
    'black' 
  };
  display: flex;
  justify-content: center;
`