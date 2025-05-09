import React from 'react'

const SampleRidePopUP = (props) => {
    console.log(props)
  return (
    <div>
        <div>
        <div className='bg-white p-4 relative'>
            <h2 className='z-10 absolute p-1 text-white text-xl w-fit right-0 absolute top-2'>
                <i className="ri-arrow-down-line text-black p-2"></i>
            </h2>
            <h1 className='font-bold text-2xl'>New Ride Is Available !</h1>
             <div className='flex justify-between text-center my-10 bg-yellow-400 p-4 rounded-lg'>
                <div className='flex text-center gap-3'>
                    <img  className='h-10 w-10 rounded-full object-cover' src="https://media.istockphoto.com/id/508956644/photo/pretty-colombian-woman.jpg?s=612x612&w=0&k=20&c=jEwTCMKSpjYsaSfiFIlifYneUpczureQFl8o543_ZjE=" />
                    <h2 className='font-semibold text-xl'>{props.passenger?.user.fullname.firstname + " " + props.passenger?.user.fullname.lastname}</h2>
                </div>
                <h2 className='font-bold text-xl'>2.2km</h2>
             </div>
            <div className='flex flex-col p-4 bg-white shadow-lg w-full border-2 border-transparent-500 rounded-lg active:border-2 hover:border-black-500'>
                <div className='flex items-center mb-4 border-b-4 border-[#eeeeee] pt-8 pb-8'>
                    <h2 className='text-2xl'>
                        <i className="ri-map-pin-fill text-2xl"></i>
                    </h2>
                    <div>
                        <p className='font-bold text-2xl ml-4'>562/11-A</p>
                        <p className='ml-4 text-lg'>{props.passenger?.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center mb-4 border-b-4 border-[#eeeeee] pt-8 pb-8'>
                    <h2 className='text-2xl'>
                        <i className="ri-map-pin-fill text-2xl"></i>
                    </h2>
                    <div>
                        <p className='font-bold text-2xl ml-4'>Third Wave Coffe</p>
                        <p className='ml-4 text-lg'>{props.passenger?.destination}</p>
                    </div>
                </div>
                <div className='flex items-centerbmb-2 border-b-4 border-[#eeeeee] pt-8 pb-8'>
                    <h2 className='text-2xl'>
                        <i className="ri-map-pin-fill text-2xl"></i>
                    </h2>
                    <div>
                        <p className='font-bold text-2xl ml-4'>₹{props.passenger?.fare} </p>
                        <p className='ml-4 text-lg'>Cash Cash</p>
                    </div>
                </div>
                <div className='w-full p-2'>
                <button 
  onClick={() => {
    props.setridePopUP(true);
    props.setsampleRidePopUp(false);
  }}
  className='w-full font-bold text-xl bg-black p-4 text-white rounded-lg bg-green-400 mb-2'
>
  Accept
</button>

          <button 
                onClick={() => props.setsampleRidePopUp(false)}
                className='w-full font-bold text-xl bg-black p-4 text-white rounded-lg bg-gray-400'>Ignore</button>
          </div>
          
            </div>
        </div>
    </div>
    </div>
  )
}

export default SampleRidePopUP