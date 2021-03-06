import React from 'react';
import PropTypes from 'prop-types';

import styles from './AppButton.module.scss';

const AppButton = ({ label, callback, type = 'button' }) => {
  return (
    <button type={type} onClick={callback} className={styles['button']}>
      {label}
    </button>
  );
};

AppButton.propTypes = {
  label: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export { AppButton };
