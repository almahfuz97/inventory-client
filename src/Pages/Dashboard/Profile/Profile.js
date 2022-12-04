import React, { useContext } from 'react'
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

export default function Profile() {
    const { loading, user } = useContext(AuthContext);

    return (
        <div>
            <h1 className='flex justify-center text-center font-bold text-xl mt-12'>Your Profile</h1>
            <div className=' flex justify-center '>
                <div className=' w-96 p-8'>
                    <h3 className='bg-slate-300  p-4 rounded-lg'>  <span className=' font-bold'>Name: </span> {user?.displayName}</h3>
                    <h3 className='bg-slate-300  p-4 mt-3 rounded-lg'>  <span className=' font-bold'>Email: </span> {user?.email}</h3>
                </div>
            </div>


        </div >
    )
}
