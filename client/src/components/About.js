import React from 'react';

const About = () => {
  return (
    <div className="my-5 px-8 w-screen sm:px-10 lg:px-16">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-customPrimary">This is an about iNotebook:</h3>
      <div className="my-5">
        <h5 className="text-lg sm:text-xl lg:text-2xl font-medium text-customPrimary">Using iNotebook you could:</h5>
        <ol className="list-decimal list-inside mx-5 my-4 text-customPrimary space-y-2 w-9/12">
          <li className="border-b border-customSecondary py-2 text-sm sm:text-base lg:text-lg">Write your personal / professional notes</li>
          <li className="border-b border-customSecondary py-2 text-sm sm:text-base lg:text-lg">Secure your notes on the cloud</li>
          <li className="border-b border-customSecondary py-2 text-sm sm:text-base lg:text-lg">Access your notes from anywhere / from any device</li>
          <li className="border-b border-customSecondary py-2 text-sm sm:text-base lg:text-lg">Edit or Delete your notes</li>
          <li className="border-b border-customSecondary py-2 text-sm sm:text-base lg:text-lg">Give your notes a relevant tag</li>
          <li className="border-b border-customSecondary py-2 text-sm sm:text-base lg:text-lg">Maintain privacy using credentials</li>
        </ol>
      </div>
    </div>
  );
}

export default About;
