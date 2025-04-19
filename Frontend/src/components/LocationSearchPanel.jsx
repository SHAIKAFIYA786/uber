import React from 'react'

const LocationSearchPanel=(props)=>{
  console.log(props);
  const Location=[
    "TB Road Kalikiri ,Annamayya District,Andrapradesh,India",
    "PCR Road chittor ,Annamayya District,Andrapradesh,India",
    "RVS  Road Penumuru ,Annamayya District,Andrapradesh,India",
    "MITS Road Madanapalle ,Annamayya District,Andrapradesh,India"
  ]
  return (
    //this is just a sample data
    <div >
        {Location.map((location, index) => (
          <div key={index} className='flex flex-row gap-2 bg-[#eeeeee] p-3 justify-start my-4 border-2 border-[#eeeeee]'
          onClick={()=>{
            props.setVehicalPanel(true)
            props.setPanel(false)
          }}>
            <h2 className='h-10 w-12 flex justify-center items-center'>
              <i className="ri-map-pin-fill text-2xl"></i>
            </h2>
            <h4 className='font-medium'>{location}</h4>
          </div>
        ))}
    </div>
  )
}

export default LocationSearchPanel