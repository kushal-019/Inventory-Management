// import React from 'react';
// import image from '../assets/image.png';

// const About = () => {
//   return (
//     <div  id="about" className="min-h-screen p-8 text-black bg-white">
//       {/* Header */}
//       <div className="py-16 text-center">
//         <h1 className="mb-6 text-5xl font-extrabold text-black">
//           About <span className="text-midblue">Us</span>
//         </h1>
//         <p className="text-lg text-midblue">
//           Learn more about our mission, vision, and the team behind Inventory App.
//         </p>
//       </div>

//       {/* About Section */}
//       <div className="flex flex-col items-center gap-8 md:flex-row">
//         {/* Image */}
//         <div className="w-full md:w-1/2">
//           <img
//             src={image}
//             alt="About Us"
//             className="shadow-2xl rounded-2xl shadow-midblue "
//           />
//         </div>
//         {/* Text */}
//         <div className="w-full md:w-1/2">
//           <h2 className="mb-4 text-3xl font-bold text-black">Our Mission</h2>
//           <p className="mb-4 text-midblue">
//             At Inventory App, we aim to revolutionize inventory management and e-commerce by delivering innovative and accessible solutions.
//           </p>
//           <h2 className="mb-4 text-3xl font-bold text-black">Our Vision</h2>
//           <p className="text-midblue">
//             We strive to empower businesses and individuals through technology, making daily operations smoother and more efficient.
//           </p>
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div className="mt-16 text-center">
//         <button className="px-8 py-4 font-semibold text-white transition rounded-lg bg-midblue hover:bg-lightblue">
//           Join Us Today
//         </button>
//       </div>
//     </div>
//   );
// };

// export default About;


import React from 'react';
import image from '../assets/image.png';

const About = () => {
  return (
    <div id="about" className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          About <span className="text-blue-600">Us</span>
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
            className="shadow-xl rounded-2xl shadow-blue-600"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6">
            At Inventory App, we aim to revolutionize inventory management and e-commerce by delivering innovative and accessible solutions.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-600">
            We strive to empower businesses and individuals through technology, making daily operations smoother and more efficient.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <button className="px-8 py-4 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500">
          Join Us Today
        </button>
      </div>
    </div>
  );
};

export default About;
