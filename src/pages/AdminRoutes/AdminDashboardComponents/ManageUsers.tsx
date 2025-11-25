/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import featureImg from "@/assets/images/features.jpg";
import { BounceLoader } from "react-spinners";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashBoardBreadcrumb from "@/components/layouts/layout-items/DashBoardBreadCrumb";
import { toast } from "sonner";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useChangeUserStatusMutation, useGetAllUsersQuery } from "@/redux/features/admin/admin.api.";


export default function AdminUsers() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [dateSearchTerm, setDateSearchTerm] = useState("");
    const [blockedFilter, setBlockedFilter] = useState("");

    const query: Record<string, string> = {
        page: currentPage.toString(),
        limit: limit.toString(),
    };
    if (searchTerm) query.searchTerm = searchTerm;
    if (dateSearchTerm) query.dateSearch = dateSearchTerm;
    if (blockedFilter) query.isBlocked = blockedFilter;

    const { data: usersData, isLoading } = useGetAllUsersQuery(query);


    const users = usersData?.data || [];
    const totalPage = usersData?.meta?.totalPage || 1;
    console.log(totalPage)

    const [changeUserStatus] = useChangeUserStatusMutation();

    const formatDate = (date?: string) => (date ? new Date(date).toLocaleString() : "N/A");

    const handleResetFilters = () => {
        setSearchTerm("");
        setDateSearchTerm("");
        setBlockedFilter("");
        setCurrentPage(1);
    };

    const handleChangeStatus = async (user: any) => {
        try {
            const newStatus = user.isBlocked === "UNBLOCKED" ? "BLOCKED" : "UNBLOCKED";
            console.log(user._id, newStatus)
            const status = {
                isBlocked : newStatus
            }
            await changeUserStatus({ id: user._id, status}).unwrap();
            toast.success(`User ${user.name} has been ${newStatus.toLowerCase()}`);
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update user status");
        }
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <BounceLoader color="#f97316" size={80} />
            </div>
        );
    }

    return (
        <>
            <DashBoardBreadcrumb
                title="Manage Users"
                description="View and manage all registered users"
                backgroundImage={featureImg}
            />

            <section className="flex flex-wrap justify-center items-center gap-3 mb-4">
                <div className="flex-grow min-w-[250px] w-full sm:w-auto">
                    <Input
                        type="text"
                        placeholder="Search by Name or Email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-none border border-gray-400 shadow-sm text-sm"
                    />
                </div>

                <div className="flex-grow min-w-[250px] w-full sm:w-auto">
                    <Input
                        type="text"
                        placeholder="Search by Date (YYYY-MM-DD)"
                        value={dateSearchTerm}
                        onChange={(e) => setDateSearchTerm(e.target.value)}
                        className="w-full rounded-none border border-gray-400 shadow-sm text-sm"
                    />
                </div>

                <div className="w-full sm:w-[200px] bg-background">
                    <Select onValueChange={(val) => setBlockedFilter(val)} value={blockedFilter}>
                        <SelectTrigger className="rounded-none border border-gray-400 shadow-sm text-xs w-full">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                            <SelectItem value="BLOCKED">Blocked</SelectItem>
                            <SelectItem value="UNBLOCKED">Unblocked</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full sm:w-[150px]">
                    <Button
                        className="w-full bg-primary text-white rounded-none hover:bg-primary/90 text-sm"
                        onClick={handleResetFilters}
                    >
                        Reset Filters
                    </Button>
                </div>
            </section>

            {users.length > 0 ? (
                <div className="max-w-7xl mx-auto p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Picture</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[100px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user: any) => (
                                <TableRow key={user._id}>
                                    <TableCell>
                                        <img
                                            src={user.picture}
                                            alt={user.name}
                                            loading="lazy"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{formatDate(user.createdAt?.$date || user.createdAt)}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-none text-xs font-medium ${user.isBlocked === "BLOCKED"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {user.isBlocked === "BLOCKED" ? "BLOCKED" : "ACTIVE"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            className="rounded-none text-xs"
                                            variant={user.isBlocked === "UNBLOCKED" ? "destructive" : "secondary"}
                                            onClick={() => handleChangeStatus(user)}
                                        >
                                            {user.isBlocked === "UNBLOCKED" ? "Block" : "Unblock"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {totalPage > 1 && (
                        <div className="flex justify-end mt-4 w-full">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
                                        <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                                            <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
                                            className={currentPage === totalPage ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-10">No User Data Found</p>
            )}
        </>
    );
}
