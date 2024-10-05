import React from 'react';
import { Spinner } from 'react-bootstrap';
import './loading-spinner.scss';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner-container">
      <Spinner animation="border" role="status" />
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;