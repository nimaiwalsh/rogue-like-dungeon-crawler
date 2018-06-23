import React from 'react';
import Modal from './StatusModel.css';

const StatusModel = ({ visible, message }) => {
  return (
    <Modal visible={visible}>
      <div>
        {message}
      </div>
    </Modal>
  );
};

export default StatusModel;;