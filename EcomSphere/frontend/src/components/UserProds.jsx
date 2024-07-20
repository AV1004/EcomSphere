import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import FormDilog from "./FormDilog";
import { motion } from "framer-motion";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getuserProducts } from "../https/shop";

// const products = [
//   {
//     name: "Men's T-Shirt",
//     imageUrl: "https://example.com/mens-tshirt.jpg",
//     price: 19.99,
//     description: "A comfortable cotton t-shirt.",
//     category: "Clothing",
//     postedBy: "Valay Andhariya",
//   },
//   {
//     name: "Men's Jeans",
//     imageUrl: "https://example.com/mens-jeans.jpg",
//     price: 49.99,
//     description: "Stylish and durable denim jeans.",
//     category: "Elctronics",
//     postedBy: "Valay Andhariya",
//   },
//   {
//     name: "Women's Dress",
//     imageUrl: "https://example.com/womens-dress.jpg",
//     price: 39.99,
//     description: "A beautiful summer dress.",
//     category: "Footwear",
//     postedBy: "Valay Andhariya",
//   },
//   {
//     name: "Women's Top",
//     imageUrl: "https://example.com/womens-top.jpg",
//     price: 29.99,
//     description: "A stylish top for all occasions.",
//     category: "Clothing",
//     postedBy: "Valay Andhariya",
//   },
//   {
//     name: "Smartphone XYZ",
//     imageUrl: "https://example.com/smartphone.jpg",
//     price: 599.99,
//     description: "A latest model smartphone with high-end features.",
//     category: "Footwear",
//     postedBy: "Valay Andhariya",
//   },
//   {
//     name: "Smartphone ABC",
//     imageUrl: "https://example.com/smartphone2.jpg",
//     price: 499.99,
//     description: "An affordable smartphone with all the essential features.",
//     category: "Furniture",
//     postedBy: "Valay Andhariya",
//   },
//   {
//     name: "Laptop Pro",
//     imageUrl: "https://example.com/laptop.jpg",
//     price: 999.99,
//     description: "A powerful laptop for professionals.",
//     category: "Footwear",
//     postedBy: "Valay Andhariya",
//   },
//   {
//     name: "Laptop Air",
//     imageUrl: "https://example.com/laptop2.jpg",
//     price: 799.99,
//     description: "A lightweight and portable laptop.",
//     category: "Furniture",
//     postedBy: "Valay Andhariya",
//   },
// ];

export default function UserProds() {
  const [products, setProducts] = useState([]);
  const [openDilog, setOpenDilog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [productForDilog, setProductForDilog] = useState(products[0]);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const giveUserProds = async () => {
      const userProdData = await getuserProducts(authHeader);
      setProducts(userProdData.products);
    };
    giveUserProds();
  }, [openDilog]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none">
        <section
          className={`flex w-full h-full flex-col lg:pt-28 pt-14 duration-500`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
          >
            <Typography
              className="flex w-full lg:text-3xl text-2xl lg:mb-0 mb-5 lg:justify-start lg:ml-10 justify-center"
              variant="h4"
              color="white"
              transition={{ duration: 0.5 }}
            >
              User Products
            </Typography>
            <div className="pointer-events-auto lg:mr-36 flex justify-center items-center lg:justify-end lg:items-end">
              <Button
                color="blue-gray"
                onClick={() => {
                  setIsEdit(false);
                  setOpenDilog(true);
                }}
              >
                Add New Product
              </Button>
            </div>
          </motion.div>
          <div className="mt-4 flex flex-wrap gap-36  mr-14 items-center w-full justify-center overflow-auto pointer-events-auto scrollbar-thin scrollbar-webkit">
            {products.map((product, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 1 + index * 0.2 }}
                  key={index}
                >
                  <Card className="w-64 lg:w-64 h-[91%] mb-10">
                    <CardHeader floated={false} className="">
                      <img
                        className="w-96 h-64"
                        src={product.imageUrl}
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
                        {product.category}
                      </Typography>
                      <div className="flex items-center justify-center mt-3">
                        <Typography variant="h3" color="black">
                          ${product.price}
                        </Typography>
                      </div>
                      <div className="flex gap-2 justify-center items-center mt-3">
                        <Button color="teal" size="sm" className="flex gap-2">
                          Delete
                          <MdDelete size={17} />
                        </Button>
                        <Button
                          color="teal"
                          className="flex gap-2"
                          size="sm"
                          onClick={() => {
                            setIsEdit(true);
                            setProductForDilog(product);
                            setOpenDilog(true);
                          }}
                        >
                          Edit
                          <FaRegEdit size={17} />
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
      <FormDilog
        openDilog={openDilog}
        setOpenDilog={setOpenDilog}
        isEdit={isEdit}
        product={productForDilog}
      />
    </>
  );
}
