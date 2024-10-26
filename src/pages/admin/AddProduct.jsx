import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddProduct = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      description: '',
      imageFile: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Product title is required'),
      price: Yup.number()
        .positive('Price must be a positive number')
        .required('Price is required'),
      description: Yup.string().required('Description is required'),
      imageFile: Yup.mixed().required('Please select an image file'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('categoryId', categoryId);
      formData.append('images', values.imageFile);

      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Product added successfully!');
          navigate(`/categories/${categoryId}/products`);
        } else {
          alert('Failed to add product.');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Error adding product.');
      }
    },
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            {...formik.getFieldProps('title')}
            className={`w-full px-3 py-2 border rounded ${
              formik.touched.title && formik.errors.title ? 'border-red-500' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            {...formik.getFieldProps('price')}
            className={`w-full px-3 py-2 border rounded ${
              formik.touched.price && formik.errors.price ? 'border-red-500' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            {...formik.getFieldProps('description')}
            className={`w-full px-3 py-2 border rounded ${
              formik.touched.description && formik.errors.description ? 'border-red-500' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
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
            onChange={(e) => formik.setFieldValue('imageFile', e.currentTarget.files[0])}
            className={`w-full px-3 py-2 border rounded ${
              formik.touched.imageFile && formik.errors.imageFile ? 'border-red-500' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          />
          {formik.touched.imageFile && formik.errors.imageFile ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.imageFile}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600 transition-all duration-200 w-full"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
