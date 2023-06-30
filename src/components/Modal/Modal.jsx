import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ onItemClick, onClick }) => {
  const [imageSource, setImageSource] = useState(onItemClick);

  const modalClose = (e) => {
    if (e.key === "Escape" || e.type === "click") {
      setImageSource("");
      onClick("");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", modalClose, false);

    return () => {
      document.removeEventListener("keydown", modalClose, false);
    };
  });

  return (
    <div className={css.Overlay} onClick={modalClose}>
      <div className={css.Modal}>
        <img src={imageSource} alt="modal" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onItemClick: PropTypes.string,
  modalClose: PropTypes.func,
};