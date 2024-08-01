import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Dashboard from "../../components/Dashboard";


export default async function getServerSideProps() {
  const session = await getServerSession(authOptions);
  if(!session || session?.user?.role !== "admin") {
    return redirect("/");
  }
  
  return (
    <div>
      <Dashboard />
    </div>
  )
}
