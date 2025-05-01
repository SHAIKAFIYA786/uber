// import React from 'react'

// const ConfirmedRide = (props) => {
//     return (
//         <div className='bg-white p-4 relative'>
//             <h2 className='z-10 absolute p-1 text-white text-xl w-fit right-0 absolute top-2'
//                 onClick={() => {
//                     props.setVehiclePanel(false)
//                 }}>
//                 <i className="ri-arrow-down-line text-black p-2"></i>
//             </h2>
//             <h1 className='font-bold text-2xl'>Confirm The Vehicle</h1>
//             <img className='h-40 w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s" />
//             <div className='flex flex-col p-4 bg-white shadow-lg w-full border-2 border-transparent-500 rounded-lg active:border-2 hover:border-black-500'>
//                 <div className='flex items-center mb-4 border-b-4 border-[#eeeeee] pt-8 pb-8'>
//                     <h2 className='text-2xl'>
//                         <i className="ri-map-pin-fill text-2xl"></i>
//                     </h2>
//                     <div>
//                         <p className='font-bold text-2xl ml-4'>562/11-A</p>
//                         <p className='ml-4 text-lg'>Kalikiri,Chittor,Andhra Pradesh</p>
//                     </div>
//                 </div>
//                 <div className='flex items-center mb-4 border-b-4 border-[#eeeeee] pt-8 pb-8'>
//                     <h2 className='text-2xl'>
//                         <i className="ri-map-pin-fill text-2xl"></i>
//                     </h2>
//                     <div>
//                         <p className='font-bold text-2xl ml-4'>Third Wave Coffe</p>
//                         <p className='ml-4 text-lg'>murkambattu,chittorAndhra Pradesh</p>
//                     </div>
//                 </div>
//                 <div className='flex items-centerbmb-2 border-b-4 border-[#eeeeee] pt-8 pb-8'>
//                     <h2 className='text-2xl'>
//                         <i className="ri-map-pin-fill text-2xl"></i>
//                     </h2>
//                     <div>
//                         <p className='font-bold text-2xl ml-4'>$132.32</p>
//                         <p className='ml-4 text-lg'>Cash Cash</p>
//                     </div>
//                 </div>
//                 <button onClick={()=>{
//                     props.setVehiclePanel(false)
//                     props.setPanel(false)
//                     props.setRideConfirmPanel(false)
//                     props.setdriverSearchPanel(true)
//                 }} className='w-full font-bold text-xl bg-black p-4 text-white rounded-lg'>Confirm Ride</button>
//             </div>
//         </div>
//     )
// }

// export default ConfirmedRide;
import React from 'react'

const ConfirmedRide = (props) => {
    return (
        <div className='bg-white p-4 relative'>
            <h2 className='z-10 absolute p-1 text-white text-xl w-fit right-0 absolute top-2'
                onClick={() => {
                    props.setVehiclePanel(false)
                }}>
                <i className="ri-arrow-down-line text-black p-2"></i>
            </h2>
            <h1 className='font-bold text-2xl'>Confirm The Vehicle</h1>

            {/* Display the selected vehicle image */}
            <img className='h-40 w-full' src={props.selectedRideData?.vehicleimg} alt="Vehicle" />

            <div className='flex flex-col p-4 bg-white shadow-lg w-full border-2 border-transparent-500 rounded-lg active:border-2 hover:border-black-500'>
                <div className='flex items-center mb-4 border-b-4 border-[#eeeeee] pt-8 pb-8'>
                    <h2 className='text-2xl'>
                        <i className="ri-map-pin-fill text-2xl"></i>
                    </h2>
                    <div>
                        <p className='font-bold text-2xl ml-4'>562/11-A</p>
                        <p className='ml-4 text-lg'>{props.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center mb-4 border-b-4 border-[#eeeeee] pt-8 pb-8'>
                    <h2 className='text-2xl'>
                        <i className="ri-map-pin-fill text-2xl"></i>
                    </h2>
                    <div>
                        <p className='font-bold text-2xl ml-4'>562/11-A</p>
                        <p className='ml-4 text-lg'>{props.destination}</p>
                    </div>
                </div>

                {/* Display the fare based on selected vehicle */}
                <div className='flex items-center mb-4 border-b-4 border-[#eeeeee] pt-8 pb-8'>
                    <h2 className='text-2xl'>
                        <i className="ri-map-pin-fill text-2xl"></i>
                    </h2>
                    <div>
                        <p className='font-bold text-2xl ml-4'>₹{props.selectedRideData?.fare}</p>
                        <p className='ml-4 text-lg'>Cash Payment</p>
                    </div>
                </div>

                <button onClick={() => {
                    props.setVehiclePanel(false)
                    props.setPanel(false)
                    props.setRideConfirmPanel(false)
                    props.setdriverSearchPanel(true)
                    props.createRide()
                }} className='w-full font-bold text-xl bg-black p-4 text-white rounded-lg'>Confirm Ride</button>
            </div>
        </div>
    )
}

export default ConfirmedRide;
