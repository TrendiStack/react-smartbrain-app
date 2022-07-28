import React from 'react';
import { GiBrain } from 'react-icons/gi';

const Logo = () => {
  return (
    <div className="mt-0 m-8">
      <div
        className="Tilt shadow-2xl "
        options={{ max: 25 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner flex justify-center items-center">
          <GiBrain size={150} />
        </div>
      </div>
    </div>
  );
};

export default Logo;
