import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loading, createUser, updateUser } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState();

    const [spin, setSpin] = useState(false);
    const [err, setErr] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if (token) return navigate('/dashboard');

    const onSubmit = data => {
        setErr('')
        setSpin(true);
        console.log(data)

        createUser(data.email, data.password)
            .then(result => {
                const userInfo = {
                    displayName: data.fullName
                }

                updateUser(userInfo)
                    .then(() => {
                        saveUser(data);
                    })
                    .catch(err => {
                        setSpin(false)
                        setErr(err.message)
                        console.log(err)
                    })
            })
            .catch(err => {
                setSpin(false)
                setErr(err.message);
            })
    }

    const saveUser = (data) => {
        const userInfo = {
            email: data.email,
            name: data.fullName,
        }
        console.log(userInfo)

        fetch(`${process.env.REACT_APP_url}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(resData => {
                console.log(resData)
                setCreatedUserEmail(data.email);
                setSpin(false);
            })
            .catch(err => {
                setSpin(false)
                console.log(err)

            })
    }

    if (loading) return <Spinner />
    return (
        <div className='my-16 mx-4'>
            <h1 className=' text-center font-bold text-3xl mb-8'>Manage Inventory</h1>
            <div className='flex justify-center'>
                <div className='w-96 shadow-lg -shadow-lg p-8 rounded-lg'>
                    <h3 className='text-center mb-9 font-bold'>Register</h3>
                    <p className=' text-red-500 text-xs font-semibold'>{err}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className=' text-sm' htmlFor="fullName">Full Name</label> <br />
                        <input type="text" placeholder="Full Name" className="border rounded-lg p-2 input input-bordered w-full mb-3"
                            {...register('fullName', { required: true })}
                        />
                        <p className=' text-red-500  text-xs'> {errors?.fullName && 'Full name is required!'} </p>
                        <label className=' text-sm' htmlFor="email">Email</label> <br />
                        <input type="email" placeholder="Email" className="border rounded-lg p-2 input input-bordered w-full mb-3"
                            {...register('email', { required: true })}
                        />
                        <p className=' text-red-500  text-xs'> {errors?.email && 'Email is required'} </p>
                        <label htmlFor="password" className=' text-sm'>Password</label> <br />
                        <input type="password" placeholder="Password" className="border rounded-lg p-2 input input-bordered w-full"
                            {...register('password', {
                                required: true, minLength: {
                                    value: 6,
                                    message: 'Password should be atleast 6 characters.'
                                }
                            })}
                        />
                        <p className=' text-red-500 text-xs'> {errors?.password && errors.password.message} </p>
                        {
                            spin
                                ? <div className='btn flex justify-center w-full mt-4'>
                                    <div className='border-4 w-4 h-4 border-dashed bg-red-500 animate-spin rounded-full'>
                                    </div>
                                </div>
                                : <input type="submit" className='border p-2 rounded-lg hover:cursor-pointer hover:bg-slate-50 w-full mt-4' value="Register" />

                        }

                        <p className=' text-center text-xs mt-2'>Already have an account?
                            <Link to='/login'><span className='ml-2 text-green-700'>Login here?</span></Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}