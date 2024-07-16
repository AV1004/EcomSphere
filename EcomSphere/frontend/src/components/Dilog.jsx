import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { FaCartArrowDown } from "react-icons/fa";
import { MdCloseFullscreen } from "react-icons/md";

export const Dilog = ({ openDilog, setOpenDilog, product }) => {
  const handleOpen = () => setOpenDilog(!openDilog);
  return (
    <>
      <Dialog
        open={openDilog}
        handler={handleOpen}
        className="bg-blue-gray-900"
      >
        <DialogHeader>
          <Typography variant="h5" color="teal">
            {product.name}
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4 ">
          <img
            className="lg:h-56"
            src="https://docs.material-tailwind.com/img/team-3.jpg"
            alt="profile-picture"
          />
          <Typography color="white" variant="h4">
            Posted by:{product.postedBy}
          </Typography>
          <Typography color="white" variant="h5">
            Price:${product.price}
          </Typography>
          <Typography color="white" variant="h6">
            {product.category}
          </Typography>
          <Typography color="teal" className="text-center font-normal">
            {product.description}
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="white"
            className="flex gap-2"
            onClick={handleOpen}
          >
            close <MdCloseFullscreen size={16} />
          </Button>
          <Button color="teal" variant="gradient" className="flex gap-2">
            Add to Cart <FaCartArrowDown size={15} />
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
