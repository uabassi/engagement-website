import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './Photos.css';

const PhotoModal = ({ image, isOpen, onClose, onNext, onPrev }) => {
  if (!isOpen || !image) return null;

  const downloadImage = (src) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.substring(src.lastIndexOf('/') + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="photo-modal-overlay" onClick={onClose}>
      <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <img src={image} alt="Enlarged view" onClick={() => downloadImage(image)} />
        <div className="photo-modal-buttons">
          <button onClick={onPrev}>
            <FontAwesomeIcon icon={faCircleChevronLeft} /> Back
          </button>
          <button onClick={onNext}>
            Next <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
