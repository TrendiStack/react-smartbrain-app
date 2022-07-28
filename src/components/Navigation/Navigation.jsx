import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="flex justify-end">
        <p
          onClick={() => onRouteChange('signin')}
          className="text-xl underline p-6 font-bold cursor-pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className="flex justify-end">
        <p
          onClick={() => onRouteChange('signin')}
          className="text-xl underline p-6 font-bold cursor-pointer"
        >
          Sign in
        </p>
        <p
          onClick={() => onRouteChange('register')}
          className="text-xl underline p-6 font-bold cursor-pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
