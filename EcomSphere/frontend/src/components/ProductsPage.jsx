import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { Dilog } from "./Dilog";
import { BiDetail } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { addProductToCart, getAllProducts } from "../https/shop";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const [openDilog, setOpenDilog] = useState(false);
  const [productForDilog, setProductForDilog] = useState({});
  const [whatToSee, setWhatToSee] = useState("All Products");

  const [products, setProducts] = useState([]);

  const authHeader = useAuthHeader();

  const navigate = useNavigate();

  useEffect(() => {
    const getProds = async () => {
      const resAllProdsData = await getAllProducts(authHeader);
      // console.log(resAllProdsData);
      if (resAllProdsData.success === true) {
        setProducts(resAllProdsData.products);
        setProductForDilog(resAllProdsData.products[0]);
      }
    };
    getProds();
  }, []);

  const handleAddToCart = async (prodId) => {
    const resAddToCartData = await addProductToCart(prodId, authHeader);
    // console.log(resAddToCartData);
    if (resAddToCartData.success === true) {
      navigate("/cart");
    }
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none">
        <section className={`flex w-full h-full flex-col pt-20  duration-500`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.3,
            }}
            className="pointer-events-auto lg:ml-36 flex justify-center items-center lg:justify-start lg:items-start"
          >
            <Menu
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              <MenuHandler>
                <Button color="blue-gray">{whatToSee}</Button>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  className={`${
                    whatToSee === "All Products" ? "text-white bg-black" : ""
                  }`}
                  onClick={() => {
                    setWhatToSee("All Products");
                  }}
                >
                  All Products
                </MenuItem>
                <MenuItem
                  className={`${
                    whatToSee === "Clothing" ? "text-white bg-black" : ""
                  }`}
                  onClick={() => {
                    setWhatToSee("Clothing");
                  }}
                >
                  Clothing
                </MenuItem>
                <MenuItem
                  className={`${
                    whatToSee === "Elctronics" ? "text-white bg-black" : ""
                  }`}
                  onClick={() => {
                    setWhatToSee("Elctronics");
                  }}
                >
                  Elctronics
                </MenuItem>
                <MenuItem
                  className={`${
                    whatToSee === "Footwear" ? "text-white bg-black" : ""
                  }`}
                  onClick={() => {
                    setWhatToSee("Footwear");
                  }}
                >
                  Footwear
                </MenuItem>
                <MenuItem
                  className={`${
                    whatToSee === "Furniture" ? "text-white bg-black" : ""
                  }`}
                  onClick={() => {
                    setWhatToSee("Furniture");
                  }}
                >
                  Furniture
                </MenuItem>
                <MenuItem
                  className={`${
                    whatToSee === "Toys" ? "text-white bg-black" : ""
                  }`}
                  onClick={() => {
                    setWhatToSee("Toys");
                  }}
                >
                  Toys
                </MenuItem>
                <MenuItem
                  className={`${
                    whatToSee === "Books" ? "text-white bg-black" : ""
                  }`}
                  onClick={() => {
                    setWhatToSee("Books");
                  }}
                >
                  Books
                </MenuItem>
                <MenuItem
                  className={`${
                    whatToSee === "Sports" ? "text-white bg-black" : ""
                  }`}
                  onClick={() => {
                    setWhatToSee("Sports");
                  }}
                >
                  Sports
                </MenuItem>
                <MenuItem
                  className={`${
                    whatToSee === "Automotive" ? "text-white bg-black" : ""
                  }`}
                  onClick={() => {
                    setWhatToSee("Automotive");
                  }}
                >
                  Automotive
                </MenuItem>
              </MenuList>
            </Menu>
          </motion.div>
          <div className="lg:mt-3 mt-5 flex flex-wrap gap-36  mr-14 items-center w-full justify-center overflow-auto pointer-events-auto scrollbar-thin scrollbar-webkit">
            {whatToSee === "All Products"
              ? products.map((product, index) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 1 + index * 0.2 }}
                    key={index}
                  >
                    <Card className="w-80 lg:w-96 mb-10">
                      <CardHeader floated={false} className="lg:h-80 ">
                        <img
                          className="h-80 w-96"
                          src={product.imageUrl.url}
                          alt={product.name}
                        />
                      </CardHeader>
                      <CardBody className="text-center">
                        <Typography
                          variant="h4"
                          color="blue-gray"
                          className="mb-2"
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          color="blue-gray"
                          className="font-medium"
                          textGradient
                        >
                          {product.user.name}
                        </Typography>
                        <Typography
                          color="blue-gray"
                          className="font-medium"
                          textGradient
                        >
                          {product.category}
                        </Typography>
                        <div className="flex items-center justify-center mt-3">
                          <Typography variant="h3" color="black">
                            ${product.price}
                          </Typography>
                        </div>
                        <div className="flex lg:flex-row flex-col gap-2 justify-center items-center  mt-3">
                          <Button
                            color="teal"
                            onClick={() => {
                              setProductForDilog(product);
                              setOpenDilog(true);
                            }}
                            className="flex gap-2 "
                          >
                            Details
                            <BiDetail size={17} />
                          </Button>
                          <Button
                            color="teal"
                            className="flex gap-2"
                            onClick={() => {
                              handleAddToCart(product._id);
                            }}
                          >
                            Add to Cart <FaCartArrowDown size={17} />
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))
              : products.map((product, index) => {
                  if (product.category === whatToSee) {
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                          duration: 0.5,
                        }}
                        key={index}
                      >
                        <Card className="w-80 lg:w-96 mb-10">
                          <CardHeader floated={false} className="lg:h-80 ">
                            <img
                              className="h-80 w-96"
                              src={product.imageUrl.url}
                              alt={product.name}
                            />
                          </CardHeader>
                          <CardBody className="text-center">
                            <Typography
                              variant="h4"
                              color="blue-gray"
                              className="mb-2"
                            >
                              {product.name}
                            </Typography>
                            <Typography
                              color="blue-gray"
                              className="font-medium"
                              textGradient
                            >
                              {product.user.name}
                            </Typography>
                            <div className="flex items-center justify-center mt-3">
                              <Typography variant="h3" color="black">
                                ${product.price}
                              </Typography>
                            </div>
                            <div className="flex lg:flex-row flex-col gap-2 justify-center items-center  mt-3">
                              <Button
                                color="teal"
                                onClick={() => {
                                  setProductForDilog(product);
                                  setOpenDilog(true);
                                }}
                                className="flex gap-2"
                              >
                                Details
                                <BiDetail size={17} />
                              </Button>
                              <Button
                                color="teal"
                                className="flex gap-2"
                                onClick={() => {
                                  handleAddToCart(product._id);
                                }}
                              >
                                Add to Cart <FaCartArrowDown size={17} />
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    );
                  }
                })}
          </div>
          <Dilog
            openDilog={openDilog}
            setOpenDilog={setOpenDilog}
            product={productForDilog}
          />
        </section>
      </div>
    </>
  );
}
