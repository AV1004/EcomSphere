import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { IoBagCheckOutline } from "react-icons/io5";

const TABLE_HEAD = [
  "Transaction",
  "Amount",
  "Date",
  "Status",
  "Account",
  "Quantity",
];

const TABLE_ROWS = [
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
    name: "Amazon",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
    name: "Pinterest",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
    name: "Google",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];

export default function Cart() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <section className={`flex w-full h-full flex-col pt-20  duration-500`}>
        {/* <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="white">
              Your Cart
            </Typography>
          </div>
        </div> */}
        <div className="pointer-events-auto  flex justify-center items-center lg:justify-start lg:items-start">
          <Card className="h-full w-full overflow-hidden bg-[#171720] mr-20 ml-20">
            <CardBody className="px-0 h-[27rem] overflow-auto scrollbar-thin scrollbar-webkit">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-700 p-4"
                      >
                        <Typography
                          variant="h5"
                          color="white"
                          className="leading-none opacity-70 font-semibold"
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
                      {
                        img,
                        name,
                        amount,
                        date,
                        status,
                        account,
                        accountNumber,
                        expiry,
                      },
                      index
                    ) => {
                      return (
                        <tr key={name}>
                          <td className="p-4 ">
                            <div className="flex items-center gap-3">
                              <Avatar
                                src={img}
                                alt={name}
                                size="md"
                                className="border border-blue-gray-50 bg-white object-contain p-1"
                              />
                              <Typography
                                variant="small"
                                color="white"
                                className="font-bold"
                              >
                                {name}
                              </Typography>
                            </div>
                          </td>
                          <td className="p-4 ">
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal"
                            >
                              {amount}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal"
                            >
                              {date}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={status}
                                color={
                                  status === "paid"
                                    ? "green"
                                    : status === "pending"
                                    ? "amber"
                                    : "red"
                                }
                              />
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                <Avatar
                                  src={
                                    account === "visa"
                                      ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                      : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                                  }
                                  size="sm"
                                  alt={account}
                                  variant="square"
                                  className="h-full w-full object-contain p-1"
                                />
                              </div>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="white"
                                  className="font-normal capitalize"
                                >
                                  {account.split("-").join(" ")} {accountNumber}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  {expiry}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Tooltip content="Edit User">
                              <IconButton variant="text">
                                <PencilIcon className="h-4 w-4 text-white" />
                              </IconButton>
                            </Tooltip>
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
              className="flex items-end justify-end text-white p-4"
            >
              <div className="border-t w-[30%]  flex flex-col 4 border-white">
                <Card className="w-full bg-[#171720]">
                  <CardBody className="flex flex-col gap-4">
                    <div className="divide-y divide-gray-200">
                      <div className="flex items-center justify-between last:pb-0">
                        <div className="flex items-center gap-x-3">
                          <div>
                            <Typography color="white" variant="h4">
                              Items
                            </Typography>
                          </div>
                        </div>
                        <Typography color="white" variant="h4">
                          4
                        </Typography>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="flex items-center justify-between last:pb-0">
                        <div className="flex items-center gap-x-3">
                          <div>
                            <Typography color="white" variant="h4">
                              Total
                            </Typography>
                          </div>
                        </div>
                        <Typography color="white" variant="h4">
                          $1234
                        </Typography>
                      </div>
                    </div>
                  </CardBody>
                  <Button
                    color="teal"
                    className="flex justify-center items-center text-md font-light gap-2"
                  >
                    Proceed to Checkout
                    <IoBagCheckOutline size={24} className="mb-2" />
                  </Button>
                </Card>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
