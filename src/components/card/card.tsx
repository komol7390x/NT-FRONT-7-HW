import type { IUserList } from "@/pages/home/service/query/useGetUserList"
import { Link } from "react-router"
import { CreateUser } from "../form/form"


export const Card = ({ email, name, username, id }: IUserList) => {
    return (
        <div className="border rounded-[10px] p-5 my-5 hover:border-yellow-200">
            <h2 className="text-4xl hover:text-yellow-400 ">
                <Link to={`/product/${id}`}>Name: {name}</Link>
            </h2>
            <p>Email: {email}</p>
            <p>Username: {username}</p>
            <CreateUser email={email} username={username} id={id} name={name} />
        </div>
    )
}
