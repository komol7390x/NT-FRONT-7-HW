import { useDeleteUser } from "@/pages/product-detail/query/deleteUser"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Spinner } from "../ui/spinner"
import { useForm } from 'react-hook-form'
import type { DefaultValue } from "./form"

export const DeleteButton = ({ id }: { id: string }) => {
    const client = useQueryClient()
    const { mutate, isPending } = useDeleteUser(id)
    const { reset } = useForm()

    const onSubmit = () => {
        mutate(undefined, {
            onSuccess: () => {
                client.setQueriesData(
                    { queryKey: ['user_list'] },
                    (oldData: DefaultValue[] | undefined) => {
                        if (!oldData) return []
                        return oldData.filter((item) => item.id !== Number(id))
                    }
                )
            },
        })

        reset()
    }

    return (
        <Button
            variant="destructive"
            onClick={onSubmit}     // <-- to'g'ri!
            disabled={isPending}
            className="flex items-center gap-2"
        >
            {isPending && <Spinner className="w-4 h-4" />}
            Delete
        </Button>
    )
}