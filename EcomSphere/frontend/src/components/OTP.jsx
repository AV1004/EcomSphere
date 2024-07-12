import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const OTP = ({ type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 1.3,
      }}
      className="flex justify-center h-screen items-center"
    >
      <Card
        color={type === "signin" ? "teal" : "white"}
        className="p-9"
        shadow={false}
      >
        <Typography
          variant="h4"
          color={type === "signin" ? "white" : "blue-gray"}
        >
          Enter OTP
        </Typography>
        <Typography
          color={type === "signin" ? "white" : "blue-gray"}
          className="mt-1 font-normal"
        >
          {type === "signin"
            ? "Just a few seconds!"
            : "Verify Your Email address."}
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            {/* <Typography variant="h6" color="white" className="-mb-3">
              Enter OTP
            </Typography> */}
            <Input
              type="password"
              size="lg"
              color={type === "signin" ? "white" : "blue-gray"}
              placeholder="********"
              maxLength={6}
              className={` !border-t-blue-gray-200 ${
                type === "signin"
                  ? "focus:!border-t-white"
                  : "focus:!border-t-gray-900"
              }`}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button
            className="mt-6"
            color={type === "signin" ? "white" : "black"}
            fullWidth
          >
            DONE!
          </Button>
          <Typography
            color="blue-gray"
            className="mt-4 text-center font-normal"
          >
            <Link
              className={`font-medium ${
                type === "signin" ? "text-white" : "text-blue-gray-600"
              } `}
            >
              <button>Resend OTP in 1:30</button>
            </Link>
          </Typography>
        </form>
      </Card>
    </motion.div>
  );
};
