import React, { useEffect, useState } from 'react';
import Modal from '../common/modal/Modal';
import ModalPortals from '../common/modal/ModalPortals';
import { ModalProps, useDialog } from '../common/modal/ModalProvider';
import { useModal } from '../common/modal/ModalRecoil';

const ServerErrorPage = ({ onClickRetry }: any) => {
  // const { showConfirmModal } = useModal();
  const { showAlertModal } = useModal();
  return (
    <>
      <div>ServerErrorPage...</div>
      <button
        onClick={() =>
          // showConfirmModal({
          //   title: 'My Modal Title',
          //   content: 'My Modal Content',
          //   onConfirm: () => {
          //     console.log('Confirm button clicked');
          //   },
          //   confirmButtonText: 'OK',
          // }
          showAlertModal('경고', '넌 지금 잘못된 선택을 했음')
        }
      >
        Show Modal{' '}
      </button>
      <button onClick={onClickRetry}>Retry?</button>
    </>
  );
};

export default ServerErrorPage;
