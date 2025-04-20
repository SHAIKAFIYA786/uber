// import React from 'react'
// import {Link} from 'react-router-dom';
// import { useRef } from 'react';
// import { useGSAP } from '@gsap/react';
// import { useState } from 'react';
// import gsap from 'gsap';

// const CaptainRiding = () => {
//   const [finishPanel, setfinishPanel] = useState('')
//   const finishpanelUseRef = useRef(null)
//   useGSAP(() => {
//     if (finishPanel) {
//       gsap.to(finishpanelUseRef.current, {
//         y: '0%',
//         duration: 0.5,
//         ease: 'power2.out',
//       });
//     } else {
//       gsap.to(finishpanelUseRef.current, {
//         y: '100%',
//         duration: 0.5,
//         ease: 'power2.in',
//       });
//     }
//   }, [finishPanel]);
//   return (
//     <div className='h-screen w-full overflow-hidden'>
//       <div className='h-4/5 w-full'>
//         <img
//           className='h-full w-full object-fit'
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2xVhXMrW7eDBo9qFi1k2Gi4ndVbrC875X3Q&s"
//           alt="Ride Background"
//         />
//       </div>
//       <div className='h-1/4 flex justify-between items-center w-full px-4 bg-yellow-600'>
//         <h2 className='text-2xl font-bold'>4km away</h2>
//         {/* <Link to="/captainriding"> */}
//           <button
//             onClick={() => {
//                setfinishPanel(true)
//             }}
//             className='bg-black text-white px-9 py-2 text-xl'
//           >
//             Finish Ride
//           </button>
//         {/* </Link> */}
//       </div>
//     </div>
//   );
// }

// export default CaptainRiding;
// // see what you ahev to do is create a apnel where half page another naother halt page how many km and cofirm button arrow when you click arrow finish ride panel will open it will have same deatils as the comfirm ride with somwe policy retuen below
// // when clik on the teh final finsh get back to the home page of captain
import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishPanel from '../components/FinishPanel'; // make sure this path is correct

const CaptainRiding = () => {
  const [finishPanel, setfinishPanel] = useState(false);
  const finishpanelUseRef = useRef(null);

  useGSAP(() => {
    gsap.to(finishpanelUseRef.current, {
      y: finishPanel ? '0%' : '100%',
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [finishPanel]);

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <div className="h-4/5 w-full">
        <img
          className="h-full w-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2xVhXMrW7eDBo9qFi1k2Gi4ndVbrC875X3Q&s"
          alt="Ride Background"
        />
      </div>
      <div className="h-1/4 flex justify-between items-center w-full px-4 bg-yellow-600">
        <h2 className="text-2xl font-bold">4km away</h2>
        <button
          onClick={() => {
            setfinishPanel(true);
          }}
          className="bg-black text-white px-9 py-2 text-xl"
        >
          Finish Ride
        </button>
      </div>

      {/* Finish Panel Component (Slides from bottom) */}
      <div
        ref={finishpanelUseRef}
        className="translate-y-full absolute bottom-0 w-full bg-white shadow-2xl rounded-t-2xl"
      >
        {finishPanel && (
          <FinishPanel finishPanel={finishPanel} setfinishPanel={setfinishPanel} />
        )}
      </div>
    </div>
  );
};

export default CaptainRiding;
