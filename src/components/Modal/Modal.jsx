import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  modalClose = ({ key, type }) => {
    if (key === 'Escape' || type === 'click') {
      this.props.onClick('');
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.modalClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.modalClose, false);
  }

  render() {
    const { onItemClick } = this.props;

    return (
      <div className = {css.Overlay} onClick ={ this.modalClose}>
        <div className = {css.Modal}>
          <img src = {onItemClick} alt ="modal" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onItemClick: PropTypes.string,
  modalClose: PropTypes.func,
};