import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

export default function CategoryCard({ category, refetch }) {
    console.log(category)
    const [spin, setSpin] = useState(false);
    const { user } = useContext(AuthContext);

    const handleDelete = id => {
        setSpin(true)
        console.log(id);

        fetch(`${process.env.REACT_APP_url}/categories/${id}/${user?.email}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('inventory-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount) {
                    refetch();
                    toast.success('Deleted Successfully')
                }
                setSpin(false)
            })
            .catch(err => {
                console.log(err)
                setSpin(false)
            })
    }
    return (
        <div className=' flex justify-center'>
            <div className='mt-4 shadow p-4 rounded-lg w-1/2'>
                <div className=' flex justify-between'>
                    <h3 className=' font-bold text-xl'>{category.categoryName}</h3>
                    {
                        spin ?
                            <Spinner />
                            :
                            <button onClick={() => handleDelete(category._id)} className='btn'>Delete</button>

                    }
                </div>
            </div>
        </div>
    )
}
