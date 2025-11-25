/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserInfoQuery, useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { BounceLoader } from "react-spinners";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserUpdateForm } from "@/components/modules/User/UserUpdateForm";
import { useGetDriverProfileQuery } from "@/redux/features/driver/driver.api";
import DriverUpdateForm from "@/components/modules/Driver/DriverUpdateForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import featureImg from "@/assets/images/features.jpg";
import DashBoardBreadcrumb from "@/components/layouts/layout-items/DashBoardBreadCrumb";


export default function UpdateProfile() {
  const { data, isLoading, isError } = useUserInfoQuery(undefined);
  const user = data?.data;

  const { data: driverInfo, isLoading: isDriverLoading } = useGetDriverProfileQuery(
    undefined,
    { skip: user?.role !== "DRIVER" }
  );
  const driver = driverInfo?.data;

  const [address, setAddress] = useState<string>("");
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [changePassword, { isLoading: isChanging }] = useChangePasswordMutation();

  useEffect(() => {
    const fetchAddress = async () => {
      if (user?.location?.coordinates?.length) {
        try {
          const [lng, lat] = user.location.coordinates;
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          setAddress(res.data.display_name);
        } catch (err) {
          console.error("Error fetching address:", err);
          setAddress("No Address Found!");
        }
      } else {
        setAddress("No Address Found!");
      }
    };
    fetchAddress();
  }, [user]);

  if (isLoading || isDriverLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BounceLoader color="#fff" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Failed to load user data.
      </div>
    );
  }

  const canChangePassword = user?.auths?.some((auth: any) => auth.provider === "credentials");

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) return toast.error("Please fill both fields");

    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      toast.success("Password changed successfully!");
      setPasswordModalOpen(false);
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      console.error(err);
      toast.error(err.data?.message || "Failed to change password");
    }
  };

  return (
    <>
      <section className="min-h-screen flex flex-col">
        <DashBoardBreadcrumb
          title="Manage Profile"
          description="Update your personal information, vehicle details, and account settings."
          backgroundImage={featureImg}
        />

        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="flex-1 p-6 shadow-lg backdrop-blur-3xl border text-white flex flex-col items-center gap-3">
            <img
              src={user.picture}
              alt={user.name}
              loading="lazy"
              className="w-28 h-28 rounded-full border border-white/30 object-cover"
            />
            <h2 className="text-sm md:text-xl font-bold text-center uppercase">
              <span className="font-bold text-primary">Name: </span>{user.name}
            </h2>
            <p className="text-xs md:text-sm text-center">
              <span className="font-bold text-primary uppercase">Email: </span>{user.email}
            </p>
            <p className="text-xs md:text-sm text-center">
              <span className="font-bold text-primary uppercase">Phone: </span>{user.phone || "N/A"}
            </p>
            <p className="text-xs md:text-sm text-center lowercase">
              <span className="font-bold text-primary uppercase">Role: </span>{user.role}
            </p>
            <div className="mt-4 w-full p-2 text-xs md:text-sm text-center">
              <span className="font-bold text-primary uppercase">Location:</span>
              <br />{address || "No Location Found! Please Update"}
            </div>

            {canChangePassword && (
              <div className="w-full text-center mt-4">
                <p className="text-primary mb-2 text-sm">Do you want to change your password?</p>

                <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="rounded-none" variant="outline">
                      Change Password
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[400px] rounded-none">
                    <DialogTitle>
                    </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>

                    <div className="flex flex-col gap-3 mt-2 p-2">
                      <Input
                        type="password"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="rounded-none"
                      />
                      <Input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="rounded-none"
                      />
                      <Button
                        onClick={handlePasswordChange}
                        className="w-full rounded-none mt-2"
                        disabled={isChanging}
                      >
                        {isChanging ? "Changing..." : "Change Password"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>

          <div className="flex-1 p-6 shadow-lg backdrop-blur-3xl border">
            <UserUpdateForm />
          </div>
        </div>
        {user.role === "DRIVER" && driver && (
          <div className="w-full flex flex-col lg:flex-row gap-6">
            <div className="flex-1 p-6 shadow-lg backdrop-blur-3xl border text-white flex flex-col items-center gap-3">
              <img
                src={driver.drivingLicense}
                loading="lazy"
                alt="Driving License"
                className="w-full h-70 rounded border border-white/30 object-cover"
              />
              <p className="text-xs md:text-sm text-center">
                <span className="font-bold text-primary uppercase">Vehicle Type: </span>{driver.vehicle.vehicleType}
              </p>
              <p className="text-xs md:text-sm text-center">
                <span className="font-bold text-primary uppercase">Vehicle No: </span>{driver.vehicle.vehicleNumber}
              </p>
              <p className="text-xs md:text-sm text-center">
                <span className="font-bold text-primary uppercase">Driver Status: </span>{driver.driverStatus}
              </p>
            </div>

            <div className="flex-1 p-6 shadow-lg backdrop-blur-3xl border">
              <DriverUpdateForm />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
