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
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import FormDilog from "./FormDilog";

const products = [
  {
    name: "Men's T-Shirt",
    imageUrl: "https://example.com/mens-tshirt.jpg",
    price: 19.99,
    description: "A comfortable cotton t-shirt.",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Men's Jeans",
    imageUrl: "https://example.com/mens-jeans.jpg",
    price: 49.99,
    description: "Stylish and durable denim jeans.",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Women's Dress",
    imageUrl: "https://example.com/womens-dress.jpg",
    price: 39.99,
    description: "A beautiful summer dress.",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Women's Top",
    imageUrl: "https://example.com/womens-top.jpg",
    price: 29.99,
    description: "A stylish top for all occasions.",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Smartphone XYZ",
    imageUrl: "https://example.com/smartphone.jpg",
    price: 599.99,
    description: "A latest model smartphone with high-end features.",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Smartphone ABC",
    imageUrl: "https://example.com/smartphone2.jpg",
    price: 499.99,
    description: "An affordable smartphone with all the essential features.",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Laptop Pro",
    imageUrl: "https://example.com/laptop.jpg",
    price: 999.99,
    description: "A powerful laptop for professionals.",
    postedBy: "Valay Andhariya",
  },
  {
    name: "Laptop Air",
    imageUrl: "https://example.com/laptop2.jpg",
    price: 799.99,
    description: "A lightweight and portable laptop.",
    postedBy: "Valay Andhariya",
  },
];

export default function UserProds() {
  const [openDilog, setOpenDilog] = useState(false);
  const [productForDilog, setProductForDilog] = useState(products[0]);

  return (
    <>
      <FormDilog />
      <div className="fixed inset-0 pointer-events-none">
        <section className={`flex w-full h-full flex-col pt-28 duration-500`}>
          <Typography
            className="flex w-full justify-center"
            variant="h1"
            color="teal"
          >
            User Products
          </Typography>
          <div className="pointer-events-auto lg:mr-36 flex justify-center items-center lg:justify-end lg:items-end">
            <Button color="blue-gray">Add Product</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-36  mr-14 items-center w-full justify-center overflow-auto pointer-events-auto scrollbar-thin scrollbar-webkit">
            {products.map((product) => {
              return (
                <Card className="w-80 lg:w-64 h-[91%] mb-10" key={product.name}>
                  <CardHeader floated={false} className="">
                    <img
                      src="https://docs.material-tailwind.com/img/team-3.jpg"
                      alt="profile-picture"
                    />
                  </CardHeader>
                  <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
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
                        size="sm"
                        onClick={() => {
                          setProductForDilog(product);
                          setOpenDilog(true);
                        }}
                        className="flex gap-2"
                      >
                        Delete
                        <MdDelete size={17} />
                      </Button>
                      <Button color="teal" className="flex gap-2" size="sm">
                        Edit
                        <FaRegEdit size={17} />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
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
