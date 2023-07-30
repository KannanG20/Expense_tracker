import React from 'react'

function DeleteDialog({ dialogToggle, id, setIsDeleted }) {

  const handleDeleteItem = async () => {
    try {
        const requestOptions = {
            method: 'DELETE',
        }
        const createExpense = await fetch(`${process.env.REACT_APP_API}/expense/${id}`, requestOptions)
        const res = await createExpense.json()
        if(!createExpense.ok){
            console.log(res)
        }
        dialogToggle(false);
        setIsDeleted(true)
    } catch (error) {
        console.log(error.message)
    }
  }

  return (
    <div className=' absolute h-screen w-full flex justify-center items-center backdrop-blur-sm'>
        <div className=' w-72 p-5 rounded-md h-40 flex flex-col justify-center gap-5 items-center bg-slate-200'>
            <h1>Are you sure want to delete the expense?</h1>
            <div className=' flex w-full justify-end items-center gap-3'>
                <button onClick={(e) => dialogToggle(false)} className=' text-white bg-gray-700 py-1 px-5'>No</button>
                <button onClick={handleDeleteItem} className=' text-white bg-red-500 py-1 px-5'>Yes</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteDialog