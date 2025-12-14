// group-of-students.tsx
import { useParams, useSearchParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import avatar from "@/assets/img/avatar.png";
import { useState } from "react";
import { UpdateStudent } from "./update-student";
import { useStudentListOfGroup } from "./service/useStudentListOfGroup";

export const GroupOfStudents = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isPending } = useStudentListOfGroup(id as string);

    const students = data?.data.students.sort((a, b) =>
        a.name.localeCompare(b.name)
    ) || [];
    const [behavior, setBeahavior] = useState<string | null>('')
    const [grade, setGrade] = useState<number | null>(null)
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const limit = 10;
    const totalPages = Math.ceil(students.length / limit);
    const paginatedStudents = students.slice((page - 1) * limit, page * limit);

    if (isPending) return <Spinner />;
    if (!students) return <div>Group not found</div>;

    return (
        <div className="mt-5">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead className="w-[50px] text-center">№</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Grade</TableHead>
                        <TableHead className="text-center">Behavior</TableHead>
                        <TableHead className="text-center">Img</TableHead>
                        <TableHead className="text-center">Group</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {paginatedStudents.map((item, index) => (
                        <TableRow
                            key={item.id}
                            className="hover:bg-green-500 hover:text-white cursor-pointer"
                            onClick={() => {
                                setSelectedId(item.id); setOpen(true); setBeahavior(item.behavior)
                                setGrade(item.grade)
                            }}
                        >
                            <TableCell className="text-center border">{(page - 1) * limit + index + 1}</TableCell>
                            <TableCell className="border font-semibold">{item.name}</TableCell>
                            <TableCell className="border text-center">{item.email}</TableCell>
                            <TableCell className="border text-center">{item.grade ?? "-"}</TableCell>
                            <TableCell className="border text-center">
                                {item.behavior ? (item.behavior.length > 15 ? `${item.behavior.slice(0, 15)}...` : item.behavior) : "-"}
                            </TableCell>
                            <TableCell className="border text-center">
                                <div className="w-6 mx-auto">
                                    <img src={item.avatarUrl?.length ? item.avatarUrl : avatar} alt="avatar" />
                                </div>
                            </TableCell>
                            <TableCell className="border text-center">{data?.data.name}</TableCell>
                            <TableCell className="border text-center">
                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                    {item.isActive ? "Active" : "Inactive"}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-center gap-2 py-4 mt-10">
                <button disabled={page === 1} onClick={() => setSearchParams({ page: String(page - 1) })} className="rounded-md border px-3 py-1 text-sm disabled:opacity-50">Prev</button>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button key={index} onClick={() => setSearchParams({ page: String(index + 1) })} className={`rounded-md border px-3 py-1 text-sm ${page === index + 1 ? "bg-black text-white" : "bg-white"}`}>
                        {index + 1}
                    </button>
                ))}
                <button disabled={page === totalPages} onClick={() => setSearchParams({ page: String(page + 1) })} className="rounded-md border px-3 py-1 text-sm disabled:opacity-50">Next</button>
            </div>

            {selectedId && <UpdateStudent id={selectedId} open={open} behavior={behavior as string}
                grade={grade as number} setOpen={setOpen} setSelectedId={setSelectedId}
                type={['groups_list']}
            />}
        </div>
    );
};
