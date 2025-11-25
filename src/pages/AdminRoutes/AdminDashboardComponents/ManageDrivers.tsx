/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import featureImg from "@/assets/images/features.jpg";
import { BounceLoader } from "react-spinners";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashBoardBreadcrumb from "@/components/layouts/layout-items/DashBoardBreadCrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useChangeDriverStatusMutation, useGetAllDriversQuery } from "@/redux/features/admin/admin.api.";

export default function ManageDrivers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateSearchTerm, setDateSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [licenseUrl, setLicenseUrl] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const query: Record<string, string> = {
    page: currentPage.toString(),
    limit: limit.toString(),
  };
  if (searchTerm) query.searchTerm = searchTerm;
  if (dateSearchTerm) query.dateSearch = dateSearchTerm;
  if (statusFilter) query.driverStatus = statusFilter;

  const { data: driversData, isLoading } = useGetAllDriversQuery(query);

  const [changeDriverStatus] = useChangeDriverStatusMutation();

  const drivers = driversData?.data.data || [];
  const totalPage = driversData?.data?.meta?.totalPage || 1;

  const formatDate = (date?: string) => (date ? new Date(date).toLocaleString() : "N/A");

  const handleResetFilters = () => {
    setSearchTerm("");
    setDateSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  const handleViewLicense = (url: string) => {
    setLicenseUrl(url);
    setDialogOpen(true);
  };

  const handleAction = async (driver: any) => {
    try {
      const newStatus = driver.driverStatus === "APPROVED" ? "SUSPENDED" : "APPROVED";

      const status = {
        driverStatus: newStatus
      };
      await changeDriverStatus({ id: driver._id, status }).unwrap();

      toast.success(`Driver ${driver.userId?.name} has been ${newStatus.toLowerCase()}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update driver status");
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
          title="Manage Drivers"
          description="View and manage all registered drivers"
          backgroundImage={featureImg}
        />
        <section className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <div className="flex-grow min-w-[250px] w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search by Vehicle Number"
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
            <Select onValueChange={setStatusFilter} value={statusFilter}>
              <SelectTrigger className="rounded-none border border-gray-400 shadow-sm text-xs w-full">
                <SelectValue placeholder="Filter by Driver Status" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
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
        {drivers.length > 0 ? (
          <div className="max-w-7xl mx-auto p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Picture</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined At</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver: any) => (
                  <TableRow key={driver._id}>
                    <TableCell>
                      {driver.userId?.picture ? (
                        <img
                          src={driver.userId.picture}
                          alt={driver.userId.name}
                          loading="lazy"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                          N/A
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{driver.userId?.name}</TableCell>
                    <TableCell>{driver.userId?.email}</TableCell>
                    <TableCell>
                      {driver.vehicle?.vehicleNumber} ({driver.vehicle?.vehicleType})
                    </TableCell>
                    <TableCell>
                      {driver.drivingLicense ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-none text-xs hover:border"
                          onClick={() => handleViewLicense(driver.drivingLicense)}
                        >
                          View
                        </Button>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-none text-xs font-medium ${driver.driverStatus === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : driver.driverStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {driver.driverStatus}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(driver.createdAt)}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="rounded-none text-xs hover:border"
                        variant={driver.driverStatus === "APPROVED" ? "destructive" : "default"}
                        onClick={() => handleAction(driver)}
                      >
                        {driver.driverStatus === "APPROVED" ? "Suspend" : "Approve"}
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
          <p className="text-center text-muted-foreground py-10">No Driver Data Found</p>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg w-full rounded-none">
            <DialogHeader>Driver License</DialogHeader>
            <div className="p-4">
              <img src={licenseUrl} loading="lazy" alt="Driver License" className="w-full" />
            </div>
            <DialogFooter>
              <Button className="rounded-none" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  );
}
