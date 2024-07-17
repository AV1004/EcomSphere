import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GoHomeFill } from "react-icons/go";

export const SignIn = () => {
  return (
    <div className="h-screen">
      <Link to={"/"}>
        <Button color="teal" className="m-5 hover:bg-teal-200 h-10">
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
        className="flex justify-center  h-[80%] items-center"
      >
        <Card color="teal" className="p-9 " shadow={false}>
          <Typography variant="h4" color="white">
            Login
          </Typography>

          {/* <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography> */}
          <form className="mt-8 mb-2 w-64 lg:w-96 max-w-screen-lg sm:w-96">
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

            <Link to={"/signin/otp"}>
              <Button className="mt-6" color="white" fullWidth>
                Login
              </Button>
            </Link>
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
    </div>
  );
};
