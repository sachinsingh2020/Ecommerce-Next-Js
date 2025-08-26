"use client";
import axios from "axios";
import { use, useEffect, useState } from "react";
import verifiedImage from "@/public/assets/images/verified.gif";
import verificationFailedImg from "@/public/assets/images/verification-failed.gif";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";

export default function EmailVerification({ params }) {
  const { token } = use(params);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const { data: verifiactionResponse } = await axios.post(
        "/api/auth/verify-email",
        { token }
      );

      if (verifiactionResponse.success) {
        setIsVerified(true);
      }
    };

    verify();
  }, [token]);
  return (
    <Card className={"w-[400px]"}>
      <CardContent>
        {isVerified ? (
          <div>
            <div className="flex justify-center items-center">
              <Image src={verifiedImage.src} height={verifiedImage.height} width={verifiedImage.width} className="h-[100px] w-auto" alt="verification success" />
            </div>
            <div
              className="text-center"
            >
              <h1
                className="text-2xl font-bold my-5 text-green-500"
              >
                Email Verification Success!
              </h1>
              <Button
                asChild
              >
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center">
              <Image src={verificationFailedImg.src} height={verificationFailedImg.height} width={verificationFailedImg.width} className="h-[100px] w-auto" alt="verification failed" />
            </div>
            <div
              className="text-center"
            >
              <h1
                className="text-2xl font-bold my-5 text-red-500"
              >
                Email Verification Failed!
              </h1>
              <Button
                asChild
              >
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
