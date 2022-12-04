import { isError, useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import ProductCard from './ProductCard';

export default function Products() {
    const { user } = useContext(AuthContext);
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/products?email=${user?.email}`);
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    })

    if (isLoading) return <Spinner />
    return (
        <div>
            <div className=' bg-slate-300 p-4 font-bold rounded-lg flex items-center justify-around'>
                <h3>All Products</h3>
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-2 mt-4'>

                {
                    products?.map(product => <ProductCard key={product._id} product={product} refetch={refetch} />)
                }
            </div>

            {
                products.length === 0 && <p>You haven't added any product</p>
            }
        </div>
    )
}
