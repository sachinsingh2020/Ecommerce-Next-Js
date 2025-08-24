import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) => {
  return NextResponse.json({
    success,
    statusCode,
    message,
    data,
  });
};

export const catchError = (error, customMessage) => {
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern).join(",");
    error.message = `Duplicate fields: ${keys}. These fields value must be unique`;
  }

  let errorObj = {};

  if (process.env.NODE_ENV === "development") {
    errorObj = {
      message: error.message,
      error,
    };
  } else {
    errorObj = {
      message: customMessage || "Internal Server Error.",
      error,
    };
  }

  return response(false, error.code || 500, ...errorObj);
};
