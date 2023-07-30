import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavMenu({ data, setFilteredData, allData }) {
    const [menuToggle, setMenuToggle] = useState(false);
    const [query, setQuery] = useState('')

    const handleToggleMenu = ()=>{
        setMenuToggle(prev => !prev);
    }

    const handleQuery = (e) => {
        e.preventDefault();
        // Filter the data based on the query
        if (query.trim() === '') {
          setFilteredData(allData);
        } else {
          const filtered = data.filter((item) =>
            item.name?.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredData(filtered)
        }
      };

    const handleFilter = () => {
        const sortedData = data.sort((a, b) => {
            const dateA = new Date(
              a.dateofexpense?.split('/').reverse().join('/')
            ).getTime();
            const dateB = new Date(
              b.dateofexpense?.split('/').reverse().join('/')
            ).getTime();
        
            return dateA - dateB;
          });
          
          // Since sort() modifies the original array in place, you should create a copy of the sorted data.
          // Otherwise, it will modify the original 'data' array as well.
          setFilteredData([...sortedData]);
          setMenuToggle(false)
    }
      
  return (
    <div className=' flex justify-between gap-5 md:gap-0 w-[95%] flex-col md:flex-row items-center py-5'>
        <span className=' font-semibold text-2xl'>Expenses</span>
        <div className=' gap-5 hidden sm:flex'>
            <button className=' md:px-5 py-1 border-black border-[1px] text-sm md:text-lg ' onClick={handleFilter}>Filter Expenses</button>
            <form onSubmit={handleQuery} className=' border-black border-[1px] px-2'>
                <input type='Search' placeholder='search expenses' className=' outline-none w-full h-full' onChange={(e)=> setQuery(e.target.value)}/>
            </form>
            <Link to='/create-expense' className=' bg-green-500 md:px-5 py-1 text-white font-semibold text-sm md:text-lg'>New Expense</Link>
        </div>

        <div className=' flex gap-5 justify-between items-center sm:hidden w-full relative'>
            <form onSubmit={handleQuery} className=' border-black border-[1px] px-2 py-2 w-[90%] flex items-center'>
                <input type='text' placeholder='search expenses' className=' outline-none w-full h-full' onChange={(e)=> setQuery(e.target.value)}/>
                <FontAwesomeIcon icon={faSearch} onClick={handleQuery}/>
            </form>
            <FontAwesomeIcon icon={faBars} size="2x" onClick={handleToggleMenu}/>
            {menuToggle && 
                <div className=' absolute bottom-[-80px] bg-white right-2 flex flex-col z-50'>
                    <button onClick={handleFilter} className=' px-5 py-2 border-black border-[1px] text-sm md:text-lg '>Filter Expenses</button>
                    <Link to='/create-expense' className=' bg-green-500 px-5 py-2 text-white font-semibold text-sm md:text-lg '>New Expense</Link>
                </div>
            }
        </div>
    </div>
  )
}

export default NavMenu;