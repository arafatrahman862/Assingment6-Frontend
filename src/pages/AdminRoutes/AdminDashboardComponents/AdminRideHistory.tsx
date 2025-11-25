/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import featureImg from "@/assets/images/features.jpg";
import { BounceLoader } from "react-spinners";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllRidesForAdminQuery } from "@/redux/features/rides/rides.api";
import DashBoardBreadcrumb from "@/components/layouts/layout-items/DashBoardBreadCrumb";


export default function AdminRideHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateSearchTerm, setDateSearchTerm] = useState("");
  const [rideStatus, setRideStatus] = useState("");

  const query: Record<string, string> = {
    page: currentPage.toString(),
    limit: limit.toString(),
  };
  if (searchTerm) query.searchTerm = searchTerm;
  if (dateSearchTerm) query.dateSearch = dateSearchTerm;
  if (rideStatus) query.rideStatus = rideStatus;

  const { data: ridesData, isLoading } = useGetAllRidesForAdminQuery(query);
  const rides = ridesData?.data?.data || [];
  const totalPage = ridesData?.data?.meta?.totalPage || 1;

  const formatDate = (date?: string) => (date ? new Date(date).toLocaleString() : "N/A");

  const handleResetFilters = () => {
    setSearchTerm("");
    setDateSearchTerm("");
    setRideStatus("");
    setCurrentPage(1);
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
          title="Ride History"
          description="View full details of all rides created by all users"
          backgroundImage={featureImg}
        />
        <section className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <div className="flex-grow min-w-[250px] w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search by Ride Status or Transaction ID"
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
            <Select onValueChange={(val) => setRideStatus(val)} value={rideStatus}>
              <SelectTrigger className="rounded-none border border-gray-400 shadow-sm text-xs w-full">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="ACCEPTED">Accepted</SelectItem>
                <SelectItem value="PICKED_UP">Picked Up</SelectItem>
                <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                <SelectItem value="ARRIVED">Arrived</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Filters */}
          <div className="w-full sm:w-[150px]">
            <Button
              className="w-full bg-primary text-white rounded-none hover:bg-primary/90 text-sm hover:border"
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </section>

        {/* Table */}
        {rides.length > 0 ? (
          <div className="max-w-7xl mx-auto p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Distance (km)</TableHead>
                  <TableHead>Fare (৳)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Completed At</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rides.map((ride: any) => (
                  <TableRow key={ride._id}>
                    <TableCell>{ride.travelDistance?.toFixed(2) ?? "N/A"}</TableCell>
                    <TableCell>{ride.fare ?? "N/A"}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-none text-xs font-medium ${ride.rideStatus === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : ride.rideStatus === "IN_TRANSIT"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {ride.rideStatus ?? "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>{ride.payment?.transactionId ?? "N/A"}</TableCell>
                    <TableCell>{formatDate(ride.timestamps?.completedAt)}</TableCell>
                    <TableCell>
                      {ride.payment?.invoiceUrl ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="rounded-none" variant="outline">
                              View Invoice
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl rounded-none">
                            <DialogHeader>
                              <DialogTitle>Invoice Preview</DialogTitle>
                            </DialogHeader>
                            <iframe
                              src={ride.payment.invoiceUrl}
                              className="w-full h-[80vh] rounded"
                              title="Invoice PDF"
                            />
                          </DialogContent>
                        </Dialog>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      <Link to={`/single-ride-details/${ride._id}`}>
                        <Button size="sm" className="rounded-none hover:border">
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
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
          <p className="text-center text-muted-foreground py-10">
            No Ride Data Found
          </p>
        )}
      </>
  );
}
