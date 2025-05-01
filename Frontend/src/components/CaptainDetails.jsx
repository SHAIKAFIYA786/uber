// import React, { useContext } from 'react'
// import { CaptainContext } from '../context/CaptainContext'
// import { useState } from 'react';
// const CaptainDetails = (props) => {
//     console.log(props)
//     const {captain}=useContext(CaptainContext);
//   return (
//     <div>
//         <h3 className='text-center font-bold text-2xl'>🫡Welcome Captain🫡</h3>
//         <div className='w-full bg-white flex justify-between items-center text-center p-5'>
//            <div className='flex flex-col pt-4'>
//            <img className='h-20 rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1SPfhh7ROKuvrK_pAshT1WhejRvxeRTfpg&s"/>
//            <h2>{`${captain.firstname} ${captain.lastname}`}</h2>
//            </div> 
//           <div className='justify-start'>
//           <h2 className='font-bold text=xl'>$295</h2>
//           <p className='font-semibold'>Earned</p>
//           <p className='font-semibold'>Capacity :4</p>
//           </div>
//         </div>
//         <div className='bg-white-600 flex justify-evenly py-2 px-4 bg-[#eeeeee] mb-4 mx-4 my-4 rounded-lg'>
//           <div className='flex flex-col text-center'>
//           <i className="ri-time-line text-2xl font-bold"></i>
//           <h5 className='font-semibold'>10.2</h5>
//           <p className='text-xs'>Hours online</p>
//           </div>
//           <div className='flex flex-col text-center'>
//           <i className="ri-speed-up-fill text-2xl font-bold"></i>
//           <h5 className='font-semibold'>10.2</h5>
//           <p className='text-xs'>Hours online</p>
//           </div>
//           <div className='flex flex-col text-center'>
//           <i className="ri-booklet-line text-2xl font-bold"></i>
//           <h5 className='font-semibold'>10.2</h5>
//           <p className='text-xs'>Hours online</p>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default CaptainDetails
import React, { useContext } from 'react';
import { CaptainContext } from '../context/CaptainContext';

const CaptainDetails = () => {
  const { captain } = useContext(CaptainContext); // Access captain data from context

  return (
    <div>
      <h3 className='text-center font-bold text-2xl'>🫡 Welcome Captain 🫡</h3>
      <div className='w-full bg-white flex justify-between items-center text-center p-5'>
        <div className='flex flex-col pt-4'>
          <img
            className='h-20 rounded-lg'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1SPfhh7ROKuvrK_pAshT1WhejRvxeRTfpg&s"
            alt="Captain"
          />
          {/* <h2>{`${captain.fullname.firstname} ${captain.fullname.lastname}`}</h2> */}
        </div>
        <div className='justify-start'>
          <h2 className='font-bold text-xl'>$295</h2>
          <p className='font-semibold'>Earned</p>
          {/* <p className='font-semibold'>Capacity: {captain.vehicle.capacity || 'N/A'}</p> */}
        </div>
      </div>
      <div className='bg-white-600 flex justify-evenly py-2 px-4 bg-[#eeeeee] mb-4 mx-4 my-4 rounded-lg'>
        <div className='flex flex-col text-center'>
          <i className="ri-time-line text-2xl font-bold"></i>
          <h5 className='font-semibold'>10.2</h5>
          <p className='text-xs'>Hours online</p>
        </div>
        <div className='flex flex-col text-center'>
          <i className="ri-speed-up-fill text-2xl font-bold"></i>
          <h5 className='font-semibold'>10.2</h5>
          <p className='text-xs'>Hours online</p>
        </div>
        <div className='flex flex-col text-center'>
          <i className="ri-booklet-line text-2xl font-bold"></i>
          <h5 className='font-semibold'>10.2</h5>
          <p className='text-xs'>Hours online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;