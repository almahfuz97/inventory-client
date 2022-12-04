import React, { useContext } from 'react'
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

export default function Profile() {
    const { loading, user } = useContext(AuthContext);

    return (

        <div>
            <h1 className=' text-center font-bold text-3xl mb-4'>Welcome to Your Inventory!</h1>

            <div className=' flex justify-center'>
                <div className="card bg-base-100 min-w-[396px] shadow-xl">
                    <figure><img src={user?.photoUrl} alt="" /></figure>
                    <div className="card-body">
                        <p className=' font-bold'>Your Name:</p>
                        <h2 className="card-title bg-slate-50 shadow-sm p-4 rounded-lg w-full">
                            {
                                user.displayName
                            }
                        </h2>
                        <p className=' font-bold'>Your Email:</p>
                        <p className='bg-slate-50 shadow-sm p-4 rounded-lg w-full'>{user?.email}</p>
                        {/* <div className="card-actions justify-end mt-4">
                    {
                        updateSpin
                            ?
                            <Spinner />
                            :
                            <label htmlFor='update-product' onClick={() => handleUpdate(product)} className="badge badge-outline cursor-pointer hover:bg-slate-50 p-4">Update</label>
                    }
                    {
                        spin ?
                            <Spinner />
                            :
                            <div onClick={() => handleDelete(product._id)} className="badge badge-outline cursor-pointer hover:bg-slate-50 p-4">Delete</div>
                    }
                </div> */}
                    </div>
                    {/* <UpdateProductModal show={true} refetch={refetch} product={product} /> */}
                </div>
            </div>
        </div>
    )
}
