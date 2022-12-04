import React from 'react'

export default function CategoryCard({ category }) {
    console.log(category)

    const handleDelete = id => {

    }
    return (
        <div className=' flex justify-center'>
            <div className='mt-4 shadow p-4 rounded-lg w-1/2'>
                <div className=' flex justify-between'>
                    <h3 className=' font-bold text-xl'>{category.categoryName}</h3>
                    <button onClick={() => handleDelete(category._id)} className='btn'>Delete</button>
                </div>
            </div>
        </div>
    )
}
