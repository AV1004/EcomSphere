import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { FaLink } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { IoIosSave } from "react-icons/io";

export default function FormDilog({
  openDilog,
  setOpenDilog,
  isEdit,
  product,
}) {
  // const [open, setOpen] = useState(openDilog);

  const [fileInput, setFileInput] = useState(null);

  const handleOpen = () => setOpenDilog(!openDilog);

  const [whatToSee, setWhatToSee] = useState("All Products");

  return (
    <>
      {/* <Button onClick={handleOpen}>Message Dialog</Button> */}
      <Dialog
        open={openDilog}
        size="xs"
        handler={() => {
          setFileInput(null);
          handleOpen();
        }}
        className="bg-blue-gray-900"
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4" color="cyan">
              {isEdit === true ? "Edit Product" : "Add Product"}
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 text-cyan-600 cursor-pointer"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          {/* <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Write the message and then click button.
          </Typography> */}
          <div className="grid gap-3">
            <Input
              label="Name"
              color="cyan"
              className="text-white"
              defaultValue={isEdit === true ? product.name : ""}
            />
            <Input
              label="Price"
              color="cyan"
              type="number"
              className="text-white"
              defaultValue={isEdit === true ? product.price : ""}
            />
            <Textarea
              label="Description"
              color="cyan"
              className="text-white"
              defaultValue={isEdit === true ? product.description : ""}
            />
            <Select
              label="Category"
              color="cyan"
              className="text-white"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              defaultValue={isEdit === true ? product.category : ""}
            >
              <Option>Clothing</Option>
              <Option>Elctronics</Option>
              <Option>Footwear</Option>
              <Option>Furniture</Option>
            </Select>

            <label
              htmlFor="file"
              className={`flex cursor-pointer ${
                fileInput !== null ? "lg:text-md text-sm" : "lg:text-lg text-sm"
              } justify-start gap-2 items-center font-medium text-white`}
            >
              {fileInput === null
                ? isEdit === true
                  ? product.imageUrl
                  : "Choose Image"
                : fileInput.name.toUpperCase() + "(Change Image)"}

              <FaLink size={20} />
            </label>
            <input
              onChange={(e) => setFileInput(e.target.files[0])}
              className="hidden"
              id="file"
              type="file"
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="white"
            className="flex justify-center items-center gap-1"
            onClick={() => {
              setFileInput(null);
              handleOpen();
            }}
          >
            Cancel <TiCancel size={17} />
          </Button>
          <Button
            variant="gradient"
            className="flex justify-center items-center gap-1"
            color="cyan"
            onClick={handleOpen}
          >
            Save <IoIosSave size={17} />
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
