import { z } from 'zod'
import { useLogin } from '../service/use-login'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { PasswordInput } from '@/components/ui/password-input'
import { Spinner } from '@/components/ui/spinner'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  username: z.string().min(2).max(128).trim(),
  password: z.string().trim(),
  role: z.string().trim()
})
export const Login = () => {
  const { mutate, isPending } = useLogin()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      role: ''
    }
  })
  // const [role, setRole] = useState("Admin")

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: (res) => {
        Cookies.set('token', res.data.token);
        Cookies.set('role', res.data.user.role);
        toast.success(res.message.uz, {
          position: 'top-center'
        });
        navigate(`app/${res.data.user.role.toLowerCase()}`)
      },
      onError: (error) => {
        console.log('Error on Login', error.message)
      }
    })
  }

  return (
    <div className="fixed bg-blue-300 inset-0 flex items-center justify-center">
      <Link to={'/register'}><Button className="absolute right-5 top-5 cursor-pointer">Sign up</Button>
      </Link>
      <div className="w-[500px] bg-white shadow rounded-lg p-6">

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-[30px]"
          >

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">{isPending ? <Spinner /> : ""} Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
