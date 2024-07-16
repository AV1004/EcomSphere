import React from "react";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";

const TABLE_HEAD = ["Products", "Quantity", "Subtotal"];

const TABLE_ROWS = [
  {
    img: "https://docs.material-tailwind.com/img/team-3.jpg",
    name: "Spotify",
    category: "Furniture",
    price: 123,
    total: 2500,
    quantity: 2,
  },
  {
    img: "https://docs.material-tailwind.com/img/team-3.jpg",
    name: "Spotify",
    category: "Footwear",
    price: 123,
    total: 2500,
    quantity: 1,
  },
  {
    img: "https://docs.material-tailwind.com/img/team-3.jpg",
    name: "Spotify",
    category: "Clothing",
    price: 123,
    total: 2500,
    quantity: 5,
  },
];

export default function Cart() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <section
        className={`flex w-full h-full flex-col lg:pt-12 pt-16 duration-500 overflow-auto scrollbar-thin scrollbar-webkit`}
      >
        {/* <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="white">
              Your Cart
            </Typography>
          </div>
        </div> */}
        <div className="pointer-events-auto  flex justify-center items-center lg:justify-start lg:items-start">
          <Card className="h-full w-full overflow-hidden bg-[#171720] lg:mx-20 ">
            <CardBody className="px-0 lg:h-[30.9rem] h-[42rem] overflow-auto scrollbar-thin scrollbar-webkit">
              <table className="w-full min-w-max lg:table-auto table-fixed text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 w-1 bg-blue-gray-700 p-4"
                      >
                        <Typography
                          // variant={isMoblie ? "small" : "h5"}
                          color="white"
                          className="leading-none opacity-70 lg:text-lg text-sm  font-semibold"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="border-0">
                  {TABLE_ROWS.map(
                    (
                      { img, name, price, total, quantity, category },
                      index
                    ) => {
                      return (
                        <tr key={index}>
                          <td className="p-4">
                            <div className="flex lg:flex-row flex-col items-center gap-3">
                              <img
                                src={img}
                                alt={name}
                                className="lg:h-24 lg:w-24 h-16 w-16"
                              />
                              <div className="flex flex-col gap-2 justify-start">
                                <Typography
                                  variant="h6"
                                  color="white"
                                  className="font-bold flex gap-2"
                                >
                                  {name}
                                  <Typography
                                    variant="h6"
                                    color="white"
                                    className="font-bold"
                                  >
                                    ({category})
                                  </Typography>
                                </Typography>
                                <Typography
                                  variant="h6"
                                  color="white"
                                  className="font-bold"
                                >
                                  Price:${price}
                                </Typography>
                                <button className="text-teal-700 w-16 font-semibold">
                                  Remove
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-4">
                              <button className="flex items-center justify-center">
                                <FaMinus
                                  color="white"
                                  className="cursor-pointer"
                                  size={13}
                                />
                              </button>
                              <Typography color="white">{quantity}</Typography>
                              <button className="flex items-center justify-center">
                                <IoAdd
                                  color="white"
                                  className="cursor-pointer "
                                  size={20}
                                />
                              </button>
                            </div>
                          </td>
                          <td className="p-4 ">
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal"
                            >
                              ${total}
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
            <CardFooter
              children
              className="flex items-end justify-end text-white p-0"
            >
              <div className="border-t lg:w-[30%] w-full  flex flex-col  border-white">
                <Card className="w-full bg-[#171720]">
                  <CardBody className="flex flex-col gap-4">
                    <div className="divide-y divide-gray-200">
                      <div className="flex items-center justify-between last:pb-0">
                        <div className="flex items-center gap-x-3">
                          <div>
                            <Typography color="white" variant="h6">
                              Items
                            </Typography>
                          </div>
                        </div>
                        <Typography color="white" variant="h6">
                          4
                        </Typography>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="flex items-center justify-between last:pb-0">
                        <div className="flex items-center gap-x-3">
                          <div>
                            <Typography color="white" variant="h6">
                              Total
                            </Typography>
                          </div>
                        </div>
                        <Typography color="white" variant="h6">
                          $1234
                        </Typography>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      color="teal"
                      className="flex justify-center items-center text-md font-light gap-2"
                    >
                      Proceed to Checkout
                      <IoBagCheckOutline size={24} className="mb-2" />
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
