import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUP from '../components/RidePopUp'
import SampleRidePopUP from '../components/SampleRidePopUP';
import { useState } from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import CaptainContext from '../context/CaptainContext'
// import {gsap} from '@gsap/react'
import gsap from 'gsap';

const CaptainHome = () => {
  const [ridePopUP, setridePopUP] = useState(false);
  const ridepopupPanelRef = useRef(null);
  const [sampleRidePopUp, setsampleRidePopUp] = useState(false);
  const [captaindetails, setcaptaindetails] = useState(true)
  const captaindetailsPanelRef = useRef(null)
  const sampleridePanelRef = useRef(null)
  const captain=useContext(CaptainContext);
  useGSAP(() => {
    if (ridePopUP) {
      gsap.to(ridepopupPanelRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(ridepopupPanelRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [ridePopUP]);
  useGSAP(() => {
    if (captaindetails) {
      gsap.to(captaindetailsPanelRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(captaindetailsPanelRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [captaindetails]);
  useGSAP(() => {
    if (sampleRidePopUp) {
      gsap.to(sampleridePanelRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(sampleridePanelRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [sampleRidePopUp]);
  return (
    <div className='h-screen w-full flex flex-col justify-between relative overflow-hidden'>
      <div className='fixed flex justify-between w-full py-8 px-3 '>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
          className="h-8 mt-0"
        />
        <div className='bg-[#eeeeee]'>
          <Link to='/home2'><i className="text-2xl ri-home-4-line font-bold"></i></Link>
        </div>
      </div>
      <div className='h-screen w-full'> 
        <img className=" h-full w-full w-1/2 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2xVhXMrW7eDBo9qFi1k2Gi4ndVbrC875X3Q&s" alt="Loading..." />
      </div>
      <div ref={captaindetailsPanelRef} className='absolute bottom-0 w-full bg-white'>
        <CaptainDetails sampleRidePopUp={sampleRidePopUp} setsampleRidePopUp={setsampleRidePopUp}/>
      </div>
      <div ref={ridepopupPanelRef} className='translate-y-full absolute bottom-0 w-full bg-white'>
        <RidePopUP ridePopUP={ridePopUP} setridePopUP={setridePopUP} />
      </div>
      <div ref={sampleridePanelRef} className='absolute bottom-0 w-full bg-white'>
  <SampleRidePopUP 
    setridePopUP={setridePopUP} 
    setsampleRidePopUp={setsampleRidePopUp} 
  />
</div>



    </div>
  )
}

export default CaptainHome