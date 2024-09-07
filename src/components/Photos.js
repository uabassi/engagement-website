import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight, faCircleXmark, faDownload } from '@fortawesome/free-solid-svg-icons';
import LazyLoad from 'react-lazyload';
import './Photos.css';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Photoshoot');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPhotos(activeTab, 1);
  }, [activeTab]);

  const fetchPhotos = async (category, page) => {
    try {
      const response = await axios.get(`http://localhost:5000/photos/${category}?page=${page}`);
      if (page === 1) {
        setPhotos(response.data);
      } else {
        const newPhotos = response.data.filter(
          newPhoto => !photos.some(photo => photo._id === newPhoto._id)
        );
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
      }
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const prevSlide = () => {
    setSlideNumber(slideNumber === 0 ? photos.length - 1 : slideNumber - 1);
  };

  const nextSlide = () => {
    setSlideNumber((slideNumber + 1) % photos.length);
  };

  const downloadImage = (src) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.substring(src.lastIndexOf('/') + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = ['Photoshoot', 'Ring Ceremony', 'Cake Cutting', 'Family', 'Other'];

  const loadMorePhotos = () => {
    if (hasMore) {
      const nextPage = page + 1;
      fetchPhotos(activeTab, nextPage);
      setPage(nextPage);
    }
  };

  return (
    <div>
      <div className="tab-buttons">
        {categories.map(category => (
          <button
            key={category}
            className={category === activeTab ? 'active' : ''}
            onClick={() => {
              setActiveTab(category);
              setPage(1);
              setHasMore(true);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {openModal && (
        <div className="sliderWrap">
          <FontAwesomeIcon icon={faCircleXmark} className="btnClose" onClick={handleCloseModal} />
          <FontAwesomeIcon icon={faCircleChevronLeft} className="btnPrev" onClick={prevSlide} />
          <FontAwesomeIcon icon={faCircleChevronRight} className="btnNext" onClick={nextSlide} />
          <FontAwesomeIcon icon={faDownload} className="btnDownload" onClick={() => downloadImage(`http://localhost:5000${photos[slideNumber].src}`)} />
          <div className="fullScreenImage">
            <img src={`http://localhost:5000${photos[slideNumber].src}`} alt={photos[slideNumber].alt} />
          </div>
        </div>
      )}

      <div className="galleryWrap">
        {photos.map((photo, index) => (
          <LazyLoad key={photo._id} height={200} offset={100} once>
            <div className="single" onClick={() => handleOpenModal(index)}>
              <img src={`http://localhost:5000${photo.src}`} alt={photo.alt} />
            </div>
          </LazyLoad>
        ))}
      </div>

      {hasMore && (
        <div className="loadMore" onClick={loadMorePhotos}>
          Load More
        </div>
      )}
    </div>
  );
};

export default Photos;
