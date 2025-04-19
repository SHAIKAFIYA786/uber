import React from 'react'

const   WaitingForDriver = (props) => {
    return (
        <div className='bg-white p-4 relative'>
            <h2 className='z-10 absolute p-1 text-white text-xl w-fit right-0 absolute top-2'
                onClick={() => {
                    props.setVehiclePanel(false)
                }}>
                <i className="ri-arrow-down-line text-black p-2"></i>
            </h2>
            <h1 className='font-bold text-2xl'>Waiting For Driver</h1>
            <div className='flex justify-between items-center mb-4 border-b-4 border-[#eeeeee] pt-8 pb-8'>
                <img className='h-20' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s" />
                <div className='flex flex-col items-center justify-center align-center text-black'>
                   <h2 className='text-lg font-medium'>Afiya</h2> 
                   <h4 className='text-xl font-semibold'>MPO4 Ab 1234</h4>
                    <p className='text-sm text-gray-600'>maruti suzuki alto</p>
                </div>
            </div>
            <div className='flex flex-col p-4 bg-white shadow-lg w-full border-2 border-transparent-500 rounded-lg active:border-2 hover:border-black-500'>
                <div className='flex items-center mb-4 border-b-4 border-[#eeeeee] pt-8 pb-8'>
                    <h2 className='text-2xl'>
                        <i className="ri-map-pin-fill text-2xl"></i>
                    </h2>
                    <div>
                        <p className='font-bold text-2xl ml-4'>562/11-A</p>
                        <p className='ml-4 text-lg'>Kalikiri,Chittor,Andhra Pradesh</p>
                    </div>
                    
                </div>
            </div>
            <div className='flex flex-col p-4 bg-white shadow-lg w-full border-2 border-transparent-500 rounded-lg active:border-2 hover:border-black-500'>
                <div className='flex items-center mb-4 border-b-4 border-[#eeeeee] pt-8 pb-8'>
                    <h2 className='text-2xl'>
                        <i className="ri-map-pin-fill text-2xl"></i>
                    </h2>
                    <div>
                        <p className='font-bold text-2xl ml-4'>562/11-A</p>
                        <p className='ml-4 text-lg'>Kalikiri,Chittor,Andhra Pradesh</p>
                    </div>
                    
                </div>
            </div>
            <div className='flex flex-col p-4 bg-white shadow-lg w-full border-2 border-transparent-500 rounded-lg active:border-2 hover:border-black-500'>
                <div className='flex items-center mb-4 border-b-4 border-[#eeeeee] pt-8 pb-8'>
                    <h2 className='text-2xl'>
                        <i className="ri-map-pin-fill text-2xl"></i>
                    </h2>
                    <div>
                        <p className='font-bold text-2xl ml-4'>562/11-A</p>
                        <p className='ml-4 text-lg'>Kalikiri,Chittor,Andhra Pradesh</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver;