// import React from 'react'

// const LocationSearchPanel=(props)=>{
//   console.log(props);
//   const Location=[
//     "TB Road Kalikiri ,Annamayya District,Andrapradesh,India",
//     "PCR Road chittor ,Annamayya District,Andrapradesh,India",
//     "RVS  Road Penumuru ,Annamayya District,Andrapradesh,India",
//     "MITS Road Madanapalle ,Annamayya District,Andrapradesh,India"
//   ]
//   return (
//     //this is just a sample data
//     <div >
//         {Location.map((location, index) => (
//           <div key={index} className='flex flex-row gap-2 bg-[#eeeeee] p-3 justify-start my-4 border-2 border-[#eeeeee]'
//           onClick={()=>{
//             props.setVehicalPanel(true)
//             props.setPanel(false)
//           }}>
//             <h2 className='h-10 w-12 flex justify-center items-center'>
//               <i className="ri-map-pin-fill text-2xl"></i>
//             </h2>
//             <h4 className='font-medium'>{location}</h4>
//           </div>
//         ))}
//     </div>
//   )
// }

// export default LocationSearchPanel
// import React from 'react';

// const LocationSearchPanel = ({ locations, setVehicalPanel, setPanel }) => {
//   return (
//     <div>
//       {locations.map((location, index) => (
//         <div
//           key={index}
//           className='flex flex-row gap-2 bg-[#eeeeee] p-3 justify-start my-4 border-2 border-[#eeeeee]'
//           onClick={() => {
//             setVehicalPanel(true);
//             setPanel(false);
//           }}
//         >
//           <h2 className='h-10 w-12 flex justify-center items-center'>
//             <i className="ri-map-pin-fill text-2xl"></i>
//           </h2>
//           <h4 className='font-medium'>{location}</h4>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LocationSearchPanel;
import React from 'react';

const LocationSearchPanel = ({ locations = [], setVehicalPanel, setPickup, setDestination, isPickup, setisPickup }) => {
  return (
    <div>
      {locations.map((location, index) => {
        // Extract city, state, and country from the properties object
        const { city, state, country } = location.properties;

        return (
          <div
            key={index}
            className='flex flex-row gap-2 bg-[#eeeeee] p-3 justify-start my-4 border-2 border-[#eeeeee]'
            onClick={() => {
              const selectedLocation = `${city}, ${state}, ${country}`;
              if (isPickup) {
                setPickup(selectedLocation); // Set the pickup location
                setisPickup(false); // Switch to destination input
              } else {
                setDestination(selectedLocation); // Set the destination location
              }
              // setVehicalPanel(true); // Open vehicle panel
            }}
          >
            <h2 className='h-10 w-12 flex justify-center items-center'>
              <i className="ri-map-pin-fill text-2xl"></i>
            </h2>
            <h4 className='font-medium'>
              {city}, {state}, {country}
            </h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;