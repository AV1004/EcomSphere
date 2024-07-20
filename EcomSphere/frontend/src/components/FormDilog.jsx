import React, { useEffect, useState } from "react";
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
import { MdAddToPhotos, MdSmsFailed } from "react-icons/md";
import {
  addProduct,
  deleteImageFromCloud,
  getDeleteTokenForCloud,
  updatedUserProd,
  uploadImageOnClound,
} from "../https/shop";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export default function FormDilog({
  openDilog,
  setOpenDilog,
  isEdit,
  product,
}) {
  // const [open, setOpen] = useState(openDilog);

  const [validationMsg, setValidationMsg] = useState("");

  const [categoryValue, setCategoryValue] = useState("");

  const [fileInput, setFileInput] = useState(null);

  const [processing, setProcessing] = useState(undefined);

  const [msgAfterSubmission, setMsgAfterSubmission] = useState("");

  const handleOpen = () => setOpenDilog(!openDilog);

  const authHeader = useAuthHeader();

  const destroyImage = async (imgId) => {
    // Getting Delete Token
    const deleteToken = await getDeleteTokenForCloud(imgId, authHeader);

    let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    let resourceType = "image";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`;
    const formData = new FormData();
    formData.append("public_id", imgId);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    formData.append("signature", deleteToken.signature);
    formData.append("timestamp", deleteToken.timestamp);

    const resDataOfDestroyImg = await deleteImageFromCloud(api, formData);

    return resDataOfDestroyImg;
  };

  const uploadImage = async (img) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "ecom_images_preset");

    try {
      let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      let resourceType = "image";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const resDataOfUpload = await uploadImageOnClound(api, data);

      // console.log(resDataOfUpload.secure_url);
      // console.log(resDataOfUpload);
      return [resDataOfUpload.secure_url, resDataOfUpload.public_id];
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (isEdit !== true) {
      if (
        data.prodName.length === 0 ||
        data.price.length === 0 ||
        data.description.length === 0 ||
        categoryValue.length === 0
      ) {
        setValidationMsg("Please fill out all values!");
      } else if (
        data.image.type === "image/png" ||
        data.image.type === "image/jpg" ||
        data.image.type === "image/jpeg"
      ) {
        // console.log("Validation Pass");
        setValidationMsg("");
        setProcessing(true);
        const imageUrl = await uploadImage(data.image);
        const resAddProdData = await addProduct(
          data.prodName,
          data.price,
          data.description,
          categoryValue,
          imageUrl,
          authHeader
        );
        // console.log(resAddProdData);
        if (resAddProdData.success === true) {
          setMsgAfterSubmission(resAddProdData.message);
        } else {
          setMsgAfterSubmission("Can't add product due to technical issue!");
        }
        setProcessing(false);
      } else {
        // console.log("false image");
        setValidationMsg("Please select appropriate file.");
      }
    } else {
      console.log(data);
      console.log(fileInput);
      console.log(categoryValue);
      setProcessing(true);
      if (fileInput === null && categoryValue === "") {
        console.log("Change in name,price or description");
        const resupdateProdData = await updatedUserProd(
          product._id,
          data.prodName,
          data.price,
          data.description,
          product.category, //Difference
          [product.imageUrl.url, product.imageUrl.public_id],
          authHeader
        );
        if (resupdateProdData.success === true) {
          setMsgAfterSubmission(resupdateProdData.message);
        } else {
          setMsgAfterSubmission("Can't edit product due to technical issue!");
        }
        setProcessing(false);
      } else {
        console.log("Change in image or category!");
        if (fileInput !== null && categoryValue !== "") {
          console.log("Change In Both!");
          const deleteImg = await destroyImage(product.imageUrl.public_id);
          if (deleteImg.result === "ok") {
            const imageUrl = await uploadImage(data.image);
            const resupdateProdData = await updatedUserProd(
              product._id,
              data.prodName,
              data.price,
              data.description,
              categoryValue, //Difference
              imageUrl,
              authHeader
            );
            if (resupdateProdData.success === true) {
              setMsgAfterSubmission(resupdateProdData.message);
            } else {
              setMsgAfterSubmission(
                "Can't edit product due to technical issue!"
              );
            }
            setProcessing(false);
          }
        } else if (categoryValue !== "") {
          console.log("change in category Value!");
          const resupdateProdData = await updatedUserProd(
            product._id,
            data.prodName,
            data.price,
            data.description,
            categoryValue, //Difference
            [product.imageUrl.url, product.imageUrl.public_id],
            authHeader
          );
          if (resupdateProdData.success === true) {
            setMsgAfterSubmission(resupdateProdData.message);
          } else {
            setMsgAfterSubmission("Can't edit product due to technical issue!");
          }
          setProcessing(false);
        } else {
          console.log("change in imageUrl");
          const deleteImg = await destroyImage(product.imageUrl.public_id);
          if (deleteImg.result === "ok") {
            const imageUrl = await uploadImage(data.image);
            const resupdateProdData = await updatedUserProd(
              product._id,
              data.prodName,
              data.price,
              data.description,
              product.category,
              imageUrl, //Difference
              authHeader
            );
            if (resupdateProdData.success === true) {
              setMsgAfterSubmission(resupdateProdData.message);
            } else {
              setMsgAfterSubmission(
                "Can't edit product due to technical issue!"
              );
            }
            setProcessing(false);
          }
        }
      }
    }
  };

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
            {validationMsg !== "" ? (
              <Typography className="mt-1" variant="small" color="red">
                {validationMsg}
              </Typography>
            ) : (
              ""
            )}
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 text-cyan-600 cursor-pointer"
            onClick={() => {
              setValidationMsg("");
              setFileInput(null);
              setProcessing(undefined);
              setCategoryValue("");
              handleOpen();
            }}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {processing === false ? (
          <>
            {/* After form Submission */}{" "}
            <DialogBody divider className="grid place-items-center gap-4">
              <MdSmsFailed size={100} color={"white"} />
              <Typography
                color={"white"}
                variant="h4"
                className="lg:text-xl text-sm"
              >
                {msgAfterSubmission}
              </Typography>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button
                variant="text"
                color="white"
                onClick={() => {
                  setValidationMsg("");
                  setFileInput(null);
                  setProcessing(undefined);
                  setCategoryValue("");
                  handleOpen();
                }}
              >
                close
              </Button>
              <Button
                variant="gradient"
                color="white"
                onClick={() => {
                  setValidationMsg("");
                  setFileInput(null);
                  setProcessing(undefined);
                  setCategoryValue("");
                  handleOpen();
                }}
              >
                Ok, Got it
              </Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleFormSubmit}>
            {/* Form */}
            <DialogBody>
              {/* <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Write the message and then click button.
          </Typography> */}
              <div className="grid gap-3">
                <Input
                  label="Name"
                  name="prodName"
                  color="cyan"
                  className="text-white"
                  defaultValue={isEdit === true ? product.name : ""}
                />
                <Input
                  label="Price"
                  color="cyan"
                  name="price"
                  type="number"
                  className="text-white"
                  defaultValue={isEdit === true ? product.price : ""}
                />
                <Textarea
                  label="Description"
                  name="description"
                  color="cyan"
                  className="text-white"
                  defaultValue={isEdit === true ? product.description : ""}
                />
                <Select
                  label="Category"
                  name="category"
                  color="cyan"
                  className="text-white"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  value={isEdit === true ? product.category : ""}
                  onChange={(val) => {
                    setCategoryValue(val);
                  }}
                >
                  <Option value="Clothing">Clothing</Option>
                  <Option value="Elctronics">Elctronics</Option>
                  <Option value="Footwear">Footwear</Option>
                  <Option value="Furniture">Furniture</Option>
                  <Option value="Toys">Toys</Option>
                  <Option value="Books">Books</Option>
                  <Option value="Sports">Sports</Option>
                  <Option value="Automotive">Automotive</Option>
                </Select>

                <label
                  htmlFor="file"
                  className={`flex cursor-pointer ${
                    fileInput !== null
                      ? "lg:text-md text-xs"
                      : "lg:text-lg text-xs"
                  } justify-start gap-2 items-center font-medium text-white`}
                >
                  {fileInput === null
                    ? isEdit === true
                      ? product.imageUrl.url.split("upload/")[1]
                      : "Choose Image"
                    : fileInput.name.toUpperCase() + "(Change Image)"}

                  <FaLink size={20} />
                </label>
                <input
                  onChange={(e) => setFileInput(e.target.files[0])}
                  className="hidden"
                  name="image"
                  id="file"
                  type="file"
                />
              </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button
                variant="text"
                color="white"
                type="button"
                className="flex justify-center items-center gap-1"
                onClick={() => {
                  setValidationMsg("");
                  setCategoryValue("");
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
                type="submit"
                disabled={processing === true ? true : false}
              >
                {processing === true
                  ? "processing"
                  : processing === false
                  ? "Done"
                  : isEdit === true
                  ? "Save"
                  : "Add"}{" "}
                {isEdit === true ? (
                  <IoIosSave size={17} />
                ) : (
                  <MdAddToPhotos size={17} />
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </Dialog>
    </>
  );
}
