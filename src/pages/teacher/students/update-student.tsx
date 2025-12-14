// update-student.tsx
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useUpdateStudent } from "./service/useUpdateStudent";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
    grade: z.number().min(1).max(100),
    behavior: z.string().trim().min(3),
});

type FormValues = z.infer<typeof formSchema>;

interface UpdateStudentProps {
    id: string;
    open: boolean;
    setOpen: (v: boolean) => void;
    setSelectedId: (id: string | null) => void;
    behavior: string;
    grade: number,
    type: string[]
}
export const UpdateStudent = ({ id, open, setOpen, setSelectedId, behavior, grade, type }: UpdateStudentProps) => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useUpdateStudent(id);
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            grade: grade ?? 1,
            behavior: behavior ?? ''
        },
    });

    const onSubmit = (values: FormValues) => {
        mutate(values, {
            onSuccess: (data) => {
                toast.success(data.message.uz, { position: "top-center" });
                setOpen(false);
                setSelectedId(null);
                queryClient.invalidateQueries({ queryKey: type });
            },
            onError: (e) => console.log(e.message),
        });
    };

    return (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setSelectedId(null); }}>
            <DialogOverlay className="fixed inset-0 bg-black/5 backdrop-blur-sm" />
            <DialogContent className="sm:max-w-[425px] absolute top-80">
                <DialogHeader>
                    <DialogTitle>Update student</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="grade"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <FormLabel>Grade</FormLabel>
                                        <FormControl>
                                            <Slider
                                                value={[field.value]}
                                                max={100}
                                                step={1}
                                                className="w-full my-5"
                                                onValueChange={(val: number[]) => field.onChange(val[0])}
                                                onBlur={field.onBlur}
                                            />
                                        </FormControl>
                                        <FormDescription>Set the student's grade (1-100)</FormDescription>
                                        <FormMessage />
                                    </div>
                                    <Input
                                        type="number"
                                        value={field.value}
                                        min={0}
                                        max={100}
                                        onChange={(e) => { const val = Number(e.target.value); if (!isNaN(val)) field.onChange(val); }}
                                        className="w-16"
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="behavior"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Behavior</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Good" {...field} />
                                    </FormControl>
                                    <FormDescription>Student behavior description</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            {isPending ? <Spinner /> : "Update"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
