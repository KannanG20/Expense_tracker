import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAsyncError } from 'react-router-dom'
import DeleteDialog from '../components/DeleteDialog'
import ExpenseData from '../components/ExpenseData'
import NavMenu from '../components/NavMenu'

function Expenses() {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState(data)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [id, setId] = useState(null)
    const [isDeleted, setIsDeleted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setIsEmpty(false)
            try {
                const expenses = await fetch(`${process.env.REACT_APP_API}/expenses`);
                const res = await expenses.json()
                if(!expenses.ok){
                    console.log(res);
                    return setLoading(false)
                }

                setData( res.results)
                setFilteredData(res.results); 
                if(res.results.length <= 0){
                    setIsEmpty(true)
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error);
            }    
        }
        fetchData(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleted])

    
    const columns = [
        { dataField: 'name', text: 'Name' },
        { dataField: 'category', text: 'Category' },
        { dataField: 'dateofexpense', text: 'Date of Expense' },
        { dataField: 'amount', text: 'Amount' },
        { dataField: 'updatedAt', text: 'Updated At' },
        { dataField: 'createdBy', text: 'Created By' },
        
    ]

    const itemsPerPage = 8;

    const dialogToggle = (isOpened, id) => {
        setDialogOpen(isOpened)
        setId(id)
    }


  return (
    <div className=' h-screen w-full flex justify-center items-center bg-gray-100 overflow-y-hidden relative'>
        <div className='w-full md:w-[85%] bg-white h-full md:h-[65%] flex items-center flex-col rounded-lg '>
            <NavMenu data={filteredData} allData={data} setFilteredData={setFilteredData} />
            <ExpenseData data={filteredData} columns={columns} itemsPerPage={itemsPerPage} dialogToggle={dialogToggle} loading={loading} isEmpty={isEmpty}/>
        </div>
        {dialogOpen && <DeleteDialog dialogToggle={dialogToggle} id={id} setIsDeleted={setIsDeleted}/>}
    </div>
  )
}

export default Expenses