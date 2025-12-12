import { z } from 'zod'
import { useLogin } from './service/useLogin'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { Roles } from '@/config/Role'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl, FormDescription, FormField, FormItem,
    FormLabel, FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PasswordInput } from '@/components/ui/password-input'
import { Spinner } from '@/components/ui/spinner'

const formSchema = z.object({
    username: z.string().nonempty().min(3).max(128).trim(),
    password: z.string().nonempty().min(3).max(128).trim(),
    role: z.string().nonempty().min(3).max(128).trim(),
})
export const Login = () => {
    const { mutate, isPending } = useLogin()
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "Admin",
            password: "Admin1!@",
            role: "Admin",
        }
    })
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        mutate(data, {
            onSuccess: (res) => {
                let role = res.data.user.role.toLowerCase()
                if (role == Roles.SUPER_ADMIN) {
                    role = Roles.ADMIN
                }
                Cookies.set('token', res.data.token);
                Cookies.set('role', role.toLowerCase());
                toast.success(res.message.uz, {
                    position: "top-center",
                    icon: "👋",
                    style: {
                        background: "#0f0f0f",
                        color: "#a3e635",
                        border: "1px solid #a3e635",
                        boxShadow: "0 0 10px #a3e635",
                        borderRadius: "12px"
                    }
                })
                navigate(`/app/${role}`)
            },
            onError: (error) => {
                console.log(error);
                alert(error.message)
            }
        }
        )
    }
    return (
        <div className='border fixed bg-yellow-100 inset-0 flex items-center justify-center'>
            <Button className=' absolute  top-10 right-10 bg-green-400'>Sign up</Button>
            <div className='w-[500px] border bg-white shadow-2xs rounded-lg p-6'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8">

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl >
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Admin">Admin</SelectItem>
                                                <SelectItem value="Teacher">Teacher</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        This is your role.
                                    </FormDescription>
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
                                    <FormDescription>
                                        This is your username.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex gap-5 items-center justify-center'>
                            <Button type="submit">{isPending ? <Spinner /> : ''}Submit</Button>
                            <Button type='reset' className='bg-red-500' onClick={() => form.reset()}>Reset</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
