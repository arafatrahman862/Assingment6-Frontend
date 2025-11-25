/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SingleImageUploader from "@/components/SingleImageUploader";
import { useState } from "react";
import { toast } from "sonner";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useUserUpdateMutation } from "@/redux/features/user/user.api";
import { BounceLoader } from "react-spinners";

const updateSchema = z.object({
  name: z.string().min(3, { message: "Name is too short" }).max(50),
  phone: z.string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Invalid Bangladeshi phone number" }),
});

export function UserUpdateForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {

  const { data, isLoading: isFetching, refetch } = useUserInfoQuery(undefined);
  const user = data?.data;

  const [updateUser, { isLoading: isUpdating }] = useUserUpdateMutation();

  const [image, setImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateSchema>) => {
    if (!user) return;

    const updatedFields: any = {};
    if (data.name !== user.name) updatedFields.name = data.name;
    if (data.phone !== user.phone) updatedFields.phone = data.phone;
    if (image) updatedFields.picture = image;

    if (Object.keys(updatedFields).length === 0) return toast("No changes detected");

    const formData = new FormData();
    formData.append("data", JSON.stringify(updatedFields));
    if (image) formData.append("file", image);
    formData.append("id", user._id);

    try {
      await updateUser({ id: user._id, userData: formData }).unwrap();
      await refetch(); 
      toast.success("Profile updated successfully");
    } catch (err: any) {
      console.error(err);
      toast.error(err.data?.message || "Failed to update profile");
    }
  };

  if (isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BounceLoader color="#fff" />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold">Update Your Profile</h1>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} className="rounded-none text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+8801XXXXXXXXX" {...field} className="rounded-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem className="mt-4 space-y-4">
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <SingleImageUploader onChange={setImage} existingImage={user.picture || ""} />
              </FormControl>
            </FormItem>

            <Button type="submit" disabled={isUpdating} className="w-full rounded-none">
              {isUpdating ? "Updating..." : "Update User Profile"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
