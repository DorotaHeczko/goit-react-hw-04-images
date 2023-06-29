import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ photos, onItemClick }) => {
  return (
    <ul className = { css.ImageGallery }>
      {photos.map(photo => {
        
        const { id, webformatURL, tags, largeImageURL } = photo;
        return (
          <ImageGalleryItem
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onItemClick={onItemClick}
            tags={tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};
