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
        <div className=' m-12'>
            <div className=' bg-slate-300 p-4 rounded-lg flex items-center justify-around'>
                <h3>All Categories</h3>
                {/* <label  className="btn">open modal</label> */}
                <label onClick={() => setSpin(false)} htmlFor="add-category" className='bg-slate-400 text-xl  font-bold rounded-lg p-2'>
                    <span className='font-bold text-2xl text-green-400'>+</span>
                    Add Category
                </label>
            </div>
            <div>
                {
                    categories?.map(category => <CategoryCard key={category._id} refetch={refetch} category={category}></CategoryCard>)
                }
            </div>
            <AddCategoryModal setSpin={setSpin} spin={spin} addCategory={addCategory}></AddCategoryModal>

        </div>
    )
}
