import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const SignIn = () => {
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
      <Card color="teal" className="p-9" shadow={false}>
        <Typography variant="h4" color="white">
          Login
        </Typography>
        {/* <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography> */}
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="white" className="-mb-3">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="john@mail.com"
              color="white"
              className=" !border-t-blue-gray-200 focus:!border-t-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="white" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              color="white"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button className="mt-6" color="white" fullWidth>
            Login
          </Button>
          <Typography
            color="blue-gray"
            className="mt-4 text-center font-normal"
          >
            Don't have an account?{" "}
            <Link to={"/signup"} className="font-medium text-white">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </motion.div>
  );
};
