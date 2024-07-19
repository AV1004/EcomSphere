import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { MdSmsFailed } from "react-icons/md";

export default function MessageDilog({
  openDilog,
  setOpenDilog,
  validationMessage,
  color,
}) {
  const handleOpen = () => setOpenDilog(!openDilog);

  return (
    <>
      <Dialog open={openDilog} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Oops!
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <MdSmsFailed size={100} color={color === "black" ? "black" : "red"} />
          <Typography
            color={color === "black" ? "black" : "red"}
            variant="h4"
            className="lg:text-xl text-sm"
          >
            {validationMessage}
          </Typography>
          {/* <Typography className="text-center font-normal">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia.
          </Typography> */}
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" onClick={handleOpen}>
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
