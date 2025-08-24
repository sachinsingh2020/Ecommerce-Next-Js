"use client";

import Logo from "@/public/assets/images/logo-black.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { zSchema } from "@/lib/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema
    .pick({
      email: true,
      password: true,
      name: true,
    })
    .extend({
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password and confirm password must be same. ",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: registerResponse } = await axios.post(
        "/api/auth/register",
        values
      );
      if (!registerResponse.success) {
        throw new Error(registerResponse.message || "Something went wrong");
      }
      form.reset();

      alert(registerResponse.message || "Registered successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={"w-[400px]"}>
      <CardContent>
        <div className="flex justify-center">
          <Image
            src={Logo.src}
            width={Logo.width}
            height={Logo.height}
            alt="Logo"
            className="max-w-[150px]"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p>Create new account by filling out the form below.</p>
        </div>
        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type={"text"}
                          placeholder="Sachin Singh"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type={"email"}
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className={"relative"}>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={"password"}
                          placeholder="***********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className={"relative"}>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type={isTypePassword ? "password" : "text"}
                          placeholder="***********"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-2 top-1/2  cursor-pointer"
                        onClick={() => setIsTypePassword(!isTypePassword)}>
                        {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <ButtonLoading
                  type="submit"
                  text="Create Account"
                  className={"w-full cursor-pointer"}
                  loading={loading}
                />
              </div>
              <div className="text-center">
                <div className="flex justify-center items-center gap-1">
                  <p> Already have an account ?</p>
                  <Link href={WEBSITE_LOGIN} className="text-primary underline">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
