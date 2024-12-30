
import React from 'react';
import image from '../assets/image.png';

const About = () => {
  return (
    <div id="about" className="min-h-screen px-4 py-16 bg-gray-50 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          About <span className="text-midblue">Us</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Learn more about our mission, vision, and the team behind Inventory App.
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col items-center gap-8 md:flex-row">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={image}
            alt="About Us"
            className="shadow-xl rounded-2xl shadow-midblue"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="mb-6 text-lg text-gray-600">
            At Inventory App, we aim to revolutionize inventory management and e-commerce by delivering innovative and accessible solutions.
          </p>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Vision</h2>
          <p className="text-lg text-gray-600">
            We strive to empower businesses and individuals through technology, making daily operations smoother and more efficient.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <button className="p-3 font-semibold text-white transition rounded-lg bg-midblue hover:bg-lightblue focus:outline-none focus:ring-2">
          Join Us Today
        </button>
      </div>
    </div>
  );
};

export default About;
