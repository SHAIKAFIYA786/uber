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
import { useEffect } from 'react';
import axios from 'axios';
// import { UserContextData } from '../context/UserContext';
import { UserContextData } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';



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
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const authToken = localStorage.getItem('token');
  const [isPickup, setisPickup] = useState(true);
  const [isDestination, setisDestination] = useState(true);
  const [selectedRideData, setselectedRideData] = useState(null)
  const [Fare, setFare] = useState(null)
  console.log(pickup, destination);

  const { sendMessage, receiveMessage } = useContext(SocketContext);
  const { user } = useContext(UserContextData);

  // useEffect(() => {
  //   console.log("heybeta");
  //   console.log(user);
  //   socket.emit("join", { userType: "user", userId: user._id })
  // }, [user])

  // socket.on('ride-confirmed', ride => {

  //   setVehicleFound(false)
  //   setWaitingForDriver(true)
  //   setRide(ride)
  // })

  // socket.on('ride-started', ride => {
  //   console.log("ride")
  //   setWaitingForDriver(false)
  //   navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
  // })


  // const handlePickupChange = async (e) => {
  //   setPickup(e.target.value)
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
  //       params: { input: e.target.value },
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }

  //     })
  //     setPickupSuggestions(response.data)
  //   } catch {
  //     // handle error
  //   }
  // }

  // const handleDestinationChange = async (e) => {
  //   setDestination(e.target.value)
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
  //       params: { input: e.target.value },
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //     setDestinationSuggestions(response.data)
  //   } catch {
  //     // handle error
  //   }
  // }


  useEffect(() => {
    if (pickup) {
      const storedToken = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!storedToken) {
        console.error("No auth token found. Please log in.");
        return;
      }

      try {
        const parsedToken = JSON.parse(storedToken); // Parse the token if it's stored as a JSON string
        const authToken = parsedToken.token; // Extract the actual token

        axios
          .get(`http://localhost:4000/maps/get-suggestions?input=${pickup}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`, // Pass the token from localStorage
              'Content-Type': 'application/json', // Set content type to JSON
            },
          })
          .then((response) => {
            console.log(response.data); // Log the data received from the API
            setLocationSuggestions(response.data); // Set the location suggestions to state
          })
          .catch((error) => {
            if (error.response) {
              // Server responded with a status code outside the 2xx range
              console.error("Error fetching suggestions:", error.response.data);
            } else if (error.request) {
              // Request was made but no response received
              console.error("No response received:", error.request);
            } else {
              // Something else caused the error
              console.error("Error setting up request:", error.message);
            }
          });
      } catch (error) {
        console.error("Error parsing token:", error.message);
      }
    }
  }, [pickup]);
  useEffect(() => {
    if (destination) {
      const storedToken = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!storedToken) {
        console.error("No auth token found. Please log in.");
        return;
      }

      try {
        const parsedToken = JSON.parse(storedToken); // Parse the token if it's stored as a JSON string
        const authToken = parsedToken.token; // Extract the actual token

        axios
          .get(`http://localhost:4000/maps/get-suggestions?input=${destination}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`, // Pass the token from localStorage
              'Content-Type': 'application/json', // Set content type to JSON
            },
          })
          .then((response) => {
            console.log(response.data); // Log the data received from the API
            setLocationSuggestions(response.data); // Set the location suggestions to state
          })
          .catch((error) => {
            if (error.response) {
              // Server responded with a status code outside the 2xx range
              console.error("Error fetching suggestions:", error.response.data);
            } else if (error.request) {
              // Request was made but no response received
              console.error("No response received:", error.request);
            } else {
              // Something else caused the error
              console.error("Error setting up request:", error.message);
            }
          });
      } catch (error) {
        console.error("Error parsing token:", error.message);
      }
    }
  }, [destination]);



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

  async function findTrip() {
    const storedToken = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (!storedToken) {
      console.error("No auth token found. Please log in.");
      return;
    } 
    try {
      const parsedToken = JSON.parse(storedToken); // Parse the token if it's stored as a JSON string
      const authToken = parsedToken.token; // Extract the actual token

      const response = await fetch(`http://localhost:4000/rides/get-Fare?pickup=${pickup}&destination=${destination}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`, // Pass the token in the Authorization header
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching fare:", errorData);
        return;
      }

      const fareData = await response.json();
      console.log("Fare Data:", fareData); // Log the fare data to the console
      setFare(fareData); // Optionally, store the fare in state if needed
      console.log(response);
    } catch (error) {
      console.error("Error fetching fare:", error.message);
    }

  }
  
  async function createRide() {
    const storedToken = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (!storedToken) {
      console.error("No auth token found. Please log in.");
      return;
    }
    try {
      const parsedToken = JSON.parse(storedToken); // Parse the token if it's stored as a JSON string
      const authToken = parsedToken.token; // Extract the actual token
      const response = await fetch(`http://localhost:4000/rides/createRide`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickup,
          destination,
          vehicleType: selectedRideData.type
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching fare:", errorData);
        return;
      }
      const rideData = await response.json();
      console.log("ride Data:", rideData); // Log the fare data to the console
      console.log(response);
    } catch (error) {
      console.error("Error fetching fare:", error.message);
    }
  }
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
                setisPickup(true);
              }}
              className="px-4 py-4 bg-[#eeeeee] w-full text-lg placeholder:text-sm my-2" />
            <input type="text"
              onClick={() => {
                setPanel(true)
                setisPickup(false);
              }}
              onChange={(e) => {
                setDestination(e.target.value)
              }}

              placeholder="Enter your destiantion " className="px-4 py-4 bg-[#eeeeee] w-full text-lg placeholder:text-sm my-2"
              value={destination} />
          </form>
          <button
            onClick={() => {
              findTrip();
              setVehiclePanel(true);
              setPanel(false);
            }}
            className='w-full py-4 px-4 flex justify-center bg-black text-white rounded-lg mb-2 text-xl font-bold'>
            Find trip
          </button>
        </div>
        {/* <div ref={panelRef} className=' h-[0%] w-full bg-white'>
          <LocationSearchPanel setPanel={setPanel} setVehicalPanel={setVehiclePanel} searchText={pickup}  suggestions={locationSuggestions}/>
        </div> */}
        <div ref={panelRef} className=' h-[0%] w-full bg-white'>
          <LocationSearchPanel
            setPanel={setPanel}
            setVehicalPanel={setVehiclePanel}
            searchText={pickup}
            locations={locationSuggestions} // Pass as locations
            setPickup={setPickup}
            setDestination={setDestination}
            isPickup={isPickup}
            setisPickup={setisPickup}
            setisDestination={setisDestination}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='translate-y-full fixed z-10 bg-green bottom-0 w-full round'>
        <VehiclePanel setRideConfirmPanel={setrideConfirmPanel} setVehiclePanel={setVehiclePanel} vehicleData={vehicleData} setPanel={setPanel} locations={locationSuggestions} setPickup={setPickup} setDestination={setDestination} setFare={setFare} Fare={Fare} setselectedRideData={setselectedRideData} />
      </div>
      <div ref={rideconfirmPanelRef} className='translate-y-full fixed z-10 bg-green bottom-0 w-full round'>
        <ConfirmedRide setdriverSearchPanel={setdriverSearchPanel}
          setRideConfirmPanel={setrideConfirmPanel}
          setPanel={setPanel}
          setVehiclePanel={setVehiclePanel} vehicleData={vehicleData}
          selectedRideData={selectedRideData}
          pickup={pickup}
          destination={destination}
          createRide={createRide} />
      </div>
      <div ref={driversearchPanelRef} className='translate-y-full fixed z-10 bg-green bottom-0 w-full round'>
        <DriverSearchPanel
          setdriverSearchPanel={setdriverSearchPanel}
          setRideConfirmPanel={setrideConfirmPanel}
          setPanel={setPanel}
          setVehiclePanel={setVehiclePanel}
          pickup={pickup}
          destination={destination}
          selectedRideData={selectedRideData}
          createRide={createRide}
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