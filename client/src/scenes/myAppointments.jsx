import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.doc.user);
  const [appointments, setAppointments] = useState([]);

  useEffect(()=>{
    if(!user){
      navigate("/");
    }
  })

  useEffect(() => {
    async function fetchAppointments() {
      try {
        // Make a GET request to fetch the doctor's appointments
        const res = await axios.get(`http://localhost:3001/doctor/scheduledAppointments/${user._id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setAppointments(res.data.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error getting scheduled appointments. Try again later...");
      }
    }

    fetchAppointments();
  }, [user?._id]);

  console.log(appointments);

  return (
    <>
      <Navbar />
      <div className='m-8  rounded-xl'>
        <div className="join join-vertical w-full">
          {appointments?.map((appointment) => (
            <div  key={appointment._id} className='my-5 bg-gray-700'>
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="my-accordion-4" /> 
                <div className="collapse-title text-2xl font-bold">
                  {/* You can customize the content here */}
                  Appointment date: {appointment.date.slice(0,10)}
                </div>
                <div className="collapse-content"> 
                  <p>
                    {/* Display additional appointment details here */}
                    Start time: {appointment.startTime.slice(11,19)}<br />
                    End time: {appointment.endTime.slice(11,19)}<br />
                    Patient name: {appointment.patient.name}<br />
                    Email: {appointment.patient.email}<br />
                    Phone: {appointment.patient.phoneNumber}<br />
                  </p>
                  <p className='my-4 font-bold'>Waitlist : </p>
                  {appointment.waitlist.map((patient)=>(
                    <p key={patient.dateAdded} className='my-3'>
                      Patient name: {patient.name}<br />
                      Email: {patient.email}<br />
                      Phone: {patient.phoneNumber}<br />
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAppointments;
