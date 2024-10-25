import React, { useEffect } from 'react'
import CategoryProductCard from '../components/CategoryProductCard'
import { useSelector, useDispatch } from "react-redux";
import { getcategoryproducts } from '../features/CategoryProducts';
import { useParams } from 'react-router-dom'
function Product() {
  const { id } = useParams(); // Get the categoryId from the URL
  //console.log(id);
  const { error, loading, categoryproduct } = useSelector((state) => state.categoryproduct);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getcategoryproducts(id)); // Fetch products whenever the category ID changes
  }, [id,dispatch]);
  return (
    <>
      {loading && <p>Loading...</p>} {/* Display a loading state while fetching data */}
      {error !== null && <h1>something went wrong.. please try again</h1>} {/* Handle any error state */}
      {!loading && error === null && (<CategoryProductCard data={categoryproduct} />)
      }
    </>
  )
}

export default Product