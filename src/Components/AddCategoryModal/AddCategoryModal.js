import React from 'react'
import Spinner from '../Spinner/Spinner';

export default function AddCategoryModal({ addCategory, spin, setSpin }) {
    const handleAddCategory = (e) => {
        e.preventDefault();
        const cName = e.target.cName.value;
        console.log(cName)
        addCategory(cName);
    }
    return (
        <div>
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="add-category" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form onSubmit={handleAddCategory}>
                        <label htmlFor="">Category Name</label><br />
                        <input type="text" name='cName' placeholder='Category Name' className=' p-2 rounded-lg mt-2 shadow-sm' /> <br />
                        <input onClick={() => setSpin(true)} htmlFor='add-category' type='submit' value='Add' className=' p-2 px-4 text-white mt-2 cursor-pointer rounded-lg bg-green-400' />
                        {
                            spin && <Spinner />
                        }
                        <label htmlFor="add-category">Cancel</label>
                    </form>

                </div>
            </div>
        </div>
    )
}
