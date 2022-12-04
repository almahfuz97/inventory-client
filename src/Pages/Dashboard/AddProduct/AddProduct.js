import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'


export default function AddProduct() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const [spinner, setSpinner] = useState(false);
    const [bookSpin, setBookSpin] = useState(false);

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/categories?email=${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('inventory-token')}`
                    }
                });
                const data = await res.json();
                return data;

            } catch (error) {
                console.log(error)
            }
        }
    })


    const onSubmit = data => {

        const categoryId = data.category.split(',')[0]
        const categoryName = data.category.split(',')[1]

        console.log(categoryId, categoryName)
        console.log(data)
        if (categoryId === 'select') {
            toast.error('You must select a category')
            return;
        }

        setBookSpin(true)
        const formData = new FormData();
        const img = data.photo[0];
        formData.append('image', img);
        // console.log(formData[key])

        // save img to imgBB
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API}`, {
            method: 'POST',
            body: formData

        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData)
                if (imgData.success) {
                    const img = imgData.data.url;
                    const productData = {
                        sellerName: user.displayName,
                        sellerEmail: user.email,
                        product_name: data.title,
                        description: data.description,
                        img,
                        price: data.price,
                        createdAt: Date.now(),
                        categoryId,
                        categoryName,
                        availability: 'available'
                    }
                    saveProductToDatabase(productData);
                } else {
                    if (!imgData.success) {
                        toast.error('Something went wrong!')
                        setBookSpin(false)

                    }
                }
            })
            .catch(err => {
                setBookSpin(false)
                console.log(err)
            })

    }
    // add product to database function
    const saveProductToDatabase = productData => {
        fetch(`${process.env.REACT_APP_url}/addproduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    toast.success('Product added successfully!')
                    // navigate('/dashboard/myproducts')
                }
                setSpinner(false);
                setBookSpin(false)

            })
            .catch(err => {
                setSpinner(false)
                toast.error(err.message)
                console.log(err)
                setBookSpin(false)

            })
    }

    if (isLoading) return <Spinner />
    return (
        <div className='mt-8 mb-16'>
            <div className='fixed right-1/2'>
                {
                    spinner && <Spinner />
                }
            </div>
            <div>
                <div className='font-bold text-2xl md:text-3xl flex justify-center'>
                    <h1>Add Product</h1>
                </div>
                <div className=' flex justify-center mt-1'>
                    <div className='h-1 bg-red-600 w-12 md:w-12 lg:w-12'></div>
                </div>
            </div>

            {/* form */}
            <div className='flex justify-center'>
                <div className='mt-16 w-3/4 max-w-4xl'>
                    <div>
                        <h1 className=' font-bold text-xl'>Product Information</h1>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mt-8 '>
                                <label className='relative' htmlFor="title">
                                    Product Name
                                    <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                </label> <br />
                                <input
                                    type="text"
                                    {...register('title', { required: true })}
                                    className="rounded-lg border p-2 mt-4 w-full"
                                />
                            </div>
                            {/* amount and location */}
                            <div className='flex flex-col md:flex-row md:justify-between md:gap-4'>
                                <div className='mt-8 w-full md:w-1/2 '>
                                    <label className='relative' htmlFor="title">
                                        Price
                                        <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                    </label> <br />
                                    <input
                                        type="number"
                                        {...register('price', { required: true })}
                                        className="rounded-lg border p-2 mt-4 w-full"
                                    />
                                </div>
                                <div className='mt-8 w-full md:w-1/2 '>
                                    <label className='relative' htmlFor="title">
                                        Mobile Number
                                        <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                    </label> <br />
                                    <input
                                        type="number"
                                        {...register('phone', { required: true })}
                                        className="rounded-lg border p-2 mt-4 w-full"
                                    />
                                </div>
                            </div>
                            {/* details description */}
                            <div className='mt-16'>
                                <div>
                                    <h1 className=' font-bold text-xl'>Details Information</h1>
                                </div>
                                <div className='mt-8'>
                                    <label className='relative' htmlFor="">
                                        Descriptions
                                        <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                    </label> <br />
                                    <textarea {...register('description', { required: true })} className=' w-full mt-4 border p-2 rounded-lg min-h-[200px]' placeholder='Description'></textarea>
                                </div>

                                <div className='flex flex-col md:flex-row md:justify-between md:gap-4'>
                                    <div className='mt-8 w-full md:w-1/2 '>
                                        <label className='relative' htmlFor="title">
                                            Upload an image
                                            <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                        </label> <br />
                                        <input type="file" placeholder="Upload photo" className="border rounded-lg p-2 w-full mb-3 mt-4"
                                            {...register('photo', { required: 'Image is required' })}
                                        />
                                        {
                                            errors?.photo && <p className=' text-red-500'>{errors.photo.message}</p>
                                        }
                                    </div>
                                    <div className='mt-8 w-full md:w-1/2 '>
                                        <label className='relative' htmlFor="title">
                                            Product Category
                                            <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                        </label> <br />
                                        {
                                            <select
                                                {...register('category', { required: true })} className=' w-full rounded-lg mt-4 border p-4'
                                                defaultValue='select'
                                            >

                                                <option value={['select', 'select']}>Select a catergory</option>
                                                {
                                                    categories.map(category => <option key={category._id} value={[category._id, category.category]}>
                                                        {category.categoryName}
                                                    </option>)
                                                }

                                            </select>

                                        }
                                        {
                                            categories?.length === 0 && <p className=' text-red-500 mt-2'>Add a category first from category section</p>
                                        }
                                        {
                                            errors?.category && <p className=' text-red-500'>{errors.category.message}</p>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* photo */}
                            <div className='mt-16'>

                                <div className='mt-8'>
                                    {
                                        bookSpin ?
                                            <Spinner />
                                            :
                                            <button type="submit" className="sm:py-2.5 py-1.5 px-1.5 sm:px-5 mr-2 mb-2 text-sm font-semibold text-white focus:outline-none bg-primary-color rounded-lg border border-gray-200 hover:text-slate-300 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Submit</button>
                                    }
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}