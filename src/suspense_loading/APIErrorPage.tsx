import React, { useEffect, useState } from 'react';
import Modal from '../common/modal/Modal';
import ModalPortals from '../common/modal/ModalPortals';

const APIErrorPage = () => {
  const [modal, setModal] = useState(true);

  const handleModalSHow = (status: boolean) => {
    setModal(status);
  };

  const modalFunc = () => {
    return <ModalPortals>{/* <Modal show={modal} handleModalShow={handleModalSHow} /> */}</ModalPortals>;
  };
  useEffect(() => {
    modalFunc();
  }, []);

  return <div>APIErrorPage ....</div>;
};

export default APIErrorPage;
