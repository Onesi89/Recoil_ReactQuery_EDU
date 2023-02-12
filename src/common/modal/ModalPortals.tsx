import React from 'react';
import { createPortal } from 'react-dom';

const ModalPortals = ({ children }: React.PropsWithChildren) => {
  const modalElement = document.querySelector('#modal');

  return createPortal(children, modalElement!);
};

export default ModalPortals;
