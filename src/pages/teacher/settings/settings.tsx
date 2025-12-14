import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTeacherInfo } from "../teacher/service/useteacherId"
import { Button } from "@/components/ui/button"
import avatarImg from "@/assets/img/avatar.png"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { useEffect } from "react"
import { useUpdateTeacherDetail } from "./service/useUpdateTeacher"
import { useQueryClient } from "@tanstack/react-query"
import { useUpdateTeacherImage } from "./service/useUpdateImg"

const formSchema = z.object({
    username: z.string().max(128).transform(v => v?.trim() === "" ? undefined : v).optional(),
    name: z.string().max(128).transform(v => v?.trim() === "" ? undefined : v).optional(),
});

export const Settings = () => {
    const queryClient = useQueryClient()
    const { data, isPending } = useTeacherInfo()

    const { mutate, isPending: teacherPending } =
        useUpdateTeacherDetail()
    const { mutate: imgMutate, isPending: imgPending } = useUpdateTeacherImage();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            name: "",
        },
    })
    useEffect(() => {
        if (data?.data) {
            form.reset({
                username: data.data.username || "",
                name: data.data.name || "",
            })
        }
    }, [data, form])

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(
            {
                name: values.name || "",
                username: values.username || "",
            },
            {
                onSuccess: (res) => {
                    queryClient.invalidateQueries({ queryKey: ["teacherId"] });
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
                },
                onError: () => {
                    toast.error("Ma'lumotlar yuklashda xatolik!", {
                        position: "top-center",
                        icon: "👋",
                        style: {
                            background: "#ff0000",
                            color: "#ebebeb",
                            border: "1px solid #e63535",
                            boxShadow: "0 0 10px #e63535",
                            borderRadius: "12px"
                        }
                    });
                },
            }
        );
    };


    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast("File hajmi katta!", { position: "bottom-right" });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        imgMutate(formData, {
            onSuccess: (res) => {
                toast(res.message.uz, { position: "bottom-right" });
                queryClient.invalidateQueries({ queryKey: ["teacherId"] });
            },
            onError: (err: any) => {
                console.error("Xatolik:", err.response?.data || err.message);
                toast("Rasm yuklashda xatolik!", { position: "bottom-right" });
            },
        });
    };

    if (isPending) return <Spinner />

    return (
        <div className="px-10">
            <div className="py-5 w-[150px]">
                <div className="rounded-full mb-5 overflow-hidden border h-[90px] w-[90px]">
                    {imgPending ? <Spinner /> : (<img
                        className="w-full h-full object-cover"
                        src={data?.data.avatarUrl || avatarImg}
                        alt="avatar"
                    />)}
                </div>

                <Button
                    type="button"
                    variant="outline"
                    asChild
                >
                    <label htmlFor="upload_image" className="cursor-pointer hover:bg-amber-300">
                        Change image
                    </label>
                </Button>

                <input
                    hidden
                    id="upload_image"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={uploadImage}
                />
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
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
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display username.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={teacherPending} type="submit">
                        {teacherPending ? <Spinner /> : "Update"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
