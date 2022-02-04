import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <>
    <img
      src={spinner}
      alt='loading'
      style={{ widht: '200px', margin: 'auto', display: 'block' }}
    />
  </>
);

export default Spinner;
