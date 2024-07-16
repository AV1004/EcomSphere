import React, { useState } from "react";
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

const products = [
  {
    name: "Men's T-Shirt",
    imageUrl: "https://example.com/mens-tshirt.jpg",
    price: 19.99,
    description: "A comfortable cotton t-shirt.",
    category: "Clothing",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Men's Jeans",
    imageUrl: "https://example.com/mens-jeans.jpg",
    price: 49.99,
    description: "Stylish and durable denim jeans.",
    category: "Elctronics",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Women's Dress",
    imageUrl: "https://example.com/womens-dress.jpg",
    price: 39.99,
    description: "A beautiful summer dress.",
    category: "Footwear",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Women's Top",
    imageUrl: "https://example.com/womens-top.jpg",
    price: 29.99,
    description: "A stylish top for all occasions.",
    category: "Clothing",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Smartphone XYZ",
    imageUrl: "https://example.com/smartphone.jpg",
    price: 599.99,
    description: "A latest model smartphone with high-end features.",
    category: "Footwear",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Smartphone ABC",
    imageUrl: "https://example.com/smartphone2.jpg",
    price: 499.99,
    description: "An affordable smartphone with all the essential features.",
    category: "Furniture",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Laptop Pro",
    imageUrl: "https://example.com/laptop.jpg",
    price: 999.99,
    description: "A powerful laptop for professionals.",
    category: "Footwear",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Laptop Air",
    imageUrl: "https://example.com/laptop2.jpg",
    price: 799.99,
    description: "A lightweight and portable laptop.",
    category: "Furniture",
    postedBy: "Valay Andhariya",
  },
];

export default function ProductsPage() {
  const [openDilog, setOpenDilog] = useState(false);
  const [productForDilog, setProductForDilog] = useState(products[0]);
  const [whatToSee, setWhatToSee] = useState("All Products");

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
                          src="https://docs.material-tailwind.com/img/team-3.jpg"
                          alt="profile-picture"
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
                          {product.postedBy}
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
                          <Button color="teal" className="flex gap-2">
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
                              src="https://docs.material-tailwind.com/img/team-3.jpg"
                              alt="profile-picture"
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
                              {product.postedBy}
                            </Typography>
                            <div className="flex items-center justify-center mt-3">
                              <Typography variant="h3" color="black">
                                ${product.price}
                              </Typography>
                            </div>
                            <div className="flex gap-2 justify-center items-center mt-3">
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
                              <Button color="teal" className="flex gap-2">
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
