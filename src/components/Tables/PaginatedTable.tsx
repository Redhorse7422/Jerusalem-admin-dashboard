import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@/assets/icons";

export function PaginatedTable<T>({
    className,
    data,
    columns,
    itemsPerPage = 10,
}: TableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Get the current page's data
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Handle rows per page change
    const handleRowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page when rows per page changes
    };

    return (
        <div >

            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow className="border-none uppercase">
                        {columns.map((column) => (
                            <TableHead
                                key={column.key}
                                className={`min-w-[120px] ${column.align === "right"
                                    ? "text-right"
                                    : column.align === "center"
                                        ? "text-center"
                                        : "text-left"
                                    }`}
                            >
                                {column.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {currentData.map((item, i) => (
                        <TableRow className="text-base font-medium text-dark dark:text-white" key={i}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    className={`${column.align === "right"
                                        ? "text-right"
                                        : column.align === "center"
                                            ? "text-center"
                                            : "text-left"
                                        }`}
                                >
                                    {column.render ? column.render(item) : (item as any)[column.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Rows Per Page & Pagination */}
            <div className="mt-4 flex justify-between items-center">
                {/* Rows Per Page Selection */}
                <div className="text-sm text-gray-700 dark:text-white flex items-center">
                    Rows per page:
                    <select
                        value={rowsPerPage}
                        onChange={handleRowsChange}
                        className="ml-2 rounded border px-2 py-1 text-sm"
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Pagination Controls */}
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        <ArrowLeftIcon />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`flex items-center justify-center w-10 h-10 rounded-full ${currentPage === i + 1 ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
