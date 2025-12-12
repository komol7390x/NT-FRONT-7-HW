import { useNavigate, useSearchParams } from "react-router-dom";
import { useTeachersListPagination } from "./service/useTeacherList";
import { useToggle } from "@/hooks/useToggle";
import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TeacherFormWrapper } from "./components/teacher-form-wrapper";
import { TeacherForm } from "./components/teacher-form";
import { Button } from "@/components/ui/button";
import type { ITeacher } from "../types/teacher";
import { TeacherTable } from "./components/table";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { PaginationJump } from "./components/button";

export const Teacher = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading, isFetching } = useTeachersListPagination(searchParams.get('page') || '1');
    const { close, open, isOpen } = useToggle()
    // const buttons = Array(data?.totalPages || 1).fill(null)
    const { close: close2, isOpen: isOpen2, open: open2 } = useToggle();
    const [editId, setEditID] = React.useState("");

    const closeEditModal = () => {
        setEditID("");
        close2();
    };
    const navigate = useNavigate();
    const teachers: ITeacher[] = React.useMemo(() => {
        if (!Array.isArray(data?.data)) return [];
        return data.data.map((item, index) => ({
            groups: item.groups?.length || 0,
            id: item.id,
            count: index + 1,
            isActive: item.isActive ? "Active" : "Blocked",
            name: item.name,
            specification: item.specifications.map((item) => item.name).join(", "),
            username: item.username,
        }));
    }, [data]);

    const columns: ColumnDef<ITeacher>[] = [
        {
            accessorKey: "count",
            header: "Count",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "specification",
            header: "Specification",
        },
        {
            accessorKey: "username",
            header: "Username",
        },

        {
            accessorKey: "groups",
            header: "Groups",
            cell: ({ row }) => row.original.groups,
        },

        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.isActive;

                return status === "Active" ? (
                    <span className="text-green-600 font-semibold">Active</span>
                ) : (
                    <span className="text-red-500 font-semibold">Blocked</span>
                );
            },
        },

        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const teacher = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => {
                                    if (teacher.id) {
                                        setEditID(teacher.id);
                                        open2();
                                    }
                                }}
                            >
                                Edit
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() => navigate(`/app/admin/teacher/${teacher.id}`)}
                            >
                                View details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];


    return (
        <div className="container">
            {isLoading || isFetching ? <Spinner /> : (
                <div>
                    <Dialog
                        open={isOpen2}
                        onOpenChange={(open) => {
                            if (!open) closeEditModal();
                        }}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Teacher Edit</DialogTitle>
                                <DialogDescription>
                                    <TeacherFormWrapper
                                        closeEditModal={closeEditModal}
                                        id={editId}
                                    />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Dialog onOpenChange={close} open={isOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Teacher Create</DialogTitle>
                                <DialogDescription>
                                    <TeacherForm closeModal={close} />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Button onClick={open} className="mb-5">
                        Create
                    </Button>
                    <TeacherTable columns={columns} data={teachers} />
                    {isFetching || isLoading ? (
                        <Skeleton className="h-[30px] w-[300px]" />
                    ) : (
                        <PaginationJump
                            currentPage={data?.currentPage as number}
                            totalPages={data?.totalPages as number}
                            setSearchParams={setSearchParams}
                        />

                    )}

                </div>
            )}
        </div>
    )
}
