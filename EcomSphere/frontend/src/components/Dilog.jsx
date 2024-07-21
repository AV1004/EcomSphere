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
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { addProductToCart } from "../https/shop";
import { useNavigate } from "react-router-dom";

export const Dilog = ({ openDilog, setOpenDilog, product }) => {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const handleAddToCart = async (prodId) => {
    const resAddToCartData = await addProductToCart(prodId, authHeader);
    // console.log(resAddToCartData);
    if (resAddToCartData.success === true) {
      handleOpen();
      navigate("/cart");
    }
  };

  const handleOpen = () => setOpenDilog(!openDilog);
  return (
    <>
      <Dialog
        open={openDilog}
        handler={handleOpen}
        className="bg-blue-gray-900 "
      >
        <DialogHeader>
          <Typography variant="h5" color="teal">
            {product.name !== undefined ? product.name : "Product Name"}
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4 ">
          <img
            className="lg:h-56  max-h-72"
            src={
              product.imageUrl !== undefined
                ? product.imageUrl.url
                : "https://docs.material-tailwind.com/img/team-3.jpg"
            }
            alt={product.name}
          />
          <Typography
            color="white"
            variant="h4"
            className="lg:text-2xl text-lg"
          >
            Posted by:
            {product.user !== undefined ? product.user.name : "Someone"}
          </Typography>
          <Typography color="white" variant="h5" className="lg:text-xl text-md">
            Price:${product.price}
          </Typography>
          <Typography color="white" variant="h6">
            {product.category !== undefined
              ? product.category
              : "Prod Category"}
          </Typography>
          <Typography color="teal" className="text-center font-normal">
            {product.description !== undefined
              ? product.description
              : "Prod Description"}
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
          <Button
            color="teal"
            variant="gradient"
            className="flex gap-2"
            onClick={() => {
              handleAddToCart(product._id);
            }}
          >
            Add to Cart <FaCartArrowDown size={15} />
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
