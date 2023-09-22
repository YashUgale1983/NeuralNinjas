import Navbar from "./navbar";
import HeroSectionImage from "./../images/heroSection.jpeg";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Footer from "./footer";
import Phone from "./phone";


const Homepage = ()=>{
    const user = useSelector((state) => state.doc.user);
   
 return(
    <>
    <Navbar />
    <div className="">
        <div className="hero min-h-screen" style={{backgroundImage: `url(${HeroSectionImage})`}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                <h1 className="mb-5 text-6xl font-bold">Hello there!!!</h1>
                <p className="mb-5 text-3xl">Experience the Future of Healthcare: Your AI-Powered Companion for Effortless Doctor Appointments</p>
                {!user?(
                  <Link to='/' className="btn btn-primary" >Get Started</Link>

                ):(<Link to='/mySlots' className="btn btn-primary" >Get Started</Link>)}
                </div>
            </div>
        </div>
        <Phone />
    </div>
    <Footer />
    </>
 )   
}

export default Homepage;