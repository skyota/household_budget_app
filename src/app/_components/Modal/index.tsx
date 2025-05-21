'use client'

import { FC, ReactNode } from "react";
import ReactModal from "react-modal";

interface Props {
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  children: ReactNode
}

const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      closeTimeoutMS={300}
      ariaHideApp={false}
      className="bg-white rounded-lg w-[364px] px-8 py-7 mx-5 relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div>
        <button onClick={onClose} className="absolute -top-10 right-2 text-white text-2xl font-bold">✕</button>
        {children}
      </div>
    </ReactModal>
  )
}

export default Modal;
