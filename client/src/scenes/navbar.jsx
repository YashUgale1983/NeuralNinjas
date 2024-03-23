import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "./../images/DocTime.png"
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { setLogout } from '../state/slices/initialSlice';
import { toast } from 'react-toastify';


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.doc.user);


    async function handleLogout(){
       try {
        const res = await axios({
            method:'GET',
            url: 'http://localhost:3000/logout',
            withCredentials: true
        })
        if(res.data.status === "success"){
            toast.success("Logging you out");
            setTimeout(() => {
                navigate("/");
                dispatch(setLogout());
              }, 2000);
        }
       }catch (error) {
        toast.error("Login failed. Check credentials or try again later...")
       }
    }

  return (

    <div className="navbar bg-blue-900 p-2">
        <div className="flex-1">
            <Link to="/home" className="btn btn-ghost normal-case text-xl">
                <img src={Logo} alt="" className="h-8 w-auto" />
                <p className='text-3xl ml-2 text-white font-normal'>Neural Ninjas</p>
            </Link>
        </div>

        {user ? (
            <div className="flex-none">
                <ul className="flex flex-row justify-between px-1 mr-5 text-white">
                <li className="flex flex-row gap-28">
                    <button><Link to="/home">Home</Link></button>
                    <button><Link to="/documentation">Documentation</Link></button>
                    <button onClick={handleLogout}>Logout</button>
                </li>
                </ul>
             </div>
        ) : (
            <div className='mr-5 text-white'>
                 <Link to='/login'>Login</Link>
            </div>
           
        )}

    </div>
  )
}

export default Navbar