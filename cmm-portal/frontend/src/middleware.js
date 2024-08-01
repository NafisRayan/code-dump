// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";
// import { authOptions } from "./app/api/auth/[...nextauth]/route";
// import { getSession } from "next-auth/react";

// export async function middleware(request) {
// //   return NextResponse.redirect(new URL("/login", request.url));

//     "use server";
//     const session = await getSessionSession(authOptions);
//     if (!session) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }
// }

// export const config = {
//   matcher: ["/dashboard", "/"],
// };

export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", "/profile"] };

// import { NextResponse } from "next/server";

// export async function middleware(request) {
//     const path = request?.nextUrl?.pathname;

//   const cookies = await request.cookies;
//   const userRole = await cookies.get('userRole');

//   if (userRole !== 'admin' && userRole !== 'tutor' && path !== "/login") {
//     console.log(userRole);
//     console.log(path);
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
//   else if (userRole) {
//     console.log(userRole);
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard", "/profile", "/calender", "/appointments"],
// };