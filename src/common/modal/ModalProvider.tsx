import React, { useCallback, useContext, useState, createContext } from 'react';
import Modal from './Modal';
import ModalPortals from './ModalPortals';

/**
 ***********************************************************
 * type
 ***********************************************************
 */

type ModalProps = {
  showModal: () => void;
};

/**
 ***********************************************************
 * ModalContext
 ***********************************************************
 */

const ModalContext = createContext<ModalProps | null>(null);

/**
 ***********************************************************
 * ModalProvider
 ***********************************************************
 */

const ModalProvider = (data: React.PropsWithChildren) => {
  const [modal, setModal] = useState(false);

  const handleModalSHow = (status: boolean) => {
    setModal(status);
  };

  const showModal = useCallback(() => {
    setModal(true);
  }, []);

  return (
    <ModalContext.Provider value={{ showModal }}>
      <ModalPortals>{/* <Modal show={modal} handleModalShow={handleModalSHow} /> */}</ModalPortals>
      {data.children}
    </ModalContext.Provider>
  );
};

/**
 ***********************************************************
 * useDialog
 ***********************************************************
 */

const useDialog = () => {
  return useContext(ModalContext);
};

/**
 ***********************************************************
 * export
 ***********************************************************
 */
export { ModalContext, useDialog };
export default ModalProvider;
export type { ModalProps };
