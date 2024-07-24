import React, { useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useReactToPrint } from "react-to-print";
import LOGO from "/favicon.png";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const Invoice = React.forwardRef(({ order }, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-full bg-blue-gray-900 overflow-auto scrollbar-thin scrollbar-webkit"
    >
      <div className="lg:grid" style={{ gridTemplateColumns: "auto auto" }}>
        <div className="flex gap-2 items-center">
          <img className="h-10 w-10" src={LOGO} alt={order._id} />
          <p className="text-xl text-white">EcomSphere</p>
        </div>
        <div className="flex flex-col items-center justify-end text-white">
          <p className="flex items-center justify-end w-full">
            Order Id:{order._id}
          </p>
          <p className="flex items-center justify-end w-full">
            Order Date:{formatDate(order.createdAt)}
          </p>
        </div>
      </div>
      <div className="text-white mt-8">
        <p className="text-2xl underline">Billing Information</p>
        <div>
          <p>Name:{order.user.name}</p>
          <p>Email:{order.user.email}</p>
        </div>
      </div>
      <div className="text-white mt-10">
        <p className="text-2xl underline">Order Details</p>
        {order.orderItems.map((item, index) => (
          <div className="grid" style={{ gridTemplateColumns: "auto auto" }}>
            <p>
              {index + 1}.{item.product.name}-{item.quantity} x ₹
              {item.product.price}
            </p>
            <p className="flex w-full justify-end">
              ₹{item.quantity * item.product.price}
            </p>
          </div>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: "auto auto" }}>
        <div className="w-full text-2xl mt-5  text-white font-bold">
          Total Amount
        </div>
        <div className="w-full flex justify-end text-2xl mt-5  text-white font-bold">
          ₹{order.total}
        </div>
      </div>
    </div>
  );
});

export default function ShowInvoice({ openDilog, setOpenDilog, order }) {
  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const handleOpen = () => setOpenDilog(!openDilog);

  //   console.log(order);

  return (
    <>
      <Dialog
        open={openDilog}
        handler={handleOpen}
        className="bg-blue-gray-900"
      >
        <DialogHeader>
          <Typography variant="h5" color="white">
            Invoice
          </Typography>
        </DialogHeader>
        <DialogBody className="grid place-items-center w-full h-[27rem] gap-4 ">
          <Invoice ref={invoiceRef} order={order} />
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="white" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" color="teal" onClick={handlePrint}>
            Print
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
