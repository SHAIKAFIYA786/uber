import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUP from '../components/RidePopUp'
import SampleRidePopUP from '../components/SampleRidePopUP';
import { useState } from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { CaptainContext } from '../context/CaptainContext'
import { UserDataContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';
import { useEffect } from 'react';
// import {gsap} from '@gsap/react'
import gsap from 'gsap';

const CaptainHome = () => {
  const [ridePopUP, setridePopUP] = useState(false);
  const ridepopupPanelRef = useRef(null);
  const [sampleRidePopUp, setsampleRidePopUp] = useState(true);
  const [captaindetails, setcaptaindetails] = useState(true)
  const captaindetailsPanelRef = useRef(null)
  const sampleridePanelRef = useRef(null)
  // const captain=useContext(CaptainContext);
  const { captain } = useContext(CaptainContext);
  const { user, setUser } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);
  const [Ride, setRide] = useState(null)

  // useEffect(()=>{
  //   sendMessage("hello",)
  // })
//   useEffect(() => {
//     socket.emit("join", { userType: "captain", userId: captain._id });
//     const updateLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//           // console.log({
//           //   userId: captain._id,
//           //   location: {
//           //     ltd: position.coords.latitude,
//           //     lng: position.coords.longitude
//           //   }
//           // })
//           socket.emit('update-location-captain', {
//             userId: captain._id,
//             location: {
//               ltd: position.coords.latitude,
//               lng: position.coords.longitude
//             }
//           })
//         })  
//       }
//     }

//     const locationInterval = setInterval(updateLocation, 10000)
//     updateLocation()
//   }, [captain])

//   socket.on('new-ride', (data) => {
//     setRide(data)
//     setRidePopup(true)
// })
useEffect(() => {
  if (!socket || !captain?._id) return;

  // Emit join
  socket.emit("join", { userType: "captain", userId: captain._id });

  // Listen for new ride
  const handleNewRide = (data) => {
    console.log("Received new-ride:", data);
    setRide(data);
    setridePopUP(true);
  };

  socket.on("new-ride", handleNewRide);

  // Send location updates
  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        socket.emit('update-location-captain', {
          userId: captain._id,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    }
  };

  const locationInterval = setInterval(updateLocation, 10000);
  updateLocation();

  // Cleanup
  return () => {
    socket.off("new-ride", handleNewRide);
    clearInterval(locationInterval);
  };
}, [socket, captain]);

useEffect(() => {
  if (Ride) {
    console.log("🚗 frontend Ride updated:", Ride);
  }
}, [Ride]);


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
        <CaptainDetails sampleRidePopUp={sampleRidePopUp} setsampleRidePopUp={setsampleRidePopUp} captain={captain} />
      </div>
      <div ref={ridepopupPanelRef} className='translate-y-full absolute bottom-0 w-full bg-white'>
        <RidePopUP ridePopUP={ridePopUP} setridePopUP={setridePopUP}  passenger={Ride}/>
      </div>
      <div ref={sampleridePanelRef} className='absolute bottom-0 w-full bg-white'>
        <SampleRidePopUP
          setridePopUP={setridePopUP}
          setsampleRidePopUp={setsampleRidePopUp}
          passenger={Ride}
        />
      </div>



    </div>
  )
}

export default CaptainHome