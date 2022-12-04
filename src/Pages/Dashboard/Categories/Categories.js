import { useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import AddCategoryModal from '../../../Components/AddCategoryModal/AddCategoryModal';
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import CategoryCard from './CategoryCard';

export default function Categories() {
    const { user } = useContext(AuthContext);
    const [spin, setSpin] = useState(false);
    const { data: categories, isLoading, isError, refetch } = useQuery({
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
    const addCategory = (name) => {
        console.log(name)
        const categoryInfo = {
            userEmail: user?.email,
            categoryName: name
        }

        fetch(`${process.env.REACT_APP_url}/categories`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(categoryInfo)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    refetch();
                    toast.success('Category added successfully!')
                }
                else {
                    toast.error('Something went wrong!')
                }
                setSpin(false)

            })
            .catch(err => {
                toast.error('Something went wrong!')
                console.log(err)
            })
    }
    if (isLoading) return <Spinner />
    return (
        <div className=''>
            <div className=' bg-slate-300 p-4 rounded-lg flex items-center justify-between'>
                <h3 className=' font-bold'>All Categories</h3>
                <label onClick={() => setSpin(false)} htmlFor="add-category" className='bg-slate-400 text-lg  font-bold rounded-lg p-2 cursor-pointer hover:bg-slate-500'>
                    <span className='font-bold text-2xl mr-2 text-green-400'>+</span>
                    Add Category
                </label>
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    categories?.map(category => <CategoryCard key={category._id} refetch={refetch} category={category}></CategoryCard>)
                }
            </div>
            <AddCategoryModal setSpin={setSpin} spin={spin} addCategory={addCategory}></AddCategoryModal>

        </div>
    )
}
