import { Card, Input, Button, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GoHomeFill } from "react-icons/go";

export const SignUp = () => {
  return (
    <div className="h-screen">
      <Link to={"/"}>
        <Button color="white" className="m-5 hover:bg-blue-gray-50 h-10">
          <GoHomeFill size={25} />
          {/* Home */}
        </Button>
      </Link>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          duration: 1.3,
        }}
        className="flex justify-center lg:h-[80%]  items-center"
      >
        <Card color="white" className="p-9 mb-10" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          {/* <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography> */}
          <form className="mt-8 mb-2 w-64 lg:w-96 max-w-screen-lg ">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Input
                size="lg"
                placeholder="John Doe"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="john@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Confirm Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Link to={"/signup/otp"}>
              <Button className="mt-6" fullWidth>
                sign up
              </Button>
            </Link>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to={"/signin"} className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};
