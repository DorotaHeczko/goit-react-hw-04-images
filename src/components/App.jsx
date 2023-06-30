import React, { useState, useEffect } from "react";
import { getPhoto } from "./Api/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

import css from "./App.module.css";

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState("");

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        setIsLoading(true);
        const searchImg = await getPhoto(searchValue, page);
        const searchedImg = searchImg.map((photo) => {
          return {
            id: photo.id,
            webformatURL: photo.webformatURL,
            largeImageURL: photo.largeImageURL,
            tags: photo.tags,
          };
        });
        searchValue !== "" && setPhotos((p) => [...p, ...searchedImg]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    asyncFunc();
  }, [searchValue, page]);

  const handleSearchValue = (e) => {
    setPhotos([]);
    setPage(1);
    setSearchValue(e);
  };

  const handleModal = (onItemClick) => setModal(onItemClick);

  const handleButtonVisibility = () => {
    return photos.length < 12 ? "none" : "flex";
  };

  const handleLoadMore = () => {
    setPage((p) => p + 1);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 500);
  };

  const handleModalClose = (e) => {
    setModal(e);
  };

  // passImgToModal = (e) => {
  //    setModal(e);
  //  };

  return (
    <>
      <Searchbar onSubmit={handleSearchValue} />
      <ImageGallery photos={photos} onItemClick={handleModal} />
      {isLoading && <Loader />}
      <div
        className={css.buttonPosition}
        style={{ display: handleButtonVisibility() }}
      >
        {!isLoading && <Button onClick={handleLoadMore} />}
      </div>
      {modal !== "" && <Modal onItemClick={modal} onClick={handleModalClose} />}
    </>
  );
};


