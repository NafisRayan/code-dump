import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Login from "../../components/Login";


export default async function getServerSideProps() {
  const session = await getServerSession(authOptions);
  
  if(session) {
    return redirect("/");
  }

  // return <pre>{JSON.stringify(session, null, 2)}</pre>;
  return (
    <div>
      <Login />
    </div>
  )
}
