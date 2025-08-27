"use client";
// sachin singh
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
import { WEBSITE_REGISTER } from "@/routes/WebsiteRoute";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { Card, CardContent } from "@/components/ui/card";
import { showToast } from "@/lib/showToast";
import axios from "axios";
import OTPVerification from "@/components/Application/OTPVerification";
import { useDispatch } from "react-redux";
import { login } from "@/store/reducer/authReducer";

export default function LoginPage() {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [otpEmail, setOtpEmail] = useState();

  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min("3", "Password field is required."),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: loginResponse } = await axios.post(
        "/api/auth/login",
        values
      );

      if (!loginResponse.success) {
        throw new Error(loginResponse.message || "Something went wrong");
      }

      setOtpEmail(values.email);
      form.reset();
      showToast("success", loginResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (values) => {
    try {
      setOtpVerificationLoading(true);
      const { data: otpResponse } = await axios.post(
        "/api/auth/verify-otp",
        values
      );

      if (!otpResponse.success) {
        throw new Error(otpResponse.message || "Something went wrong");
      }

      setOtpEmail("");
      showToast("success", otpResponse.message);

      dispatch(login(otpResponse.data));
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setOtpVerificationLoading(false);
    }
  }


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
        {
          !otpEmail ?
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold">Login Into Account</h1>
                <p>Login into your account by filling out the form below.</p>
              </div>
              <div className="mt-5">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
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
                                type={isTypePassword ? "password" : "text"}
                                placeholder="***********"
                                {...field}
                              />
                            </FormControl>
                            <button
                              type="button"
                              className="absolute right-2 top-1/2 cursor-pointer"
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
                        text="Login"
                        className={"w-full cursor-pointer"}
                        loading={loading}
                      />
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center items-center gap-1">
                        <p>Don't have an account? </p>
                        <Link
                          href={WEBSITE_REGISTER}
                          className="text-primary underline">
                          Create an Account!
                        </Link>
                      </div>
                      <div className="mt-3">
                        <Link
                          href={"/auth/forgot-password"}
                          className="text-primary underline">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </div></>
            :
            <OTPVerification email={otpEmail} loading={otpVerificationLoading} onSubmit={handleOtpVerification} />
        }

      </CardContent>
    </Card>
  );
}
