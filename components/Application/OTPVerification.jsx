'use client';

import { zSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import ButtonLoading from './ButtonLoading';
import { showToast } from '@/lib/showToast';
import axios from 'axios';

const OTPVerification = ({ email, onSubmit, loading }) => {

    const [isResendingOtp, setIsResendingOtp] = useState(false);

    const formSchema = zSchema.pick({
        otp: true, email: true
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
            email: email,
        }
    })

    const handleOtpVerification = async (values) => {
        onSubmit(values);
    }

    const resendOTP = async () => {
        try {
            setIsResendingOtp(true);
            const { data: resendOtpResponse } = await axios.post(
                "/api/auth/resend-otp",
                { email }
            );

            if (!resendOtpResponse.success) {
                throw new Error(resendOtpResponse.message || "Something went wrong");
            }
            showToast("success", resendOtpResponse.message);
        } catch (error) {
            showToast("error", error.message);
        } finally {
            setIsResendingOtp(false);
        }
    }


    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOtpVerification)}>
                    <div
                        className='text-center'
                    >
                        <h1
                            className='text-2xl font-bold mb-2'
                        >
                            Please complete verification
                        </h1>
                        <p
                            className='text-md'
                        >We have send an One-time Password (OTP) to your  registered email address</p>
                    </div>
                    <div className="mb-5 mt-5 flex justify-center">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem
                                >
                                    <FormLabel
                                        className={'font-semibold'}
                                    >One-time Password (OTP)</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot className={'text-xl size-10'} index={0} />
                                                <InputOTPSlot className={'text-xl size-10'} index={1} />
                                                <InputOTPSlot className={'text-xl size-10'} index={2} />
                                                <InputOTPSlot className={'text-xl size-10'} index={3} />
                                                <InputOTPSlot className={'text-xl size-10'} index={4} />
                                                <InputOTPSlot className={'text-xl size-10'} index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-3">
                        <ButtonLoading
                            type="submit"
                            text="Verify"
                            className={"w-full cursor-pointer"}
                            loading={loading}
                        />
                        <div
                            className='text-center mt-5'
                        >
                            {
                                !isResendingOtp ?
                                    <button
                                        type='button'
                                        className='text-blue-500 cursor-pointer hover:underline'
                                        onClick={resendOTP}
                                    >
                                        Resend OTP
                                    </button>
                                    :
                                    <span className='text-md'>Resending....</span>
                            }

                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default OTPVerification