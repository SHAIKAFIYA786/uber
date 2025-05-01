import React from 'react'


const VehiclePanel = (props) => {
    console.log("VehiclePanel", props)
    // const vehicleData=[
    //     {
    //         vehicleimg:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s",
    //         distance:"2 min away",
    //         time:"15:24",
    //         price:"$123.00",

    //     },
    //     {
    //         vehicleimg:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png",
    //         distance:"4 min away",
    //         time:"12:24",
    //         price:"$100.00",
    //     },
    //     {
    //         vehicleimg:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
    //         distance:"4 min away",
    //         time:"12:24",
    //         price:"$60.00",
    //     }
    // ]
    const vehicleData = [
        {
            type: "car",
            vehicleimg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s",
            distance: "2 min away",
            time: "15:24",
        },
        {
            type: "motorCycle",
            vehicleimg: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png",
            distance: "4 min away",
            time: "12:24",
        },
        {
            type: "auto",
            vehicleimg: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
            distance: "4 min away",
            time: "12:24",
        }
    ];

    return (
        <div>
            <h2 className='z-10 absolute p-2 text-white text-xl w-fit left-0'
                onClick={() => {
                    props.setVehiclePanel(false)
                }}>
                <i className="ri-arrow-down-line bg-black"></i>

            </h2>
            {vehicleData.map((data, i) => (
                <div className='flex justify-between items-center p-4 bg-white shadow-lg w-full border-2 border-transparent-500 rounded-lg active:border-2 hover:border-black-500' key={i}
                    onClick={() => {
                        props.setselectedRideData({
                            vehicleimg: data.vehicleimg, // Vehicle Image
                            type: data.type,             // Vehicle Type (Auto, Car, etc.)
                            fare: props.Fare?.[data.type],  // Fare based on vehicle type
                            time: data.time,            // Time
                            distance: data.distance,    // Distance
                          });
                        props.setVehiclePanel(false)
                        props.setPanel(false)
                        props.setRideConfirmPanel(true)
                    }}>
                    <img className='h-12' src={data.vehicleimg} />
                    <div>
                        <h2 className='font-semibold text-xl'>Uber Go<span></span>4</h2>
                        <p className='text-xl'>{data.time} ,{data.distance}</p>
                        <p>Affordable,easy to go</p>
                    </div>
                    <h2 className='text-xl font-semibold'>
                        ₹{props.Fare?.[data.type] ?? "N/A"}
                    </h2>

                </div>
            ))}
        </div>
    )
}

export default VehiclePanel;