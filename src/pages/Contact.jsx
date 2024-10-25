import React from 'react';

const Contact = () => {
  
  // Function to handle form submission
  const handleSubmit = (values, { resetForm }) => {
    console.log('Form data', values);
    alert('Message sent successfully!');
    resetForm(); // Reset the form after submission
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-white text-lg text-center mb-10">
        We would love to hear from you! Please fill out the form below to get in touch with us.
      </p>
          <form className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-semibold mb-2">Message</label>
              <input
                as="textarea"
                name="message"
                className="w-full p-2 border border-gray-300 rounded"
                rows="5"
              />
            </div>

            <button onClick={()=>handleSubmit} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Send Message
            </button>
          </form>
    </div>
  );
};

export default Contact;
