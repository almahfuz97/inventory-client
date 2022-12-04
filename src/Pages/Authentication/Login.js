import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';


const provider = new GoogleAuthProvider();

export default function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { user, loading, providerLogin, signIn } = useContext(AuthContext);
    const [spin, SetSpin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [loginEmail, setLoginEmail] = useState();
    const [token] = useToken(loginEmail)
    const [err, setErr] = useState('');

    if (token) return navigate('/inventory', { replace: true })

    const onSubmit = data => {
        SetSpin(true);
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                console.log(result);
                toast('Login successfull')
                SetSpin(false)
                setLoginEmail(data.email);
            })
            .catch(err => {
                setErr(err.message)
                SetSpin(false)
                console.log('errrr', err)
            })
    }


    if (loading) return <Spinner />
    return (
        <div className='my-12 mx-4'>
            <h1 className=' text-center font-bold text-3xl mb-8'>Manage Inventory</h1>
            <div className='flex justify-center'>
                <div className='w-96 shadow-lg shadow-blue-300 p-8 rounded-lg'>
                    <h3 className='text-center mb-9 font-bold'>Login</h3>
                    <p className=' text-red-500'>{err}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className=' text-sm' htmlFor="email">Email</label> <br />
                        <input type="email" placeholder="Email" className="border py-2 px-2 rounded-lg w-full mb-3"
                            {...register('email', { required: true })}
                        />
                        <p className=' text-red-500'> {errors?.email && 'Email is required'} </p>
                        <label htmlFor="password" className=' text-sm'>Password</label> <br />
                        <input type="password" placeholder="Password" className="  py-2 px-2 w-full border rounded-lg"
                            {...register('password', { required: true })}
                        />
                        <small>Forgot password?</small>
                        <p className=' text-red-500'> {errors?.email && 'Email is required'} </p>
                        {
                            spin ?
                                <div className='btn flex justify-center w-full mt-4'>
                                    <div className='border-4 w-4 h-4 border-dashed bg-red-500 animate-spin rounded-full'>

                                    </div>
                                </div>
                                :
                                <input type="submit" className='border p-2 rounded-lg hover:cursor-pointer hover:bg-slate-50 w-full mt-4' value="Login" />

                        }
                        <p className=' text-center text-xs mt-2'>New to Doctors Portal?
                            <Link to='/register'><span className='ml-2 text-green-700'>Create account?</span></Link></p>

                    </form>
                </div>
            </div>
        </div>
    )
}