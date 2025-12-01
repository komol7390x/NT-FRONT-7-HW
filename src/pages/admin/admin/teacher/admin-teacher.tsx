import { useToggle } from "@/hooks/useToggle";
import { useTeachersList } from "../service/query/useTeachersList";
import { useNavigate, useSearchParams } from "react-router-dom";

type Payment = {
    count: number;
    name: string;
    id?: string;
    specification: string;
    isActive: "Active" | "Blocked";
    groups: number;
    username: string;
};
export const Teacher = () => {
    const { data, isLoading } = useTeachersList();
    const { close, isOpen, open } = useToggle();
    const { close: close2, isOpen: isOpen2, open: open2 } = useToggle();
    const [_, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    return (
        <div>

        </div>
    )
}
