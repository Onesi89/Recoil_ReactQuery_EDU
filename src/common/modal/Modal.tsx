/* eslint-disable */
import React from 'react';

const dialogDivisionType = {
  confirm: 'confirm',
  alert: 'alert',
};

export type { dialogDivisionType };

type ModalType = {
  isShow?: boolean;
  content?: any;
  dialogDivision?: keyof typeof dialogDivisionType;
  confirmButtonText?: string;
  onConfirm?: any;
  title?: string;
};

export type { ModalType };

type CommonModalType = {
  data: ModalType;
  handleModalShow: (status: boolean) => void;
};

const Modal = ({ data, handleModalShow }: CommonModalType) => {
  const { isShow } = data;
  const { content, title, confirmButtonText } = data;
  const { dialogDivision } = data;

  const setConfirom = () => {
    const { onConfirm } = data;
    return dialogDivision === 'confirm' ? onConfirm : () => handleModalShow(false);
  };

  return (
    <div className={'modal-wrap '.concat(isShow ? 'active' : '')}>
      <button
        className="overlay"
        onClick={() => {
          handleModalShow(false);
        }}
      ></button>
      <div className="modal-con">
        <div className="modal-header">
          <span className="modal-title text-white">{title}</span>
          <button
            type="button"
            className="close text-white"
            onClick={() => {
              handleModalShow(false);
            }}
          >
            <span aria-hidden="true">X</span>
          </button>
        </div>
        <div className="contents">{content}</div>
        <div className="bottom">
          {dialogDivision === dialogDivisionType.confirm && (
            <button type="button" onClick={() => handleModalShow(false)}>
              취소
            </button>
          )}
          <button
            type="button"
            className="btn btn-sm btn-primary waves-effect waves-themed"
            onClick={setConfirom()}
            data-dismiss="modal"
          >
            {dialogDivision === dialogDivisionType.alert ? '확인' : confirmButtonText || '확인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
