import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGroupsList } from "./service/useGroupsList";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "react-router-dom";

export const Groups = () => {
    const { data, isPending } = useGroupsList();
    const groups = data?.data || [];

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = 5;
    const totalPages = Math.ceil(groups.length / limit);
    const paginatedGroups = groups.slice(
        (page - 1) * limit,
        page * limit
    );
    return (
        <div className="rounded-xl border bg-white shadow-sm">
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
                                <TableHead className="text-center">Student count</TableHead>
                                <TableHead className="text-center">Start</TableHead>
                                <TableHead className="text-center">End</TableHead>
                                <TableHead className="text-center">Duration</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {paginatedGroups.map((item, index) => (
                                <TableRow key={item.id} className="hover:bg-green-500 hover:text-white cursor-pointer">
                                    <TableCell className="text-center font-medium border">
                                        {(page - 1) * limit + index + 1}
                                    </TableCell>
                                    <TableCell className="font-semibold border">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="border text-center">
                                        {item.students.length}
                                    </TableCell>
                                    <TableCell className="text-center border">
                                        {item.startTime.slice(0, 5)}
                                    </TableCell>
                                    <TableCell className="text-center border">
                                        {item.endTime.slice(0, 5)}
                                    </TableCell>
                                    <TableCell className="text-center border">
                                        {item.durationInMonths} oy
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
                </>
            )}
        </div>
    );
};
