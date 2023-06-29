import React, { Component } from 'react';
import { getPhoto } from './Api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import css from './App.module.css'



export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      searchValue: '',
      page: 1,
      error: null,
      isLoading: false,
      modal: '',
    };
  }


  
  componentDidMount() {
    const { searchValue } = this.state;
    if (searchValue !== '') {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;
    if (searchValue !== prevState.searchValue || page !== prevState.page) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { searchValue, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const photos = await getPhoto(searchValue, page);
      this.setState(prevState => ({
        photos: [
          ...prevState.photos,
          ...photos.map(photo => ({
            id: photo.id,
            webformatURL: photo.webformatURL,
            largeImageURL: photo.largeImageURL,
            tags: photo.tags,
          })),
        ],
      }));
    } catch (error) {
      this.setState({ error });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchValue = value => {
    this.setState({ photos: [], searchValue: value });
  };

  handleButtonVisibility = () => {
    const { photos } = this.state;
    return photos.length < 12 ? 'none' : 'flex';
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }, 500);
      }
    );
  };

  handleModal = onItemClick => {
    this.setState({ modal: onItemClick });
  };

  handleModalClose = () => {
    this.setState({ modal: '' });
  };

  passImgToModal = () => {
    return this.state.modal;
  };

  render() {
    const { photos, isLoading, modal } = this.state;
    const isPhotosAvailable = photos.length > 0;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchValue} />
        {isPhotosAvailable && (
          <ImageGallery photos={photos} onItemClick={this.handleModal} />
        )}
        {isLoading && <Loader />}
        <div
          className={css.buttonPosition}
          style={{ display: this.handleButtonVisibility() }}
        >
          {!isLoading && <Button onClick={this.handleLoadMore} />}
        </div>
        {modal !== '' && (
          <Modal
            onItemClick={this.passImgToModal()}
            onClick={this.handleModalClose}
          />
        )}
      </>
    );
  }
}
