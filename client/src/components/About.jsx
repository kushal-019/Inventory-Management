import React from 'react';

const About = () => {
  return (
    <div  id="about" className="min-h-screen p-8 text-black bg-white">
      {/* Header */}
      <div className="py-16 text-center">
        <h1 className="mb-6 text-5xl font-extrabold text-black">
          About <span className="text-midblue">Us</span>
        </h1>
        <p className="text-lg text-midblue">
          Learn more about our mission, vision, and the team behind Inventory App.
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col items-center gap-8 md:flex-row">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="C:\Users\user\Desktop\New folder (3)\react\Inventory-Management\client\src\assets\image.png"
            alt="About Us"
            className="rounded-lg shadow-lg"
          />
        </div>
        {/* Text */}
        <div className="w-full md:w-1/2">
          <h2 className="mb-4 text-3xl font-bold text-black">Our Mission</h2>
          <p className="mb-4 text-midblue">
            At Inventory App, we aim to revolutionize inventory management and e-commerce by delivering innovative and accessible solutions.
          </p>
          <h2 className="mb-4 text-3xl font-bold text-black">Our Vision</h2>
          <p className="text-midblue">
            We strive to empower businesses and individuals through technology, making daily operations smoother and more efficient.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <button className="px-8 py-4 font-semibold text-white transition rounded-lg bg-midblue hover:bg-lightblue">
          Join Us Today
        </button>
      </div>
    </div>
  );
};

export default About;
