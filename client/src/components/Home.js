import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="text-center sm:mt-40">
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-customBlue">Welcome 👋!</h1>
        {/* Uncomment and dynamically set the username if needed */}
        {/* <h2 className="text-5xl my-4">{username}</h2> */}
        <div className="my-4">
          <p className="font-semibold text-base sm:text-lg lg:text-xl text-customBlue">Your notes on the cloud ☁️</p>
          <span className="text-sm sm:text-base lg:text-lg text-customBlue">
            I hope you are happy to use iNotebook to store your personal notes in the cloud.
          </span>
        </div>
        <Link
          to="/yournotes"
          className="text-lightBlue text-lg sm:text-xl lg:text-2xl border-2 px-6 py-1 border-customBorderColor rounded-lg font-semibold"
        >
          Add your Notes &rarr;
        </Link>
      </div>

    </>
  );
};

export default Home;
