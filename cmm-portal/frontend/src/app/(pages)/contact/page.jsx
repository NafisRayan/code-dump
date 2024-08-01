
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function getServerSideProps() {
  const session = await getServerSession(authOptions);
  if(!session) {
    return redirect("/login");
  }

  // return <pre>{JSON.stringify(session, null, 2)}</pre>;
  return (
    <main className="background-container">
    <section className="max-w-[1400px] mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-center">👋 Contact</h1>
    </section>
  </main>
  )
}