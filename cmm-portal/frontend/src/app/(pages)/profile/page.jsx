import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Profile from "../../components/Profile";

export default async function getServerSideProps() {
  const session = await getServerSession(authOptions);
  if(!session) {
    return redirect("/login");
  }

  // return <pre>{JSON.stringify(session, null, 2)}</pre>;
  return (
    <div>
      <Profile userRole1={session?.user?.role} />
    </div>
  )
}
