import React from 'react'
import { z } from 'zod'
import { useCreateUser } from '../../pages/home/service/mutation/useCreateUser'
import { useUpdateUser } from '../../pages/home/service/mutation/useUpdateUser'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'

const formSchema = z.object({
    name: z.string().nonempty().min(2).max(128),
    email: z.email().min(3).nonempty(),
    username: z.string().min(3).max(128).nonempty()
})

interface DefaultValue {
    name?: string,
    email?: string,
    username?: string,
    id?: number
}

export const CreateUser = (defaultValue: DefaultValue) => {
    const [open, setOpen] = React.useState(false);
    const { mutate, isPending } = useCreateUser()
    const { mutate: update, isPending: updatePending, } = useUpdateUser(defaultValue?.id as number)

    const client = useQueryClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            name: '',
            ...defaultValue
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        if (defaultValue?.id) {
            // ------------ UPDATE ------------
            update(data, {
                onSuccess: () => {
                    client.setQueriesData(
                        { queryKey: ['user_list'] },
                        (oldData: DefaultValue[]) => {
                            const result = oldData.map((item) =>
                                item.id === defaultValue.id ?
                                    { ...data, id: defaultValue.id } : item
                            );
                            return result
                        }
                    )
                    form.reset()
                    setOpen(false)
                },
                onError: (error) => {
                    form.setError('username', { message: error?.message })
                }
            });
        }
        else {
            // ------------ CREATE ------------
            mutate(data, {
                onSuccess: () => {
                    client.invalidateQueries({ queryKey: ['user_list'] });
                    form.reset();
                    setOpen(false)
                },
                onError: (error) => {
                    form.setError('username', { message: error?.message })
                }
            })
        }
    }
    return (
        <div>
            <Button className='border mt-5'>{defaultValue ? 'Edit' : 'Create'}</Button>
        </div>
    )
}
