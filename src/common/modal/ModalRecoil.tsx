import React, { useCallback, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import Modal, { ModalType } from './Modal';
import ModalPortals from './ModalPortals';

/**
 * Atom for holding the state of the modal
 */
const modalAtom = atom<ModalType>({
  key: 'modal',
  default: {
    isShow: false,
    title: '모달 제목',
    content: '모달 내용',
    dialogDivision: 'confirm',
    confirmButtonText: '확인',
  },
});

/**
 * Custom hook for managing the state of the modal
 */
const useModal = () => {
  const [modal, setModal] = useRecoilState(modalAtom);

  const handleModalShow = (status: boolean) => {
    setModal((prev) => ({ ...prev, isShow: status }));
  };

  const showConfirmModal = useCallback(({ title, content, onConfirm, confirmButtonText }: ModalType) => {
    setModal((prev) => ({ ...prev, isShow: true, title, content, onConfirm, confirmButtonText }));
  }, []);

  const showAlertModal = useCallback((title: string, content: any) => {
    setModal((prev) => ({ ...prev, isShow: true, title, content, dialogDivision: 'alert' }));
  }, []);

  return { modal, handleModalShow, showConfirmModal, showAlertModal };
};

/**
 * Modal component that uses Recoil to manage its state
 */
const ModalRecoil = (props: React.PropsWithChildren) => {
  const { modal, handleModalShow } = useModal();

  return (
    <ModalPortals>
      <Modal data={modal} handleModalShow={handleModalShow} />
      {props.children}
    </ModalPortals>
  );
};

export default ModalRecoil;
export { useModal };
