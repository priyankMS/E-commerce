// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelectore } from "../../redux/hook";
// import { logOut } from "../../redux/slice/AuthSlice";

// type accoutnDataType = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// };

// export const UserAccount: React.FC = () => {

//   const dispatch = useAppDispatch();

//   const isAuth = useAppSelectore((state) => state.auth.isAuthentication);


//    const handleLogout = () =>{
//     dispatch(logOut())
    
//    } 


//   return (
//     <div className="    flex items-center justify-center py-10">
//       <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full transform transition duration-400 hover:scale-105">
//         <h1 className="text-2xl font-extrabold text-center mb-6 text-gray-800">User Account</h1>
//         {isAuth ? (
//           <div>
//             <div className="mb-2 flex gap-4">
//               <h2 className="text-lg font-semibold text-gray-700">First Name:</h2>
//               <p className="text-gray-600">{accoutnData?.firstName}</p>
//             </div>
//             <div className="mb-2 flex gap-4">
//               <h2 className="text-lg font-semibold text-gray-700">Last Name:</h2>
//               <p className="text-gray-600">{accoutnData?.lastName}</p>
//             </div>
//             <div className="mb-2 flex gap-4 ">
//               <h2 className="text-lg font-semibold text-gray-700">Email:</h2>
//               <p className="text-gray-600">{accoutnData?.email}</p>
//             </div>
//             <div className="mb-2 flex gap-4">
//               <h2 className="text-lg font-semibold text-gray-700">Password:</h2>
//               <p className="text-gray-600">{accoutnData?.password}</p>
//             </div>
//             <div className="mt-6 flex justify-center">
//               <button 
//                onClick={handleLogout}
//               className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition duration-200 shadow-lg">
//                 Logout
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center">
//             <h2 className="text-2xl font-semibold text-red-500">Unauthorized</h2>
//             <p className="text-gray-200 mt-2">Please log in to view your account details.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
