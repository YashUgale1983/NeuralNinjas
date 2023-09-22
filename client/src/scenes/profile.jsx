import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import doctorIcon from "./../images/doctor-icon.jpeg";
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.doc.user);

  useEffect(()=>{
    if(!user){
      navigate("/")
    }
  })

  return (
    <>
    <Navbar />
    <div className='pt-20 text-white'>
      <div className='flex flex-col max-w-[1000px] mx-auto h-full'>
        <div className=''>
          <div className='flex flex-col justify-center items-center gap-5 mr-[12px] '>
            <div className='flex flex-col gap-4 justify-center items-center mb-2'>
              <img className=' w-[250px] rounded-full'  src={doctorIcon} alt='pic'/>
              <label className='text-2xl' >{user?.username}</label>
            </div>
          </div>
          <hr className='my-5 bg-gray100' />
          <span className='flex flex-col gap-5 text-center text-xl'>
            <p>Email : {user?.email}</p>
            <p>Phone no : {user?.phoneNumber}</p>
            <p>Expertise : {user?.expertise}</p>
            <p>Location : {user?.location}</p>
            <p>Consultation fee : {user?.consultationFees}</p>
            </span>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile