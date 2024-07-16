import React from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

const orders = [
  {
    id: 123456789012,
    date: "Apr 10,2022",
    total: 1234,
    products: [
      {
        name: "Men's T-Shirt",
        imageUrl: "https://example.com/mens-tshirt.jpg",
        price: 19.99,
        description: "A comfortable cotton t-shirt.",
        category: "Clothing",
        quantity: 2,
      },
      {
        name: "Men's Jeans",
        imageUrl: "https://example.com/mens-jeans.jpg",
        price: 49.99,
        description: "Stylish and durable denim jeans.",
        category: "Elctronics",
        quantity: 4,
      },
      {
        name: "Women's Dress",
        imageUrl: "https://example.com/womens-dress.jpg",
        price: 39.99,
        description: "A beautiful summer dress.",
        category: "Footwear",
        quantity: 1,
      },
    ],
  },
  {
    id: 198765432122,
    date: "Jul 30,2023",
    total: 2345,
    products: [
      {
        name: "Women's Top",
        imageUrl: "https://example.com/womens-top.jpg",
        price: 29.99,
        description: "A stylish top for all occasions.",
        category: "Clothing",
        quantity: 2,
      },
      {
        name: "Smartphone XYZ",
        imageUrl: "https://example.com/smartphone.jpg",
        price: 599.99,
        description: "A latest model smartphone with high-end features.",
        category: "Footwear",
        quantity: 5,
      },
    ],
  },
  {
    id: 702848174971,
    date: "Mar 12,2024",
    total: 5678,
    products: [
      {
        name: "Smartphone XYZ",
        imageUrl: "https://example.com/smartphone.jpg",
        price: 599.99,
        description: "A latest model smartphone with high-end features.",
        category: "Footwear",
        quantity: 1,
      },
      {
        name: "Smartphone ABC",
        imageUrl: "https://example.com/smartphone2.jpg",
        price: 499.99,
        description:
          "An affordable smartphone with all the essential features.",
        category: "Furniture",
        quantity: 3,
      },
      {
        name: "Laptop Pro",
        imageUrl: "https://example.com/laptop.jpg",
        price: 999.99,
        description: "A powerful laptop for professionals.",
        category: "Footwear",
        quantity: 1,
      },
      {
        name: "Laptop Air",
        imageUrl: "https://example.com/laptop2.jpg",
        price: 799.99,
        description: "A lightweight and portable laptop.",
        category: "Furniture",
        quantity: 4,
      },
    ],
  },
];

export const MyOrders = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <section
        className={`flex w-full h-full flex-col pt-24 pointer-events-auto  duration-500`}
      >
        <div className="w-full lg:justify-start justify-center  flex lg:ml-10">
          <Typography color="white" variant="h3">
            Your Orders
          </Typography>
        </div>
        <div className="overflow-auto flex flex-col gap-11 mt-10 mb-10 scrollbar-thin scrollbar-webkit  w-full items-center">
          {orders.map((order) => (
            <Card key={order.id} className="w-[90%] bg-blue-gray-900">
              <CardBody>
                <div className="flex lg:flex-row flex-col mx-7 gap-10">
                  <div className="w-40">
                    <Typography
                      variant="h4"
                      color="teal"
                      className="lg:text-xl text-lg"
                    >
                      Order ID
                    </Typography>
                    <Typography
                      className="mt-3 lg:text-md text-sm"
                      color="white"
                    >
                      {order.id}
                    </Typography>
                  </div>
                  <div className="w-36">
                    <Typography
                      variant="h4"
                      color="teal"
                      className="lg:text-xl text-lg"
                    >
                      Date
                    </Typography>
                    <Typography
                      className="mt-3 lg:text-md text-sm"
                      color="white"
                    >
                      {order.date}
                    </Typography>
                  </div>
                  <div className="w-60">
                    <Typography
                      variant="h4"
                      color="teal"
                      className="lg:text-xl text-lg"
                    >
                      Total Amount
                    </Typography>
                    <Typography
                      className="mt-3 lg:text-md text-sm"
                      color="white"
                    >
                      ${order.total}
                    </Typography>
                  </div>
                  <div className="lg:w-full lg:items-start flex lg:justify-end">
                    <Button color="teal" size="sm">
                      View Invoice
                    </Button>
                  </div>
                </div>
                <div>
                  {order.products.map((product, index) => (
                    <section key={index} className="mt-10 flex">
                      <div className="lg:w-80 w-24 justify-center items-center gap-2 flex flex-col">
                        <img
                          src={
                            "https://docs.material-tailwind.com/img/team-3.jpg"
                          }
                          alt={product.name}
                          className="lg:h-[10rem] h-24"
                        />
                        <Typography
                          color="teal"
                          className="text-xs block lg:hidden"
                        >
                          {product.name}
                        </Typography>
                      </div>
                      <div className="ml-5 block lg:hidden">
                        <div className="flex flex-col gap-1">
                          <Typography color="white" className="flex gap-12" variant="h6">
                            {product.category}
                            <Typography variant="paragraph" color="teal">${product.price}</Typography>
                          </Typography>
                          
                          <Typography color="white">
                            Quantity:{product.quantity}
                          </Typography>
                        </div>
                      </div>
                      <div className="w-full mt-5 lg:block hidden">
                        <div className="flex w-full">
                          <Typography
                            variant="h4"
                            color="teal"
                            className="w-96"
                          >
                            {product.name}
                            <Typography color="white">
                              {product.category}
                            </Typography>
                          </Typography>
                          <Typography
                            className="w-full flex mr-5 justify-end"
                            variant="h4"
                            color="white"
                          >
                            ${product.price}
                          </Typography>
                        </div>
                        <div>
                          <Typography color="white">
                            {product.description}
                          </Typography>
                          <Typography variant="paragraph" color="white">
                            Quantity : {product.quantity}
                          </Typography>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};