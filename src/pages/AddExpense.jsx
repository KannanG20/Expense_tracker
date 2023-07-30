import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ExpenseAddOn from '../components/ExpenseAddOn'
import { useNavigate } from 'react-router-dom'

function AddExpense() {
    const [isCreated, setIsCreated] = useState(false)
    const navigate = useNavigate()
    useEffect(()=> {
        if(isCreated){
            navigate('/')
        }
    }, [isCreated])

  return (
    <>
        <ExpenseAddOn isCreated={setIsCreated}/>
    </>
  )
}

export default AddExpense