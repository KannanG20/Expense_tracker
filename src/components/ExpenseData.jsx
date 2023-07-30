import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const ExpenseData = ({ data, columns, itemsPerPage, dialogToggle, loading, isEmpty }) => {

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = localStorage.getItem('auth');
        const getUser = await fetch(`${process.env.REACT_APP_API}/user/${user}`)
        const userRes = await getUser.json()
        if(!getUser.ok) {
          return console.log(userRes)
        } 
        setUser(userRes.results)

      } catch (error) {
        console.log(error.message);
      }
    }
      fetchUser()
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const maxPaginationLinks = 5;

  const halfMaxLinks = Math.floor(maxPaginationLinks / 2);
  let startIndex = currentPage - halfMaxLinks;
  let endIndex = currentPage + halfMaxLinks;

  if (startIndex < 1) {
    startIndex = 1;
    endIndex = Math.min(totalPages, maxPaginationLinks);
  }
  if (endIndex > totalPages) {
    endIndex = totalPages;
    startIndex = Math.max(1, totalPages - maxPaginationLinks + 1);
  }


  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate pagination links
  const paginationLinks = [];
  for (let i = startIndex; i <= endIndex; i++)  {
    paginationLinks.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={currentPage === i ? 'active text-red-600' : ''}
      >
        {i}
      </button>
    );
  }

  return (
    <div className='w-full flex md:items-center flex-col relative'>
        <div className='overflow-x-scroll md:overflow-hidden w-full flex md:items-center md:justify-center '>
            <table className=' w-[95%] border-collapse'>
                <thead>
                <tr>
                    {columns.map((column) => (
                    <th className=' border-[1px] border-black py-2 bg-gray-400 px-5 md:px-0' key={column.dataField}>{column.text}</th>
                    ))}
                </tr>
                </thead>
                {loading ? <div className='flex justify-center w-full items-center absolute h-full'><span>Fetching Data...</span></div>
                :
                      isEmpty ? <div className='flex justify-center w-full items-center absolute h-full'><span>No Data</span></div>
                      :
                      <tbody>
                        {data
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((data) => (
                            <tr key={data._id}>
                                <td className='text-center border-[1px] border-black py-2 px-5 md:px-0'>{data.name}</td>
                                <td className='text-center border-[1px] border-black py-2 px-5 md:px-0'>{data.category}</td>
                                <td className='text-center border-[1px] border-black py-2 px-5 md:px-0'>{data.dateofexpense}</td>
                                <td className='text-center border-[1px] border-black py-2 px-5 md:px-0'>{data.amount}</td>
                                <td className='text-center border-[1px] border-black py-2 px-5 md:px-0'>{data.updatedAt}</td>
                                <td className='text-center border-[1px] border-black py-2 px-5 md:px-0'>{user.email === data.createdBy ? 'me' : data.createdBy}</td>

                                <td className=' flex justify-center gap-2 border-[1px] border-black py-2 px-5 md:px-0'>
                                    <Link to={`/update-expense/${data._id}`}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link>
                                    <button onClick={()=> dialogToggle(true, data._id)}>
                                      <FontAwesomeIcon icon={faTrash} color='red'/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                      </tbody>
              }
            </table>
        </div>
      <div className=" flex gap-2 py-3 w-full justify-center items-center">
        {currentPage > 1 && (
          <button  className=' text-black' onClick={() => handlePageChange(currentPage - 1)}>{"<"}</button>
        )}
        
            {paginationLinks}
        
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>{">"}</button>
        )}
      </div>
    </div>
  );
};

export default ExpenseData;
