import styled, { keyframes } from 'react-emotion';

const Modal = styled('div')`
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /*Transition modal in/out of the screen*/
  transform: ${props => props.visible ? 'scale(1)' : 'scale(0)' };
  transition: all 1s;

  & div {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    background-color: white;
    transform: translate(-50%, -50%);
    padding: 3rem;
    opacity: 1;
  }

`;

export default Modal;
