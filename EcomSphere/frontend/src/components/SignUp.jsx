import { Card, Input, Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GoHomeFill } from "react-icons/go";
import MessageDilog from "./MessageDilog";
import { sendOTP } from "../https/auth";
import { OTP } from "./OTP";

export const SignUp = () => {
  const [dataToSentToOTPSComponent, setDataToSentToOTPSComponent] =
    useState(null);
  const [openDilog, setOpenDilog] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (
      data.name.length === 0 ||
      data.email.length === 0 ||
      data.password.length === 0 ||
      data.confirmPass === 0
    ) {
      setValidationMessage("Please Fill out all fields!");
      setOpenDilog(true);
    } else if (data.name.length < 5) {
      setValidationMessage(
        "Please enter name that is atleast 5 characters long!"
      );
      setOpenDilog(true);
    } else if (data.password.length < 8) {
      setValidationMessage("Please enter password with minimum 8 characters.");
      setOpenDilog(true);
    } else if (data.password !== data.confirmPass) {
      setValidationMessage("Passwords do not match!");
      setOpenDilog(true);
    } else {
      const OTPData = await sendOTP(data.email, false);
      // console.log(OTPData);
      if (OTPData.success === false) {
        setValidationMessage(OTPData.message);
        setOpenDilog(true);
      } else {
        setValidationMessage("Ready for email verification!");
        setDataToSentToOTPSComponent({
          email: data.email,
          name: data.name,
          password: data.password,
          // otp: OTPData.otp,
          isLogin: false,
        });
      }
    }
  };

  return (
    <>
      {validationMessage === "Ready for email verification!" ? (
        <OTP data={dataToSentToOTPSComponent} />
      ) : (
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
              <form
                onSubmit={handleSubmit}
                className="mt-8 mb-2 w-64 lg:w-96 max-w-screen-lg "
              >
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Name
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="John Doe"
                    name="name"
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
                    name="email"
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
                    name="password"
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
                    name="confirmPass"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <Button className="mt-6" type="submit" fullWidth>
                  sign up
                </Button>

                <Typography
                  color="gray"
                  className="mt-4 text-center font-normal"
                >
                  Already have an account?{" "}
                  <Link to={"/signin"} className="font-medium text-gray-900">
                    Sign In
                  </Link>
                </Typography>
              </form>
            </Card>
          </motion.div>
          <MessageDilog
            openDilog={openDilog}
            setOpenDilog={setOpenDilog}
            validationMessage={validationMessage}
          />
        </div>
      )}
    </>
  );
};
