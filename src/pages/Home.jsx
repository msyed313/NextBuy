import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import ProductCard from '../components/ProductCard'
import { Products } from '../features/Products'
import { getproducts } from '../features/Products';
function Home() {
    const { error, loading, product } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getproducts());
    }, []);
    return (
        <>
            {/* Hero Section */}
            <section className="bg-cover bg-center h-96">
                <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <div className="text-center">
                        <h1 className="text-white lg:text-5xl font-bold text-4xl">Welcome to Our Store</h1>
                        <p className="text-white text-lg mt-4">Find the best products for the best prices</p>
                        <a href="/categories" className="mt-6 inline-block px-8 py-3 bg-blue-500 text-white text-lg font-bold rounded hover:bg-blue-600">
                            Shop Now
                        </a>
                    </div>
                </div>
            </section>

            {/* Product Card */}
            {loading && <p>Loading...</p>} {/* Display a loading state while fetching data */}
            {error !== null && <h1>something went wrong.. please try again</h1>} {/* Handle any error state */}
            {!loading && error === null && (
                <ProductCard data={product} />)
            }


        </>
    )
}

export default Home