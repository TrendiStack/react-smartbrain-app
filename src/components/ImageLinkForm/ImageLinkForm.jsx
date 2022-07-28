import React from 'react';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="text-center text-xl">
        {'This Magic Brain will detect faces in your pictures. Give it a try '}
      </p>
      <div className="flex justify-center">
        <div className="form flex justify-center p-10 rounded-xl shadow-2xl shadow-black">
          <input
            onChange={onInputChange}
            className="w-[90%] p-2 rounded-md"
            type="text"
          />
          <button
            onClick={onSubmit}
            className="w-[50%] bg-indigo-800 py-2 rounded-md"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
