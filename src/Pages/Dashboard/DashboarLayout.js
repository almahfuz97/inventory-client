import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function DashboarLayout() {
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content font-bold bg-slate-200">
                        <Link to='/dashboard/profile' className='btn text-center'>Profile</Link>
                    </ul>

                </div>
            </div>
        </div>
    )
}