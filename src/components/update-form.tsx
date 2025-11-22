import { useForm } from "react-hook-form";
import { useUpdateTaskDetailMutation } from "../store/service/user-api";

interface UpdateFormProps {
    id: number;
    currentTitle: string;
    currentDesc: string;
    onClose: () => void; // formni yopish uchun
}

export const UpdateForm = ({ id, currentTitle, currentDesc, onClose }: UpdateFormProps) => {
    const { register, handleSubmit } = useForm({
        defaultValues: { title: currentTitle, desc: currentDesc },
    });

    const [updateTask, { isLoading }] = useUpdateTaskDetailMutation();

    const submit = (data: { title: string; desc: string }) => {
        updateTask({ id, body: data })
            .unwrap()
            .then(() => onClose());
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="border p-3 mt-2 rounded">
            <input {...register("title")} className="border p-1 w-full mb-1" />
            <input {...register("desc")} className="border p-1 w-full mb-1" />
            <button type="submit" className="bg-yellow-400 p-2 rounded">
                {isLoading ? "Updating..." : "Update"}
            </button>
            <button type="button" onClick={onClose} className="ml-2 p-2 bg-gray-300 rounded">
                Cancel
            </button>
        </form>
    );
};
