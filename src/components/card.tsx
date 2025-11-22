import { useState } from "react";
import { Link } from "react-router";
import { useDeleteTaskMutation, type TaskList } from "../store/service/user-api";
import { UpdateForm } from "./update-form";

export const Card = ({ desc, id, title }: TaskList) => {
    const [mutate, { isLoading }] = useDeleteTaskMutation();
    const [showUpdate, setShowUpdate] = useState(false);

    const deleteTask = () => {
        mutate(id)
            .unwrap()
            .then((res) => console.log(res));
    };

    return (
        <div className="container border w-[350px] mt-5 rounded-2xl py-3">
            <Link to={`/task/${id}`} className="text-xl font-bold">{title}</Link>
            <p>{desc}</p>
            <div className="flex gap-2 mt-2">
                <button onClick={() => setShowUpdate(!showUpdate)} className="bg-blue-400 p-1 rounded">
                    {showUpdate ? "Close" : "Update"}
                </button>
                <button onClick={deleteTask} className="bg-red-400 p-1 rounded">
                    {isLoading ? "Loading" : "Delete"}
                </button>
            </div>
            {showUpdate && (
                <UpdateForm
                    id={id as number}
                    currentTitle={title}
                    currentDesc={desc}
                    onClose={() => setShowUpdate(false)}
                />
            )}
        </div>
    );
};
