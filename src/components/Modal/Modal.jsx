import style from '../Modal/modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const closeModal = ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [onClose]);

  return createPortal(
    <div className={style.Overlay} onClick={onClose}>
      <div className={style.Modal}>
        {children}
        <span className={style.Close} onClick={onClose}>
          X
        </span>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
