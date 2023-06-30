import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(name);
    setName('');
  };

 const handleChange = (e) => {
   const { value } = e.currentTarget;
   setName(value);
 };



    return (
      <header className ={css.Searchbar}>
        <form className ={css.SearchForm} onSubmit ={handleSubmit}>
          <button type ="submit" className ={css.SearchFormButton}>
            <span className ={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={name}
          />
        </form>
      </header>
    );
  }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
