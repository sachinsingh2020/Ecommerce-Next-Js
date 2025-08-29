import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const ButtonLoading = ({
  type,
  text,
  loading,
  onClick,
  className,
  ...props
}) => {
  return (
    <Button
      type={type}
      disabled={loading}
      onClick={onClick}
      variant={"default"}
      className={cn("", className)}
      {...props}>
      {loading ? <Loader2Icon className="animate-spin" /> : text}
    </Button>
  );
};

export default ButtonLoading;
