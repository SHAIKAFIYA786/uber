import React from 'react'

const riding = () => {
    return (
        <div className='flex flex-col items-center bg-[#eeeeee] h-screen w-full'>
            <div className='w-full h-1/2 object-cover'>
                <img className="w-full h-[310px] -mb-1 object-cover block overflow-hidden" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2xVhXMrW7eDBo9qFi1k2Gi4ndVbrC875X3Q&s" alt="Loading..." />
            </div>
            <div className='flex justify-between items-center pt-8 pb-8 w-full bg-white px-5 mt-0'>
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
                <div className='flex items-centerbmb-2 border-b-4 border-[#eeeeee] pt-8 pb-8'>
                    <h2 className='text-2xl'>
                        <i className="ri-map-pin-fill text-2xl"></i>
                    </h2>
                    <div>
                        <p className='font-bold text-2xl ml-4'>$132.32</p>
                        <p className='ml-4 text-lg'>Cash Cash</p>
                    </div>
                </div>
                <button onClick={()=>{
                    props.setVehiclePanel(false)
                    props.setPanel(false)
                    props.setRideConfirmPanel(false)
                    props.setdriverSearchPanel(true)
                }} className='w-full font-bold text-xl bg-black p-4 text-white rounded-lg'>Pay For A Ride</button>
            </div>
        </div>
    )
}

export default riding