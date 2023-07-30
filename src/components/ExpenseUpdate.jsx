import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ExpenseUpdate() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)
    
    const {id} = useParams()
    const navigate = useNavigate()
    
    useEffect(()=> {
        const expenseData = async ()=>{
            try {
                const data = await fetch(`${process.env.REACT_APP_API}/expense/${id}`)
                const res = await data.json()
                if(!data.ok){
                    console.log(res)
                }
                console.log(res.results)
                setName(res.results.name)
                setSelectedDate(new Date(parseDate(res.results.dateofexpense)))
                setDesc(res.results.description)
                setCategory(res.results.category)
                setAmount(res.results.amount)
            } catch (error) {
                console.log(error);
            }
        }
        expenseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const parseDate = (dateString) => {
        const parts = dateString.split('/');
        // Make sure parts has day, month, year in the correct order (dd/MM/yyyy)
        if (parts.length === 3) {
          const [day, month, year] = parts;
          return `${month}/${day}/${year}`;
        }
        return dateString;
      };

      const handleUpdateExpense = async (e) => {
        e.preventDefault();
        try {
            const user = localStorage.getItem('auth');
            const getUser = await fetch(`${process.env.REACT_APP_API}/user/${user}`)
            const userRes = await getUser.json()
            const expenseData = {
                name: name,
                description: desc,
                category: category,
                dateofexpense: selectedDate.toLocaleDateString('en-GB'),
                updatedAt: new Date().toLocaleDateString('en-GB'),
                createdBy: userRes.results.email,
                amount: amount
            }
            const requestOptions = {
                method: 'PUT',
                headers: { 'content-Type': 'application/json'},
                body: JSON.stringify(expenseData)
            }
            const createExpense = await fetch(`${process.env.REACT_APP_API}/expense/${id}`, requestOptions)
            const res = await createExpense.json()
            if(!createExpense.ok){
                console.log(res)
            }
            navigate('/')
        } catch (error) {
            console.log(error);
        }  
    }

  return (
    <div className=' flex w-full h-screen justify-center items-center '>
        <div className=' w-full md:w-[20%] bg-slate-300 rounded-lg flex items-center flex-col justify-center gap-5 h-full md:h-[60%]'>
            <span className=' font-semibold text-xl'>Edit Expense</span>
            <form className='flex flex-col w-[90%] gap-2' onSubmit={handleUpdateExpense}>
                <label for='name' className=' font-semibold'>Name</label>
                <input type='text' id='name' onChange={(e) => setName(e.target.value)} className=' py-1 px-2 border-none outline-none' value={name}/>
                <label for='description' className=' font-semibold'>Description</label>
                <input type='text' id='description' onChange={(e) => setDesc(e.target.value)} className=' py-1 px-2 border-none outline-none' value={desc}/>
                <label for='category' className=' font-semibold'>Category</label>
                <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value=''>Select a category</option>
                    <option value='health'>Health</option>
                    <option value='electronics'>Electronics</option>
                    <option value='travel'>Travel</option>
                    <option value='education'>Education</option>
                    <option value='others'>Others</option>
                </select>                
                <label for='date' className=' font-semibold'>Date of Expense</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date)=> setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy" 
                    placeholderText="Select a date"
                    id='date'
                    
                />
                <label for='eamount' className=' font-semibold'>Expense Amount</label>
                <input type='text' id='eamount' value={amount} onChange={(e)=> setAmount(e.target.value)} inputMode='numeric' pattern='[0-9]*' className=' py-1 px-2 border-none outline-none'/>
                <div className=' w-full flex justify-between items-center'>
                    <Link to='/' className=' bg-gray-700 text-white px-5 py-1'>cancel</Link>
                    <button className=' bg-green-400 text-white px-5 py-1'>Create</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ExpenseUpdate