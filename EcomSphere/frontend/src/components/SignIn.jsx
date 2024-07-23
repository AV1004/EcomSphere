import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GoHomeFill } from "react-icons/go";
import MessageDilog from "./MessageDilog";
import { resetPassword, sendOTP } from "../https/auth";
import { OTP } from "./OTP";

export const SignIn = () => {
  const [dataToSentToOTPSComponent, setDataToSentToOTPSComponent] =
    useState(null);
  const [openDilog, setOpenDilog] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [email, setEmail] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    // console.log(data);
    if (data.email.length === 0 || data.password.length === 0) {
      setValidationMessage("Please Fill out all fields!");
      setOpenDilog(true);
    } else {
      const OTPData = await sendOTP(data.email, true, data.password);
      console.log(OTPData);
      if (OTPData.success === false) {
        setValidationMessage(OTPData.message);
        setOpenDilog(true);
      } else {
        setValidationMessage("Ready for email verification!");
        setDataToSentToOTPSComponent({
          email: data.email,
          password: data.password,
          // otp: OTPData.otp,
          isLogin: true,
        });
      }
    }
  };

  const forgetPassHandler = async () => {
    if (email.length === 0) {
      setValidationMessage("Please enter your mail address!");
      setOpenDilog(true);
    } else {
      // console.log(email);
      const forgetPassResData = await resetPassword(email);
      if (forgetPassResData.success === true) {
        setValidationMessage(forgetPassResData.message);
        setOpenDilog(true);
      } else {
        setValidationMessage(forgetPassResData.message);
        setOpenDilog(true);
      }
    }
  };

  return (
    <>
      {validationMessage === "Ready for email verification!" ? (
        <OTP
          data={dataToSentToOTPSComponent}
          type={"signin"}
          // setIsAuthenticated={setIsAuthenticated}
        />
      ) : (
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
              <form
                onSubmit={submitHandler}
                className="mt-8 mb-2 w-64 lg:w-96 max-w-screen-lg sm:w-96"
              >
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="white" className="-mb-3">
                    Email
                  </Typography>
                  <Input
                    size="lg"
                    name="email"
                    placeholder="john@mail.com"
                    color="white"
                    className=" !border-t-blue-gray-200 focus:!border-t-white"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="white" className="-mb-3">
                    Password
                  </Typography>
                  <Input
                    type="password"
                    name="password"
                    size="lg"
                    color="white"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <button className="mt-2" onClick={forgetPassHandler}>
                  Forget Password?
                </button>

                {/* <Link to={"/signin/otp"}> */}
                <Button className="mt-6" type="submit" color="white" fullWidth>
                  Login
                </Button>
                {/* </Link> */}
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
