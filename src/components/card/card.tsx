import type { IUserList } from "@/pages/home/service/query/useGetUserList"
import { Link } from "react-router"
import { CreateUser } from "../form/form"
import { DeleteButton } from '../form/delete'

export const Card = ({ email, name, username, id }: IUserList) => {
    return (
        <div className="border rounded-[10px] p-5 my-5 hover:border-yellow-200 flex flex-col items-center text-left justify-center">
            <h2 className="text-4xl hover:text-yellow-400 ">
                <Link to={`/product/${id}`}>Name: {name}</Link>
            </h2>
            <p>Email: {email}</p>
            <p>Username: {username}</p>
            <div className="flex items-center justify-center mt-4">
                <CreateUser email={email} username={username} id={id} name={name} />
                <DeleteButton id={String(id)} />
            </div>
        </div>
    )
}
