import { z } from 'zod'
import { useLogin } from './service/use-login'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PasswordInput } from '@/components/ui/password-input'
import { Spinner } from '@/components/ui/spinner'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  username: z.string().min(2).max(128).trim(),
  password: z.string().trim(),
  role: z.enum(['Admin', 'Teacher']),
})
export const Login = () => {
  const { mutate, isPending } = useLogin()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: 'komol7390x',
      password: '@Komol7390x',
      role: 'Admin'
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: (res) => {
        const { role } = res.data.user
        const { token } = res.data
        if (role.toLowerCase() == 'admin' || role.toLowerCase() == 'super_admin') {
          Cookies.set('token', token)
          Cookies.set('role', 'admin')
          toast.success(res.message.uz, {
            position: 'top-center'
          });
          navigate(`/app/admin`)

        } else if (role.toLowerCase() == 'teacher') {
          Cookies.set('token', token)
          Cookies.set('role', 'admin')
          toast.success(res.message.uz, {
            position: 'top-center'
          });
          navigate(`/app/admin`)
        }
      },
      onError: (error) => {
        console.log('Error on Login', error.message)
      }
    })
  }

  return (
    <div className="fixed bg-yellow-100 inset-0 flex items-center justify-center">
      <Link to={'/register'}><Button className="absolute right-5 top-5 cursor-pointer">Sign up</Button>
      </Link>
      <div className="w-[500px] bg-white shadow-xl rounded-lg p-6">

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
                  <FormLabel>Role</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value} // ✅ Qo'shing
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <PasswordInput placeholder="password" {...field} />
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
