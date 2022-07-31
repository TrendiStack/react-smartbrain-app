import React from 'react';

const Rank = ({ username, entries }) => {
  return (
    <div className="text-center text-white">
      <div className="text-2xl">{`${username},You're entry count it... `}</div>
      <div className="text-5xl">{`#${entries}`}</div>
    </div>
  );
};

export default Rank;
