import React from "react";
import {
  Button,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { TfiFaceSad } from "react-icons/tfi";

import { clearCartAndCreateOrder } from "../https/shop";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";

export default function AfterCheckout({ success }) {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (success === true) {
      const resData = await clearCartAndCreateOrder(authHeader);
      // console.log(resData);
      if (resData.success === true) {
        navigate("/orders");
      }
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      <div className="flex h-full w-full justify-center items-center">
        <div className="bg-blue-gray-900 lg:w-[50%] w-80">
          <DialogHeader>
            <Typography variant="h5" color={success === true ? "teal" : "red"}>
              {success === true
                ? "Payment done successfully."
                : "Payment failed!"}
            </Typography>
          </DialogHeader>
          <DialogBody divider className="grid place-items-center gap-4">
            {success === true ? (
              <IoCheckmarkDoneSharp size={200} color="teal" />
            ) : (
              <TfiFaceSad size={200} color="red" />
            )}
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              onClick={submitHandler}
              variant="gradient"
              color={success === true ? "teal" : "red"}
            >
              {success === true ? "Explore Products" : "Go to Cart"}
            </Button>
          </DialogFooter>
        </div>
      </div>
    </>
  );
}
