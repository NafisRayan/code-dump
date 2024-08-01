import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import RegistrationPage from "../components/registration";
import Image from "next/image";
import SchoolId from "../components/registration/SchoolId";

export default async function getServerSideProps(context) {
  const session = await getServerSession(authOptions);

  // const { school, pool } = context.searchParams;

  // console.log(context);

  //   if(!session || session?.user?.role !== "admin") {
  //     return redirect("/");
  //   }

  // return <pre>{JSON.stringify(session, null, 2)}</pre>;
  return (
    <div>
      <SchoolId />
    </div>
  );
}
