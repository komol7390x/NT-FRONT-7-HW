import { useParams } from "react-router"
import { useUser } from "./query/useUser"

export const ProductDetail = () => {
    const { id } = useParams()
    const { data, isLoading, isError } = useUser(id as string)
    if (isError) {
        return <h1 className="text-3xl">User not found</h1>
    }
    return (
        <div className="container">
            {isLoading ? <h2>Loading...</h2> : (
                <div>
                    <h3>{data?.name}</h3>
                    <p>{data?.email}</p>
                    <p>{data?.username}</p>
                </div>

            )}
        </div>
    )
}
