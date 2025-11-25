
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useGoOfflineMutation } from "@/redux/features/driver/driver.api";
import { useAcceptRideMutation, useRejectRideMutation, useRidesNearMeQuery, useRideAcceptedByMeQuery } from "@/redux/features/rides/rides.api";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router";
import axios from "axios";

export default function RidesNearMe() {
  const navigate = useNavigate();

  const [goOffline, { isLoading }] = useGoOfflineMutation();
  const [acceptRide, { isLoading: isAccepting }] = useAcceptRideMutation();
  const [rejectRide, { isLoading: isRejecting }] = useRejectRideMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const [rides, setRides] = useState<any[]>([]);

  const [pickupAddresses, setPickupAddresses] = useState<Record<string, string>>({});
  const [destinationAddresses, setDestinationAddresses] = useState<Record<string, string>>({});


  const limit = 10;
  const { data, isLoading: isRideLoading, refetch } = useRidesNearMeQuery(undefined, {
    pollingInterval: 5000,
  });

  const { data: acceptedRideData } = useRideAcceptedByMeQuery(undefined);
  const acceptedRide = acceptedRideData?.data;

  const handleGoOffline = async () => {
    try {
      await goOffline("").unwrap();
      toast.success("You are now offline!");
    } catch (err: any) {
      console.error("Failed to go offline:", err);
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!rides || rides.length === 0) return;

      const pickupMap: Record<string, string> = {};
      const destMap: Record<string, string> = {};

      for (const ride of rides) {
        try {
          // pickup
          const pickupRes = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${ride.pickupLocation.coordinates[1]}&lon=${ride.pickupLocation.coordinates[0]}`
          );
          pickupMap[ride._id] = pickupRes.data.display_name;

          // destination
          const destRes = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${ride.destination.coordinates[1]}&lon=${ride.destination.coordinates[0]}`
          );
          destMap[ride._id] = destRes.data.display_name;
        } catch (err) {
          console.error("Error fetching address:", err);
        }
      }

      setPickupAddresses(pickupMap);
      setDestinationAddresses(destMap);
    };

    fetchAddresses();
  }, [rides]);


  const handleAccept = async (rideId: string) => {
    try {
      await acceptRide(rideId).unwrap();
      toast.success(`Ride accepted successfully`);
      refetch();
    } catch (err: any) {
      console.error("Failed to accept ride:", err);
      toast.error(err?.data?.message || "Failed to accept ride");
    }
  };

  const handleReject = async (rideId: string) => {
    try {
      await rejectRide(rideId).unwrap();
      toast.info(`Ride rejected`);
      refetch();
    } catch (err: any) {
      console.error("Failed to reject ride:", err);
      toast.error(err?.data?.message || "Failed to reject ride");
    }
  };

  useEffect(() => {
    if (data?.data) {
      setRides(data.data);
    }
  }, [data]);

  const paginatedRides = rides.slice((currentPage - 1) * limit, currentPage * limit);
  const totalPage = Math.ceil(rides.length / limit);

  const formatCoords = (coordinates: number[]) => {
    return `${coordinates[1].toFixed(5)}, ${coordinates[0].toFixed(5)}`;
  };

  if (isRideLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <BounceLoader color="#f97316" size={80} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-4 text-center gap-6 w-full">
      <h1 className="text-xl md:text-4xl font-bold uppercase">Rides Near Me</h1>

      <Button
        onClick={handleGoOffline}
        disabled={isLoading}
        className="rounded-none px-10 py-4 md:text-lg font-bold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Going Offline..." : "Go Offline"}
      </Button>

      {rides.length === 0 ? (
        <p className="mt-8 text-sm md:text-base mb-10">No rides available near you.</p>
      ) : (
        <>
          <div className="w-full mt-8 border border-muted overflow-x-hidden">
            <div className="w-full overflow-x-auto">
              <Table className="w-full table-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left text-[12px] md:text-xs">Pickup</TableHead>
                    <TableHead className="text-left text-[12px] md:text-xs">Destination</TableHead>
                    <TableHead className="text-left text-[12px] md:text-xs">Fare</TableHead>
                    <TableHead className="text-center text-[12px] md:text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRides.map((ride) => (
                    <TableRow key={ride._id}>
                      <TableCell className="text-left text-[12px] md:text-xs break-words whitespace-normal max-w-full">
                        {pickupAddresses[ride._id]
                          ? pickupAddresses[ride._id].split(" ").slice(0, 6).join(" ")
                          : formatCoords(ride.pickupLocation.coordinates)}
                      </TableCell>
                      <TableCell className="text-left text-[12px] md:text-xs break-words whitespace-normal max-w-full">
                        {destinationAddresses[ride._id]
                          ? destinationAddresses[ride._id].split(" ").slice(0, 6).join(" ")
                          : formatCoords(ride.destination.coordinates)}
                      </TableCell>
                      <TableCell className="text-left text-xs">৳{ride.fare}</TableCell>
                      <TableCell className="flex justify-center gap-2 flex-wrap">
                        <Button
                          size="sm"
                          disabled={isAccepting}
                          className="bg-green-600 rounded-none hover:bg-green-700 text-white text-[12px] md:text-xs"
                          onClick={() => handleAccept(ride._id)}
                        >
                          {"Accept"}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={isRejecting}
                          className="rounded-none text-[12px] md:text-xs"
                          onClick={() => handleReject(ride._id)}
                        >
                          {"Reject"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {totalPage > 1 && (
            <div className="flex justify-end mt-4 w-full">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
                      className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}

      {acceptedRide && (
        <div className="">
          <Button
            className="rounded-none font-semibold text-white"
            onClick={() => navigate(`/my-accepted-ride/${acceptedRide._id}`)}
          >
            Go to My Accepted Ride
          </Button>
        </div>
      )}
    </div>
  );
}
