import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdatedSlots } from '../state/slices/docSlice';
import { useNavigate } from 'react-router-dom';

const MySlots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.doc.user);
    const mySlots = useSelector((state)=> state.doc.mySlots);
    const [newSlotData, setNewSlotData] = useState({
        date: '',
        startTime: '',
        endTime: '',
    });

    useEffect(()=>{
        if(!user){
            navigate("/")
        }
    })


    // useEffect(() => {
    //     async function getMySlots() {
    //         try {
    //             const res = await axios({
    //                 method: "POST",
    //                 url: "http://localhost:3001/doctor/mySlots",
    //                 data: {
    //                     doctorId: user._id
    //                 },
    //                 withCredentials: true
    //             });
    //             if (res.data.success) {
    //                 setMySlots(res.data.data);
    //             }
    //         } catch (err) {
    //             console.log(err);
    //             toast.error("Something went wrong!!! Logout and login if this persists.");
    //         }
    //     }
    //     getMySlots();
    // }, []);

    
    async function handleCreateSlot() {
        try {
            // Format the date and time strings
            const formattedData = {
                date: newSlotData.date, 
                startTime: `${newSlotData.date}T${newSlotData.startTime}:00`, 
                endTime: `${newSlotData.date}T${newSlotData.endTime}:00`, 
            };
    
            const res = await axios({
                method: "POST",
                url: `http://localhost:3001/doctor/createSlot/${user._id}`,
                data: formattedData, 
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUpdatedSlots({ newSlot: res.data.data }));
                setNewSlotData({
                    date: '',
                    startTime: '',
                    endTime: '',
                });
                toast.success("Slot created successfully!");
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to create slot. Please try again.");
        }
    }
    


    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewSlotData({
            ...newSlotData,
            [name]: value,
        });
    }


    return (
        <>
            <Navbar />
            <div id='createSlot' className='mx-20 my-10'>
                <p className='text-white text-3xl mb-5'>Create Slot</p>
                <label htmlFor="date" className='mr-5'>Date:</label>
                <input type="date" id="date" name="date" value={newSlotData.date} onChange={handleInputChange} />
                <label htmlFor="startTime" className='mx-5'>Start time:</label>
                <input type="time" id="startTime" name="startTime" value={newSlotData.startTime} onChange={handleInputChange} />
                <label htmlFor="endTime" className='mx-5'>End time:</label>
                <input type="time" id="endTime" name="endTime" value={newSlotData.endTime} onChange={handleInputChange} />
                <div className='mt-5'>
                    <button className='bg-blue-900 p-2 rounded-xl text-white' onClick={handleCreateSlot}>Create</button>
                </div>
            </div>

            {mySlots?.map((slot) => (
                <div className='mx-20 my-6' key={slot._id}>
                    <div className="collapse collapse-arrow bg-gray-600">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            {/* Display slot-specific content here */}
                            {slot.date.slice(0,10)}
                        </div>
                        <div className="collapse-content">
                            {/* Display slot-specific content here */}
                            <p>{slot.startTime.slice(11,19)} to {slot.endTime.slice(11,19)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default MySlots;
