import React from 'react'

function ProductCard({ data }) {
    console.log(data);
    return (
        <section className="py-12">

            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Product Card */}
                    {data && data.slice(0, 6).map((value,index) => (
                        <div className="border rounded-lg shadow-lg overflow-hidden">
                            <img src={value.images[0]} alt="Product 1" className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">{value.title}</h3>
                                <p className="text-white text-lg font-semibold mt-2">${value.price}</p>
                                <a href={`/categories`} className="block mt-4 text-white hover:underline">
                                    View Details
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>


        </section>

    )
}

export default ProductCard