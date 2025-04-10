// import React from 'react'

// const Home=()=>{
//   return (
//     <div className='h-screen w-full bg-gray-100'>
//         <img src="https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp" alt="uber logo" className='w-1/2 h-1/2 mx-auto mt-10'/>
//         <div className='bg-color-white'>
//             <h1>hello</h1>
//         </div>
//     </div>
//   )
// }

// export default Home;
import React from "react";
import {Link} from "react-router-dom";
//flex will take full width and height of the screen of its parent
const Home = () => {
  return (
    <div>
      <div className="bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfXSvNw97cYrsMJkcTd0jvoWbB8OIjz7KU1Q&s)] bg-cover bg-center h-screen w-full bg-gray-100 flex flex-col items-start justify-between pl-10 pt-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
          className="h-8 mt-0"
        />
        <div className="text-white pl-10 pb-3">
          <h2 className="text-xl font-bold mb-2">Get Started With Uber</h2>
          <Link to="/login" className="w-full flex items-center justify-center bg-black text-white py-3 rounded">
            continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
