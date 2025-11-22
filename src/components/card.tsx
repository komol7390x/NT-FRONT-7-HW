import { Link } from "react-router"
import { useDeleteTaskMutation, type TaskList } from "../store/service/user-api"

export const Card = ({ desc, id, title }: TaskList) => {
    const [mutate, { isLoading }] = useDeleteTaskMutation()

    const deleteTask = () => {
        mutate(id)
            .unwrap()
            .then((res) => {
                console.log(res)
            })
    }
    return (
        <div className="container border w-[350px]">
            <Link to={`/task/${id}`}>
                {title}
            </Link>
            <p>{desc}</p>
            <button onClick={deleteTask} className="bg-red-400">
                {isLoading ? 'Loading' : 'Delete'}
            </button>
        </div>
    )
}
