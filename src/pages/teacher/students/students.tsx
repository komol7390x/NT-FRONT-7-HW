import { Spinner } from "@/components/ui/spinner"
import { useStudentList } from "./service/useStudentList"
import { TableHeader, TableRow, Table, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { useSearchParams } from "react-router-dom";
import avatar from '@/assets/img/avatar.png'
import { useState } from "react";
import { UpdateStudent } from "./update-student";

export const Students = () => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [behavior, setBeahavior] = useState<string | null>('')
    const [grade, setGrade] = useState<number | null>(null)
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = 10;
    const { isPending, data } = useStudentList()
    const students = data?.data.sort((a, b) =>
        a.name.localeCompare(b.name)
    ) || [];

    const totalPages = Math.ceil(students.length / limit);
    const paginatedGroups = students.slice(
        (page - 1) * limit,
        page * limit
    );
    return (
        <div className="rounded-xl border bg-white shadow-sm mt-5">
            {isPending ? (
                <div className="flex justify-center py-10">
                    <Spinner />
                </div>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="w-[50px] text-center">№</TableHead>
                                <TableHead >Name</TableHead>
                                <TableHead className="text-center">Email</TableHead>
                                <TableHead className="text-center">Grade</TableHead>
                                <TableHead className="text-center">Behavior</TableHead>
                                <TableHead className="text-center">Img</TableHead>
                                <TableHead className="text-center">Group Name</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {paginatedGroups.map((item, index) => (
                                <TableRow
                                    onClick={() => {
                                        setSelectedId(item.id);
                                        setOpen(true);
                                        setBeahavior(item.behavior)
                                        setGrade(item.grade)
                                    }}
                                    key={item.id}
                                    className="hover:bg-green-500 hover:text-white cursor-pointer">
                                    <TableCell className="text-center font-medium border">
                                        {(page - 1) * limit + index + 1}
                                    </TableCell>
                                    <TableCell className="font-semibold border">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="border text-center">
                                        {item.email}
                                    </TableCell>
                                    <TableCell className="border text-center">
                                        {item.grade || '-'}
                                    </TableCell>
                                    <TableCell className="text-center border">
                                        {item.behavior
                                            ? item.behavior.length > 15
                                                ? `${item.behavior.slice(0, 15)}...`
                                                : item.behavior
                                            : '-'}
                                    </TableCell>
                                    <TableCell className="text-center border">
                                        <div className="w-5 mx-auto">
                                            <img src={item.avatarUrl.length == 0 ? avatar : item.avatarUrl} alt="" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center border">
                                        {item?.group?.name}
                                    </TableCell>
                                    <TableCell className="text-center border">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${item.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {item.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="flex justify-center gap-2 py-4 mt-10">
                        <button
                            disabled={page === 1}
                            onClick={() =>
                                setSearchParams({ page: String(page - 1) })
                            }
                            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    setSearchParams({ page: String(index + 1) })
                                }
                                className={`rounded-md border px-3 py-1 text-sm ${page === index + 1
                                    ? "bg-black text-white"
                                    : "bg-white"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            disabled={page === totalPages}
                            onClick={() =>
                                setSearchParams({ page: String(page + 1) })
                            }
                            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
                        >
                            Next
                        </button>

                    </div>

                    {selectedId && <UpdateStudent
                        type={['student_list']}
                        id={selectedId}
                        behavior={behavior as string}
                        grade={grade as number}
                        open={open}
                        setOpen={setOpen}
                        setSelectedId={setSelectedId} />}
                </>
            )}
        </div>
    )
}
