import React from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import LocationSearchPanel from '../components/LocationSearchPanel';
import { useContext } from 'react';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import DriverSearchPanel from '../components/DriverSearchPanel';
import WaitingForDriver from '../components/WaitingForDriver';


const New = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [openPanel, setPanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const rideconfirmPanelRef = useRef(null);
  const panelRef = useRef(null);
  const waitingfordriverPanelRef = useRef(null);
  const driversearchPanelRef = useRef(null);
  const navigate = useNavigate();
  const [driverSearchPanel, setdriverSearchPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [rideConfirmPanel, setrideConfirmPanel] = useState(false)
  const [waitingForDriver, setwaitingForDriver] = useState(false)

  const vehicleData = [
    {
      vehicleimg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s",
      distance: "2 min away",
      time: "15:24",
      price: "$123.00",
    },
    {
      vehicleimg: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png",
      distance: "4 min away",
      time: "12:24",
      price: "$100.00",
    },
    {
      vehicleimg: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
      distance: "4 min away",
      time: "12:24",
      price: "$60.00",
    }
  ]
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted")
  }
  useGSAP(function () {
    if (openPanel) {
      gsap.to(panelRef.current, {
        height: '70%',
        duration: 1,
        ease: 'power2.inOut',
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%'
      });
    }
  }, [openPanel]);
  // useGSAP(function () {
  //      if(vehiclePanel){
  //         gsap.to(vehiclePanelRef.current, {
  //             transform:'translateY(0)'
  //         })
  //      }
  //      else{
  //         gsap.to(vehiclePanelRef.current, {
  //             transform:'translateY(100)'
  //         })
  //      }
  // },[vehiclePanel])
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [vehiclePanel]);
  useGSAP(() => {
    if (rideConfirmPanel) {
      gsap.to(rideconfirmPanelRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(rideconfirmPanelRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [rideConfirmPanel]);
  useGSAP(() => {
    if (driverSearchPanel) {
      gsap.to(driversearchPanelRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(driversearchPanelRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [driverSearchPanel]);
  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingfordriverPanelRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(waitingfordriverPanelRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [waitingForDriver]);

  return (
    <div className=" h-screen relative overflow-hidden">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber logo"
        className="h-8 my-4 absolute top-5 left-5"
      />
      <div className='h-screen w-full'>
        <img className=" h-full w-full w-1/2 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2xVhXMrW7eDBo9qFi1k2Gi4ndVbrC875X3Q&s" alt="Loading..." />
      </div>
      {/* justify-end = push child elements to the bottom
            So anything inside that div will be pushed to the bottom of the container — if there's enough space. */}
      <div className='flex flex-col h-screen w-full top-0 absolute justify-end'>
        <div className='bg-white h-[30%] w-full t-3xl shadow-lg p-4 relative'>
          <div >
            <h2 className='z-10 absolute p-2 text-black text-xl w-fit top-1 right-0'
              onClick={() => {
                setPanel(false)
              }}>
              <i className="ri-arrow-down-line"></i>
            </h2>
          </div>
          <h4 className='text-2xl font-semibold mx-2'>Find a Trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <input type="text"
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              placeholder="Add a pickup location"
              value={pickup}
              onClick={() => {
                setPanel(true)
              }}
              className="px-4 py-4 bg-[#eeeeee] w-full text-lg placeholder:text-sm my-2" />
            <input type="text"
              onClick={() => {
                setPanel(true)
              }}
              onChange={(e) => {
                setDestination(e.target.value)
              }}

              placeholder="Enter your destiantion " className="px-4 py-4 bg-[#eeeeee] w-full text-lg placeholder:text-sm my-2"
              value={destination} />
          </form>
        </div>
        <div ref={panelRef} className=' h-[0%] w-full bg-white'>
          <LocationSearchPanel setPanel={setPanel} setVehicalPanel={setVehiclePanel} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='translate-y-full fixed z-10 bg-green bottom-0 w-full round'>
        <VehiclePanel setRideConfirmPanel={setrideConfirmPanel} setVehiclePanel={setVehiclePanel} vehicleData={vehicleData} setPanel={setPanel} />
      </div>
      <div ref={rideconfirmPanelRef} className='translate-y-full fixed z-10 bg-green bottom-0 w-full round'>
        <ConfirmedRide setdriverSearchPanel={setdriverSearchPanel}
          setRideConfirmPanel={setrideConfirmPanel}
          setPanel={setPanel}
          setVehiclePanel={setVehiclePanel} vehicleData={vehicleData} />
      </div>
      <div ref={driversearchPanelRef} className='translate-y-full fixed z-10 bg-green bottom-0 w-full round'>
        <DriverSearchPanel
          setdriverSearchPanel={setdriverSearchPanel}
          setRideConfirmPanel={setrideConfirmPanel}
          setPanel={setPanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div className='translate-y-full fixed z-10 bg-green bottom-0 w-full round'>
        <WaitingForDriver ref={waitingfordriverPanelRef}
          setdriverSearchPanel={setdriverSearchPanel}
          setRideConfirmPanel={setrideConfirmPanel}
          setPanel={setPanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
    </div>
  )
}

export default New;