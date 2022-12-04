import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider'

export default function DashboarLayout() {
    const { logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(res => {
                localStorage.removeItem('inventory-token')
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className='mt-2 p-2'>
                <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden">
                    <p className=' w-8 h-1 bg-black mb-px'></p>
                    <p className=' w-8 h-1 bg-black mb-px'></p>
                    <p className=' w-8 h-1 bg-black mb-px'></p>
                </label>
            </div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet />

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content space-y-2 font-bold bg-slate-200">
                        <Link to='/dashboard/products' className='btn text-center'>Products</Link>
                        <Link to='/dashboard/addProduct' className='btn text-center'>Add Product</Link>
                        <Link to='/dashboard/categories' className='btn text-center'>Categories</Link>
                        <Link to='/dashboard/profile' className='btn text-center'>Profile</Link>
                        <button onClick={handleLogOut} className='btn text-center'>Log Out</button>
                    </ul>

                </div>
            </div>
        </div>
    )
}
