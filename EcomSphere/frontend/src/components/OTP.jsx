import React, { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login, register, sendOTP } from "../https/auth";
import MessageDilog from "./MessageDilog";
import Timer from "./Timer";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export const OTP = ({ type, setIsAuthenticated, data }) => {
  const [isVerify, setIsVerify] = useState(false);
  const [openDilog, setOpenDilog] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [duration, setDuration] = useState(1 * 60 * 1000);

  const [resendEnable, setResendEnable] = useState(false);

  const signIn = useSignIn();

  const navigate = useNavigate();

  const handleOTPSubmit = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    if (data.isLogin === false) {
      const registerResData = await register(
        data.email,
        data.name,
        data.password,
        formData.otp
      );
      // console.log(registerResData);
      if (registerResData.success === true) {
        setValidationMessage(registerResData.message);
        setIsVerify(true);
        setOpenDilog(true);
      } else {
        setValidationMessage(registerResData.message);
        setOpenDilog(true);
      }
    } else {
      const loginResData = await login(data.email, data.password, formData.otp);

      // console.log(loginResData);
      if (loginResData.success === true) {
        // Setting up authentication using react auth kit
        signIn({
          auth: {
            token: loginResData.token,
            type: "Bearer",
          },

          userState: {
            userId: loginResData.userId,
          },
        });

        setValidationMessage("Logged in successfully!");
        setIsVerify(true);
        setOpenDilog(true);
      } else {
        // console.log("Wrong OTP");
        setValidationMessage(loginResData.message);
        setOpenDilog(true);
      }
    }
  };
  useEffect(() => {
    if (isVerify === true && openDilog === false && data.isLogin === false) {
      navigate("/signin");
    } else if (
      isVerify === true &&
      openDilog === false &&
      data.isLogin === true
    ) {
      navigate("/");
    }
  }, [isVerify, openDilog]);

  const resendOTPHandler = () => {
    // console.log("working");
    setDuration(1 * 60 * 1000);
    setResendEnable(false);
    if (data.isLogin === false) {
      sendOTP(data.email, data.isLogin);
    } else {
      sendOTP(data.email, data.isLogin, data.password);
    }
  };

  return (
    <>
      <MessageDilog
        openDilog={openDilog}
        setOpenDilog={setOpenDilog}
        validationMessage={validationMessage}
        color={isVerify === true ? "black" : ""}
      />
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
          <form
            onSubmit={handleOTPSubmit}
            className="mt-8 mb-2 w-64 lg:w-96 max-w-screen-lg sm:w-96"
          >
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
                name="otp"
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
              type="submit"
            >
              DONE!
            </Button>

            <Typography
              // color="blue-gray"

              className={`mt-4 text-center w-full flex gap-1 justify-center ${
                type === "signin" ? "text-white" : "text-blue-gray-600"
              } `}
            >
              <button
                className={
                  resendEnable === true ? "cursor-pointer" : "cursor-auto"
                }
                disabled={resendEnable === false ? true : false}
                type="button"
                onClick={resendOTPHandler}
              >
                Resend OTP
              </button>
              {resendEnable === false ? (
                <div className="flex gap-1">
                  in
                  <Timer
                    duration={duration}
                    setResendEnable={setResendEnable}
                  />
                </div>
              ) : (
                ""
              )}
            </Typography>
          </form>
        </Card>
      </motion.div>
    </>
  );
};
