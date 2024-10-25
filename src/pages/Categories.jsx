import React, { useEffect } from 'react'
import CategoryCard from '../components/CategoryCard'
import { useSelector, useDispatch } from "react-redux";
import { getcategories } from '../features/Category';
function Categories() {
    const { error, loading, category } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getcategories());
    }, []);
  return (
    <>
         {loading && <p>Loading...</p>} {/* Display a loading state while fetching data */}
            {error !== null && <h1>something went wrong.. please try again</h1>} {/* Handle any error state */}
            {!loading && error === null && (
                <CategoryCard data={category} />)
            }
    </>
    
  )
}

export default Categories