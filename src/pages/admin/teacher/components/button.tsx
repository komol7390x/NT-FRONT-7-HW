import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PaginationJump({ currentPage, totalPages, setSearchParams }:
    {
        currentPage: number, totalPages: number, setSearchParams: any

    }) {
    const [jumpPage, setJumpPage] = useState("");

    const visiblePages = [1, 2, 3, 4, 5];

    const handleJump = () => {
        const page = Number(jumpPage);

        if (!page || page < 1 || page > totalPages) return;

        setSearchParams({ page: String(page) });
        setJumpPage("");
    };

    return (
        <div className="flex justify-center items-center gap-3 mt-5">
            {visiblePages.map((page) => (
                <Button
                    key={page}
                    size="sm"
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setSearchParams({ page: String(page) })}
                >
                    {page}
                </Button>
            ))}
            <Input
                className="w-20 text-center"
                placeholder="page"
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleJump();
                }}
            />

            <Button size="sm" variant="outline" onClick={handleJump}>
                O‘tish
            </Button>

        </div>
    );
}
