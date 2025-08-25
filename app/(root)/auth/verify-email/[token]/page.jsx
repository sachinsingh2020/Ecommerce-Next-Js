"use client";
import axios from "axios";
import { use, useEffect, useState } from "react";
import verifiedImage from "@/public/assets/images/verified.gif";
import verificationFailedImg from "@/public/assets/images/verification-failed.gif";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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
              <Image src={verifiedImage.src} height={100} />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </CardContent>
    </Card>
  );
}
