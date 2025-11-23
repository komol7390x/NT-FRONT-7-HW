import React from 'react'
import { z } from 'zod'
import { useCreateUser } from '../../pages/home/service/mutation/useCreateUser'
import { useUpdateUser } from '../../pages/home/service/mutation/useUpdateUser'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Spinner } from '../ui/spinner'



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
        < div >
            <Button className="mt-5 cursor-pointer" onClick={() => setOpen(true)}>
                {defaultValue.id ? "Edit" : "Create"}
            </Button>

            <div className='w-[300px] mx-auto'>
                <Dialog onOpenChange={(res) => setOpen(res)} open={open}>
                    <DialogContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button className="w-full" type="submit">
                                    {isPending || updatePending ? <Spinner /> : ""}
                                    {defaultValue.id ? "Update" : "Submit"}
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
