import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';

export default function UpdateProductModal({ product, refetch }) {
    console.log(product)
    const [spin, setSpin] = useState(false);
    const [err, setErr] = useState('');
    const [showModal, setShowModal] = useState(true);

    const handleUpdate = (e) => {
        setErr('')
        e.preventDefault();
        const form = e.target;
        if (form.productName.value === '') {
            setErr('Name required');
            setSpin(false)

            return
        };
        if (form.price.value === '') {
            setErr('Price required');
            setSpin(false)

            return
        };

        if (product.price === form.price.value && product.product_name === form.productName && form.availability.value === product.availability) {
            setErr(" You haven't change anything!")
            setSpin(false)

            return;
        }

        const updatedDoc = {
            product_name: form.productName.value,
            price: form.price.value,
            availability: form.availability.value
        }

        fetch(`${process.env.REACT_APP_url}/products/${product._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('inventory-token')}`
            },
            body: JSON.stringify(updatedDoc)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    toast.success('Updated successfully')
                    refetch();
                    setShowModal(false)
                }
                setSpin(false)

            })

    }
    return (
        <div>
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="update-product" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form onSubmit={handleUpdate} className=''>
                        {
                            <p className=' text-red-500'>{err}</p>
                        }
                        <label htmlFor="">Product Name</label><br />
                        <input type="text" name='productName' placeholder='Product Name' className=' p-2 rounded-lg mt-2 shadow-sm w-full mb-3 ' /> <br />

                        <label htmlFor="">Product Price</label><br />
                        <input type="text" name='price' placeholder='Price' className=' p-2 rounded-lg mt-2 shadow-sm w-full  mb-3' /> <br />

                        <label htmlFor="">Availability</label>
                        <select defaultValue='available' name="availability" id="" className=' p-2 ml-4'>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>
                        <br />

                        <input onClick={() => setSpin(true)} htmlFor='update-product' type='submit' value='Add' className='mr-4 p-2 px-4 text-white mt-2 cursor-pointer rounded-lg bg-green-400' />
                        {
                            spin && <Spinner />
                        }
                        <label htmlFor="update-product">Cancel</label>
                    </form>

                </div>
            </div>
        </div>
    )
}
