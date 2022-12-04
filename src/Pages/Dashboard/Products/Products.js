import { isError, useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import ProductCard from './ProductCard';

export default function Products() {
    const { user } = useContext(AuthContext);
    const [selected, setSelected] = useState('');
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email, selected],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/products?email=${user?.email}&category=${selected}`);
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    })

    const { data: categories, isLoading: isLoading2, isError, refetch: refetch2 } = useQuery({
        queryKey: ['categories', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/categories?email=${user?.email}`);
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error)
                return []
            }
        }
    })

    console.log(selected)
    if (isLoading || isLoading2) return <Spinner />
    return (
        <div>
            <div className=' bg-slate-300 p-4 font-bold rounded-lg flex items-center justify-between'>
                <h3>All Products</h3>
                <select onChange={(e) => setSelected(e.target.value)} value={selected} className='p-2' name="" id="">
                    <option value='allProducts'>All Products</option>
                    {
                        categories.map(category => <option key={category._id} value={category._id}>{category.categoryName}</option>)
                    }
                </select>
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-2 mt-4'>

                {
                    products?.map(product => <ProductCard key={product._id} product={product} refetch={refetch} />)
                }
            </div>

            {
                products.length === 0 && <p>You haven't added any product in this category</p>
            }
        </div>
    )
}
