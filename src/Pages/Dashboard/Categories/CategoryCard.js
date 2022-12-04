import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

export default function CategoryCard({ category, refetch }) {
    console.log(category)
    const [spin, setSpin] = useState(false);
    const { user } = useContext(AuthContext);

    const handleDelete = id => {
        const proceed = window.confirm('Do you want to delete it?');
        if (proceed) {
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
    }
    return (
        <div className=''>
            <div className='mt-4 shadow-md p-4 rounded-lg'>
                <div className='justify-between'>
                    <h3 className=' text-center font-bold text-xl'>{category.categoryName}</h3>
                    {
                        spin ?
                            <Spinner />
                            :
                            <div className=' flex justify-center'>
                                <button onClick={() => handleDelete(category._id)} className='p-2 text-center shadow hover:bg-slate-50 rounded-lg border mt-4'>Delete</button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
