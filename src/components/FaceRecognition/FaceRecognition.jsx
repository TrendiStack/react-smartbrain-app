import React from 'react';

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="flex justify-center">
      <div className="absolute mt-5">
        <img id="inputImage" src={imageUrl} alt="" width={500} height="auto" />
        <div>
          {boxes.map((box, id) => (
            <div
              key={id}
              className="bounding_box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
