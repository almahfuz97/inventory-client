import React, { useState } from 'react'
import toast from 'react-hot-toast';
import UpdateProductModal from '../../../Components/Modals/UpdateProductModal';
import Spinner from '../../../Components/Spinner/Spinner';

export default function ProductCard({ product, refetch }) {
    console.log(product)
    const [spin, setSpin] = useState(false);
    const [updateSpin, setUpdateSpin] = useState(false);

    const handleDelete = id => {
        const proceed = window.confirm('Do you really want to delete?')
        console.log(proceed)
        if (proceed) {
            setSpin(true)
            fetch(`${process.env.REACT_APP_url}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('inventory-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCound) {
                        toast.success('Product deleted successfully')
                    }
                    setSpin(false)
                })
                .catch(err => {
                    console.log(err)
                    setSpin(false)
                    toast.error('Something went wrong', err.message)
                })
        }
    }

    const handleUpdate = product => {

    }

    return (

        <div className="card bg-base-100 shadow-xl">
            <figure><img src={product.img} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {
                        product.product_name
                    }
                    <div className="badge badge-secondary text-slate-50">{product.availability}</div>
                </h2>
                <p>{product.description}</p>
                <p className=' font-bold'>${product.price}</p>
                <div className="card-actions justify-end mt-4">
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
                </div>
            </div>
            <UpdateProductModal show={true} refetch={refetch} product={product} />
        </div>

    )
}
