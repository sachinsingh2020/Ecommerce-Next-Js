"use client";
import ButtonLoading from "@/components/Application/ButtonLoading";
import UserPanelLayout from "@/components/Application/Website/UserPanelLayout";
import WebsiteBreadcrumb from "@/components/Application/Website/WebsiteBreadcrumb";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const breadCrumbData = {
  title: "Profile",
  links: [{ label: "Profile" }],
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const formSchema = zSchema.pick({
    name: true,
    phone: true,
    address: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const updateProfile = (values) => {};
  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumbData} />
      <UserPanelLayout>
        <div className="shadow rounded">
          <div className="p-5 text-xl font-semibold border-b">Profile</div>
          <div className="p-5">
            <Form {...form}>
              <form
                className="grid md:grid-cols-2 grid-cols-1 gap-5"
                onSubmit={form.handleSubmit(updateProfile)}>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="Enter Your Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type={"number"}
                            placeholder="Enter Your Phone Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3 md:col-span-2 col-span-1">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter Your address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-3 md:col-span-2 col-span-1">
                  <ButtonLoading
                    type="submit"
                    text="Save Changes"
                    className={"cursor-pointer"}
                    loading={loading}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </UserPanelLayout>
    </div>
  );
}
