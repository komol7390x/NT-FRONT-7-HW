import React from 'react'
import { z } from 'zod'
import { useCreateUser } from '../../pages/home/service/mutation/useCreateUser'
import { useUpdateUser } from '../../pages/home/service/mutation/useUpdateUser'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogOverlay } from '@radix-ui/react-dialog'
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
        <div>
            <Button className="mt-5 cursor-pointer" onClick={() => setOpen(true)}>
                {defaultValue?.id ? "Edit" : "Create"}
            </Button>

            <div className="w-[300px] mx-auto">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-[3px] z-40" />

                    <DialogContent className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                                {/* Name */}
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

                                {/* Email */}
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

                                {/* Username */}
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

                                {/* Submit */}
                                <Button className="w-full" type="submit" disabled={isPending || updatePending}>
                                    {(isPending || updatePending) && (
                                        <>
                                            <Spinner className="mr-2" />
                                        </>
                                    )}
                                    {defaultValue?.id ? "Update" : "Submit"}
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );

}
