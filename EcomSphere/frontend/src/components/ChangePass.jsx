import React, { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { GoHomeFill } from "react-icons/go";
import MessageDilog from "./MessageDilog";
import { changePassword } from "../https/auth";

export default function ChangePass() {
  const [openDilog, setOpenDilog] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const { token, userId } = useParams();

  const navigate = useNavigate();

  const [isPassChanged, setIsPassChanged] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (data.newPassword.length === 0 || data.confirmPass === 0) {
      setValidationMessage("Please Fill out all fields!");
      setOpenDilog(true);
    } else if (data.newPassword.length < 8) {
      setValidationMessage("Please enter password with minimum 8 characters.");
      setOpenDilog(true);
    } else if (data.newPassword !== data.confirmPass) {
      setValidationMessage("Passwords does not match!");
      setOpenDilog(true);
    } else {
      // console.log(data, token, userId);
      const resOfChangePasswordData = await changePassword(
        userId,
        data.newPassword,
        token
      );
      if (resOfChangePasswordData.success === true) {
        setValidationMessage(resOfChangePasswordData.message);
        setOpenDilog(true);
        setIsPassChanged(true);
      } else {
        setValidationMessage(resOfChangePasswordData.message);
        setOpenDilog(true);
        setIsPassChanged(false);
      }
    }
  };

  useEffect(() => {
    if (isPassChanged === true && openDilog === false) {
      navigate("/signin");
    }
  }, [isPassChanged, openDilog]);

  return (
    <div className="h-screen">
      <Link to={"/"}>
        <Button color="teal" className="m-5 hover:bg-teal-200 h-10">
          <GoHomeFill size={25} />
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
            Reset Password
          </Typography>

          <form
            onSubmit={submitHandler}
            className="mt-8 mb-2 w-64 lg:w-96 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="white" className="-mb-3">
                New Pasword
              </Typography>
              <Input
                size="lg"
                type="password"
                name="newPassword"
                placeholder="********"
                color="white"
                className=" !border-t-blue-gray-200 focus:!border-t-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="white" className="-mb-3">
                Confirm Password
              </Typography>
              <Input
                type="password"
                name="confirmPass"
                size="lg"
                color="white"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button className="mt-6" type="submit" color="white" fullWidth>
              Reset Password
            </Button>
            {/* </Link> */}
          </form>
        </Card>
      </motion.div>
      <MessageDilog
        openDilog={openDilog}
        setOpenDilog={setOpenDilog}
        validationMessage={validationMessage}
      />
    </div>
  );
}
