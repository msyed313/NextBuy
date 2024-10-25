import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <p className="text-lg text-white text-center mb-10">
        Welcome to [Your Website Name], where we are dedicated to providing the best products and services to our customers. Our mission is to enhance your shopping experience with quality and affordability.
      </p>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-white">
          Our mission is to deliver high-quality products while maintaining excellent customer service. We strive to create a seamless shopping experience for our customers, ensuring they find exactly what they need.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-lg text-white">
          <li>Customer Satisfaction</li>
          <li>Quality Products</li>
          <li>Integrity and Transparency</li>
          <li>Innovation</li>
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
        <p className="text-lg text-white">
          Our team is comprised of passionate individuals dedicated to serving our customers. Each member brings their unique skills and expertise to ensure you have a pleasant shopping experience.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg mb-4 text-white">
          We would love to hear from you! If you have any questions, feel free to reach out to us through our contact page.
        </p>
        <a
          href="/contact"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default About;
