import React from "react";
import PhoneImg from "./../images/phone.jpeg"

const Phone = ()=>{
    return(
        <>
            <div className="flex flex-row justify-center m-20">
                <div className="mockup-phone">
                    <div className="camera"></div> 
                    <div className="display">
                        <img src={PhoneImg} className="w-[300px] " alt="" />
                    </div>
                </div>
                <div className="w-1/2 text-5xl">
                   <br /><br /> User friendly app available on PlayStore now. <br /> <br /><br />Users now have to flexibility to choose the doctor, time, location and filter according to their needs.
                </div>
            </div>
        </>
    )
}

export default Phone;