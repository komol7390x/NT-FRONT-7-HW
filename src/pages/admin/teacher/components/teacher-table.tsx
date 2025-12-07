import { type ColumnDef } from '@tanstack/react-table'
import type { ITeacher } from '../../types/teacher';
import React from 'react';
import { useToggle } from '@/hooks/useToggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const [_editId, setEditID] = React.useState("");
const { open } = useToggle();
const navigate = useNavigate();
export const columns: ColumnDef<ITeacher>[] = [
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
    },
    {
        accessorKey: "isActive",
        header: "Status",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const teacher = row.original;
            //

            const editTeacher = () => {
                if (teacher.id) {
                    setEditID(teacher.id);
                    open();
                }
            };
            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={editTeacher}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => navigate(`/app/admin/teacher/${teacher.id}`)}
                            >
                                View details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            );
        },
    },
];