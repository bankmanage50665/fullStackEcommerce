import { json, useLoaderData } from "react-router-dom"

import RenderAllUsers from "./RenderAllUsers"
import { getToken, userId } from "../../middleware/getToken"



export default function GetAllUsers() {
    const data = useLoaderData()
    const users = data && data.users

    console.log(data)

    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user, index) => (
                <RenderAllUsers key={index} user={user} />
            ))}
        </div>
    </>
}

export async function loader() {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/allUsers`)
        const resData = await response.json()

        if (!response.ok) {
            throw new Error(resData.message)
        }

        return resData

    } catch (err) {
        throw json({ message: "Field to get user list, Plese try again later." }, { status: 500 })
    }

}