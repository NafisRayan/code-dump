// "use client"
// import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

// const page = () => {
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const userRoleCookie = Cookies.get('userRole');
//     if (userRoleCookie) {
//       setUserRole(userRoleCookie);
//     }
//   }, []);

//   return (
//     <main className="background-container">
//       <section className="max-w-[1400px] mx-auto pt-24 min-h-screen">
//         <h1 className="text-4xl font-bold text-center">👋 About</h1>
//         {userRole && <p>Welcome, {userRole}!</p>}
//       </section>
//     </main>
//   );
// };

// export default page;

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function getServerSideProps() {
  const session = await getServerSession(authOptions);
  if(!session) {
    return redirect("/login");
  }
  
  return (
    <div>
       <main className="background-container">
       <section className="max-w-[1400px] mx-auto min-h-screen">
         <h1 className="text-4xl font-bold text-center">👋 About</h1>
       </section>
     </main>
    </div>
  )
}
