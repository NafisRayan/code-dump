import CreatePasswordNewUser from "../components/registration/CreatePasswordNewUser"
import { redirect } from "next/navigation";

export default function Page({ searchParams }) {

    const params = searchParams
    const authToken = params.authToken

    if(!authToken) {
        return redirect("/")
    }
  
    return (
        <CreatePasswordNewUser authToken={authToken} />
    )
}