
import { Spinner } from "@/components/ui/spinner";
import { useTeacherInfo } from "./service/useteacherId";
import avatar from '@/assets/img/avatar.png'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export const TeacherDetail = () => {
    const { data, isLoading } = useTeacherInfo()
    if (!data?.data) {
        return <div>No teacher data</div>;
    } const avatarImg = data?.data?.avatarUrl ?? avatar
    return (
        <div>
            {isLoading ? <Spinner /> : (<div className="container">
                <div className="w-[100px] overflow-hidden rounded-full pt-3 bg-green-50  m-4"><img src={avatarImg} alt="avatar" /></div>
                <Card>
                    <CardHeader>
                        <CardTitle>Name: {data.data.name}</CardTitle>
                        <CardTitle>Username: {data.data.username}</CardTitle>
                        {data.data.specifications.map((Item) => (
                            <div>
                                <CardDescription>Specifications name: {Item.name}</CardDescription>
                                <CardDescription>Specifications category: {Item.category}</CardDescription>
                            </div>
                        ))}
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-400">Status: {data.data.isActive ? 'Active' : 'Blocked'}</p>
                        <p className="text-red-500 ">Role: {data.data.role}</p>
                    </CardContent>
                </Card>
            </div>)}
        </div>
    )
}
