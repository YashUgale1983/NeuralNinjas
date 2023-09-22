import Logo from "./../images/DocTime.png"
import { useFormik } from "formik";
import { SignupSchema } from "./YupConfig";
import { toast } from 'react-toastify';
import axios from "axios";
import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SiAccenture } from "react-icons/si";
import { setLogin, setSlots } from "../state/slices/docSlice";


const initialValues = {
    username: "",
    email: "",
    password: "",
    location: "",
    expertise: "",
    fees: 0,
    phoneNumber: ""
}


const Signuppage = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: async(values)=>{
            //here, make the api call to send otp
            const username = values.username;
            const email = values.email;
            const password = values.password;
            const location = values.location;
            const expertise = values.expertise;
            const fees = values.fees;
            const phoneNumber = values.phoneNumber;

            try{
                const res = await axios({
                    method: "POST",
                    url: "http://localhost:3001/docAuth/signup",
                    data: {
                      username,
                      email,
                      password,
                      location,
                      expertise,
                      fees,
                      phoneNumber
                    },
                    withCredentials: true,
                  });
                const mySlots = await axios({
                    method: "POST",
                    url: "http://localhost:3001/doctor/mySlots",
                    data:{
                        doctorId: res.data.data.user._id,
                    },
                    withCredentials: true,
                })
                if(res.data.status === "success" && mySlots.data.success){
                    toast.success("Logging you in...");
                    setTimeout(() => {
                        navigate("/home");
                        dispatch(setSlots({ mySlots: mySlots.data.data }));
                        dispatch(setLogin({user: res.data.data.user}));
                      }, 2000);
                }
            }catch(err){
                toast.error("Login failed. Check credentials or try again later...")
            }
        }
    })


    return (
        <>
        
        <Link to='/home' className='flex flex-row p-5 items-center justify-center space-x-3 bg-blue-900'>
            <img src={Logo} alt="DocTime Logo" className="h-8"/>
            <h1 className="text-3xl text-white">DocTime</h1>
        </Link>
        <div className="w-3/4 md:w-1/3 my-20 mx-auto bg-white p-10 rounded-2xl text-black">
            <div className="text-3xl mb-10 ">Register as a doctor</div>
            <form  onSubmit={handleSubmit} >
                <div className="flex flex-col space-y-2">
                    <label htmlFor="username" className="text-xl">Username:</label>
                    <input
                        type="string"
                        id="username"
                        name="username"
                        autoComplete="off"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="bg-gray-200 p-2 rounded-lg"
                        placeholder="Enter your username..."
                    />
                    {errors.username && touched.username ? <p className="form-error text-sm text-red-600">{errors.username}</p> : null}
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <label htmlFor="email" className="text-xl">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="bg-gray-200 p-2 rounded-lg"
                        placeholder="Enter your email..."
                    />
                    {errors.email && touched.email ? <p className="form-error text-sm text-red-600">{errors.email}</p> : null}
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <label htmlFor="password" className="text-xl">Password:</label>
                    <input
                        type="text"
                        id="password"
                        value={values.password}
                        name="password"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="bg-gray-200 p-2 rounded-lg"
                        placeholder="Enter your password..."
                    />
                    {errors.password && touched.password ? <p className="form-error text-sm text-red-600">{errors.password}</p> : null }
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <label htmlFor="location" className="text-xl">Location:</label>
                    <input
                        type="string"
                        id="location"
                        name="location"
                        autoComplete="off"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="bg-gray-200 p-2 rounded-lg"
                        placeholder="Enter your location..."
                    />
                    {errors.location && touched.location ? <p className="form-error text-sm text-red-600">{errors.location}</p> : null}
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <label htmlFor="expertise" className="text-xl">Expertise:</label>
                    <input
                        type="string"
                        id="expertise"
                        name="expertise"
                        autoComplete="off"
                        value={values.expertise}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="bg-gray-200 p-2 rounded-lg"
                        placeholder="Enter your expertise..."
                    />
                    {errors.expertise && touched.expertise ? <p className="form-error text-sm text-red-600">{errors.expertise}</p> : null}
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <label htmlFor="fees" className="text-xl">Fees:</label>
                    <input
                        type="number"
                        id="fees"
                        name="fees"
                        autoComplete="off"
                        value={values.fees}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="bg-gray-200 p-2 rounded-lg"
                        placeholder="Enter your fees..."
                    />
                    {errors.fees && touched.fees ? <p className="form-error text-sm text-red-600">{errors.fees}</p> : null}
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <label htmlFor="phoneNumber" className="text-xl">Phone Number:</label>
                    <input
                        type="string"
                        id="phoneNumber"
                        name="phoneNumber"
                        autoComplete="off"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="bg-gray-200 p-2 rounded-lg"
                        placeholder="Enter your phone number..."
                    />
                    {errors.phoneNumber && touched.phoneNumber ? <p className="form-error text-sm text-red-600">{errors.phoneNumber}</p> : null}
                </div>
                <div className="mt-10 flex flex-row justify-between ">
                    <button type="submit" variant="contained" endicon={<SiAccenture />} size="small" className="text-xl">
                        Sign up
                    </button>
                    <button><Link to="/login" className="text-sm text-blue-500 md:text-base">Login</Link></button>
                </div>
            </form>
        </div>
        </>
    )
}


export default Signuppage;