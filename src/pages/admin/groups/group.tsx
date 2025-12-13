import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/useToggle";
import img from '@/assets/img/logo-img.png'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useGroupsList } from "./service/useGroupsList";
import { TeacherTable } from "../teacher/components/table";
import { GroupForm } from "./components/group-form";

type Groups = {
    count: number;
    studentCount: number;
    name: string;
    id?: string;
    isActive: "Active" | "Blocked";
    startTime: string;
    endTime: string;
    teacherId?: string;
    durationInMonths: string;
    teacherName: string;
    teacherAvatarUrl: string;
};

export const Group = () => {
    const { data, isLoading } = useGroupsList();
    const { close, isOpen, open } = useToggle();

    const columns: ColumnDef<Groups>[] = [
        {
            accessorKey: "count",
            header: "Count",
        },
        {
            accessorKey: "studentCount",
            header: "Student Count",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "startTime",
            header: "Start Time",
        },
        {
            accessorKey: "endTime",
            header: "End Time",
        },
        {
            accessorKey: "durationInMonths",
            header: "Duration In Months",
        },
        {
            accessorKey: "teacherName",
            header: "Teacher Name",
        },
        {
            accessorKey: "teacherAvatarUrl",
            header: "T Image",
            cell: ({ row }) => {
                const url = row.original;
                const imgTeacher =  img
                return (
                    <>
                        {url.teacherId ? (
                            <Link
                                className="block border-2 border-transparent hover:border-blue-500 transition w-[30px] h-[30px] rounded-full overflow-hidden"
                                to={`/app/admin/teacher/${url.teacherId}`}
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src={imgTeacher}
                                    alt="img"
                                />
                            </Link>
                        ) : (
                            ""
                        )}
                    </>
                );
            },
        },
        {
            accessorKey: "isActive",
            header: "Status",
        },
        {
            header: "Action",
            cell: ({ row }) => {
                return <Button>{row ? 'Edit' : ''}</Button>;
            },
        },
    ];

    const groups: Groups[] = React.useMemo(() => {
        if (!Array.isArray(data?.data)) return [];
        return data.data.map((item, index) => ({
            count: index + 1,
            id: item.id,
            studentCount: item.students.length,
            isActive: item.isActive ? "Active" : "Blocked",
            name: item.name,
            teacherName: item?.teacher?.name,
            teacherAvatarUrl: item?.teacher?.avatarUrl,
            teacherId: item?.teacher?.id,
            startTime: item?.startTime || "0",
            endTime: item?.endTime || "0",
            durationInMonths: `${item?.durationInMonths || "0"}`,
        }));
    }, [data]);

    const closeModal = () => {
        close();
    };

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Dialog onOpenChange={closeModal} open={isOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Teacher Create</DialogTitle>
                                <DialogDescription>
                                    <GroupForm closeModal={closeModal} />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Button onClick={open} className="mb-5">
                        Create
                    </Button>
                    <TeacherTable columns={columns} data={groups} />
                </>
            )}
        </div>
    );
};
