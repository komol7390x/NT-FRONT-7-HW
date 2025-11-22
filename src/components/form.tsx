import { useForm } from "react-hook-form"
import { useCreateTaskMutation } from "../store/service/user-api"

export interface Inputs {
    title: string,
    id?: number,
    desc: string
}

export const Form = () => {
    const { handleSubmit, reset, register } = useForm<Inputs>()
    const [mutate, { isLoading }] = useCreateTaskMutation()

    const submit = (data: Inputs) => {
        mutate(data)
            .unwrap()
            .then((res) => {
                console.log(res)
            })
        reset()
    }
    return (
        <div className="container w-[350px]">
            <form onSubmit={handleSubmit(submit)}>
                <div className="border mt-5">
                    <input type="text" {...register('title')} className="bg-amber-300 w-full" />
                </div>
                <div className="border mt-5 ">
                    <input type="text" {...register('desc')} className="bg-amber-300 w-full" />
                </div>
                <button className="p-2 bg-green-200 mt-5">
                    {isLoading ? 'Loading...' : 'Create'}
                </button>
            </form>
        </div>
    )
}
