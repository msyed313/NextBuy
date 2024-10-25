import React from 'react'
import { useDispatch } from 'react-redux';
import { getcategoryproducts } from '../features/CategoryProducts'
import { Link } from 'react-router-dom';
function CategoryCard({ data }) {
  //console.log(data);
  const dispatch = useDispatch();

  // Function to handle category click
  const handleCategoryClick = (categoryId) => {
    console.log('sending category id: ',categoryId);
    dispatch(getcategoryproducts(categoryId)); // Dispatch the thunk with the selected category ID


  };
  return (
    <div className="pt-10 pb-10 container mx-auto px-4 py-15">
      <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {data.slice(0,5).map((category) => (
          <div key={category.id} className="border rounded-lg shadow-lg overflow-hidden">
            <img src={category.image} alt={category.name} className="w-full h-64 object-cover" />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-xl mb-2">{category.name}</h3>
              <button
                onClick={() => handleCategoryClick(category.id)}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Explore {category.name}
                </Link>
              </button>


            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryCard