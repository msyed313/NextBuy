import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddCategory = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Category name is required'),
      image: Yup.mixed().required('Please select an image file'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('image', values.image);

      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Category added successfully!');
          navigate('/categories');
        } else {
          alert('Failed to add category.');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Error adding category.');
      }
    },
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Add New Category</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            {...formik.getFieldProps('name')}
            className={`w-full px-3 py-2 border rounded focus:outline-none ${
              formik.touched.name && formik.errors.name ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'
            }`}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Select Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
            className={`w-full px-3 py-2 border rounded focus:outline-none ${
              formik.touched.image && formik.errors.image ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'
            }`}
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600 transition-all duration-200 w-full"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
