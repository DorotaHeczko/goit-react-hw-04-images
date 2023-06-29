import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = props => {
  const { id, webformatURL, largeImageURL, tags, onItemClick } = props;

  return (
    <li
      className = { css.ImageGalleryItem }
      key={id}
      value={id}
      onClick={() => onItemClick(largeImageURL)}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  onItemClick: PropTypes.func,
};
