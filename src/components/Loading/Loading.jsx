// src/components/Loading/Loading.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-50 z-50" >
      <div className="text-center">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" className="" />
      </div>
    </div>
  );
};

export default Loading;
