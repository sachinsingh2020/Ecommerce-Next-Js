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
import useFetch from "@/hooks/useFetch";
import { zSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/public/assets/images/user.png";
import { FaCamera } from "react-icons/fa";
import { showToast } from "@/lib/showToast";
import { useDispatch } from "react-redux";
import { login } from "@/store/reducer/authReducer";
import axios from "axios";

const breadCrumbData = {
  title: "Profile",
  links: [{ label: "Profile" }],
};

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { data: user } = useFetch("/api/profile/get");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [file, setFile] = useState();

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

  useEffect(() => {
    if (user && user.success) {
      const userData = user.data;
      form.reset({
        name: userData?.name,
        phone: userData?.phone,
        address: userData?.address,
      });

      setPreview(userData?.avatar?.url);
    }
  }, [user]);

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setPreview(preview);
    setFile(file);
  };

  const updateProfile = async (values) => {
    setLoading(true);
    try {
      let formData = new FormData();
      if (file) {
        formData.set("file", file);
      }

      formData.set("name", values.name);
      formData.set("phone", values.phone);
      formData.set("address", values.address);

      const { data: response } = await axios.put(
        "/api/profile/update",
        formData
      );
      if (!response.success) {
        throw new Error(response.message);
      }

      showToast("success", response.message);
      dispatch(login(response.data));
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

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
                <div className="md:col-span-2 col-span-1 flex justify-center items-center">
                  <Dropzone
                    onDrop={(acceptedFiles) =>
                      handleFileSelection(acceptedFiles)
                    }>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Avatar
                          className={
                            "w-28 h-28 relative group border border-gray-100"
                          }>
                          <AvatarImage src={preview ? preview : userIcon.src} />
                          <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer bg-black/20">
                            <FaCamera color="#7c3aed" />
                          </div>
                        </Avatar>
                      </div>
                    )}
                  </Dropzone>
                </div>
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
