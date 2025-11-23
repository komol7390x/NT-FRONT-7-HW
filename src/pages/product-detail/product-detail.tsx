import { useParams } from "react-router"
import { useUser } from "./query/useUser"
import { CreateUser } from "@/components/form/form"

export const ProductDetail = () => {
    const { id } = useParams()
    const { data, isLoading, isError } = useUser(id as string)

    if (isError) {
        return <h1 className="text-3xl">User not found</h1>
    }
    return (
        <div className="container border rounded-[10px] p-5 my-5 hover:border-yellow-200">
            {isLoading ? <h2>Loading...</h2> : (
                <div>
                    <h3 className="text-4xl ">{data?.name}</h3>
                    <p>{data?.email}</p>
                    <p>{data?.username}</p>
                    <CreateUser email={data?.email} username={data?.username} id={data?.id} name={data?.name} />

                </div>

            )}
        </div>
    )
}
