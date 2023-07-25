import React from 'react'
import {useState,useContext} from 'react'
import GithubContext from "../context/github/GithubContext"
import AlertContext from '../context/alert/AlertContext';
function UserSearch() {
    const{users,searchUsers,clearSearch}=useContext(GithubContext);
    const{setAlert}=useContext(AlertContext);
    const[text,setText,]=useState("");
    const handleChange=(e)=>
    {
        setText(e.target.value);
    }
    const handleClick=()=>
    {
        clearSearch();
    }
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        if(text==="")
        {
            setAlert("Please write something","gerror");
        }
        else
        {
            searchUsers(text);
        }
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-8 gap-8 '>
        <div>
            <form onSubmit={handleSubmit} >
                <div className="form-control">
                    <div className="relative">
                        <input type="text" className='w-full bg-gray-200 input input-lg pr-40 text-black' placeholder='Search' value={text} onChange={handleChange} />
                        <button type='submit' className='absolute top-0 right-0 rounded-l-none btn btn-lg'>Go</button>
                    </div>
                </div>
            </form>
        </div>
        {(users.length>0&& 
        <div>
           <button className='btn btn-ghost btn-lg' onClick={handleClick}>Clear</button>
           </div>)}
            
        
    </div>
  )
}

export default UserSearch