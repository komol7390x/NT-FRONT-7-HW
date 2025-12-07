import { useNavigate, useSearchParams } from "react-router-dom";
import { useTeachersListPagination } from "./service/useTeacherList";
import { useToggle } from "@/hooks/useToggle";
import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TeacherFormWrapper } from "./components/teacher-form-wrapper";
import { TeacherForm } from "./components/teacher-form";
import { Button } from "@/components/ui/button";

export const Teacher = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading, isFetching } = useTeachersListPagination(searchParams.get('page') || '1');
    const { close, open, isOpen } = useToggle()
    const buttons = Array(data?.totalPages || 1).fill(null)
    const { close: close2, isOpen: isOpen2, open: open2 } = useToggle();
    const [editId, setEditID] = React.useState("");

    const closeEditModal = () => {
        setEditID("");
        close2();
    };
    const navigate = useNavigate();

    return (
        <div className="container">
            {isLoading || isFetching ? <Spinner /> : (
                <div>
                    <Dialog onOpenChange={closeEditModal} open={isOpen2}>
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
                </div>
            )}
        </div>
    )
}
