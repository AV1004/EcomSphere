import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { getInvoiveForOrder, getUserOrders } from "../https/shop";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Link } from "react-router-dom";
import notHaveOrders from "/images/notHaveOrders.png";

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showFallBackText, setshowFallBackText] = useState(false);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const getOrders = async () => {
      const resDataOfOrders = await getUserOrders(authHeader);
      // console.log(resDataOfOrders.orders);
      if (resDataOfOrders.orders.length === 0) {
        setshowFallBackText(true);
      }
      if (resDataOfOrders.success === true) {
        setOrders(resDataOfOrders.orders);
      }
    };
    getOrders();
  }, []);

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

  const handleViewInvoice = async (orderId) => {
    await getInvoiveForOrder(orderId, authHeader);
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      <section
        className={`flex w-full h-full flex-col pt-24 pointer-events-auto  duration-500`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3 }}
          className="w-full lg:justify-start justify-center  flex lg:ml-10"
        >
          <Typography color="white" variant="h3">
            Your Orders
          </Typography>
        </motion.div>
        <div className="overflow-auto flex flex-col gap-11 mt-10 mb-10 scrollbar-thin scrollbar-webkit  w-full items-center">
          {orders.length === 0 && showFallBackText === true ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3 }}
              className="pointer-events-auto  flex flex-col gap-3 justify-center items-center h-full"
            >
              <img
                src={notHaveOrders}
                alt={"notHaveOrders"}
                className="lg:h-96 lg:w-96 h-60 w-60"
              />
              <Typography color="white" className="lg:tex-4xl text-xl">
                DON'T HAVE ORDERS HISTORY
              </Typography>
              <Link to={"/products"}>
                <Button color="blue-gray">Explore Products</Button>
              </Link>
            </motion.div>
          ) : (
            orders.map((order) => (
              <Card key={order._id} className="w-[90%] bg-blue-gray-900">
                <CardBody>
                  <div className="flex lg:flex-row flex-col mx-7 gap-10">
                    <motion.div
                      className="w-40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    >
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
                        {order._id}
                      </Typography>
                    </motion.div>
                    <motion.div
                      className="w-36"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    >
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
                        {formatDate(order.createdAt)}
                      </Typography>
                    </motion.div>
                    <motion.div
                      className="w-60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    >
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
                        ₹{order.total}
                      </Typography>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="lg:w-full lg:items-start flex lg:justify-end"
                    >
                      <Button
                        onClick={() => {
                          handleViewInvoice(order._id);
                        }}
                        color="teal"
                        size="sm"
                      >
                        View Invoice
                      </Button>
                    </motion.div>
                  </div>
                  <div>
                    {order.orderItems.map((orderItem, index) => (
                      <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: 1.5 + index * 0.2 }}
                        key={orderItem._id}
                        className="mt-10 flex"
                      >
                        <div className="lg:w-80 lg:mr-4 w-24 justify-center items-center gap-2 flex flex-col">
                          <img
                            src={orderItem.product.imageUrl.url}
                            alt={orderItem.product.name}
                            className="lg:h-[10rem] h-24"
                          />
                          <Typography
                            color="teal"
                            className="text-xs block lg:hidden"
                          >
                            {orderItem.product.name}
                          </Typography>
                        </div>
                        <div className="ml-5 block lg:hidden">
                          <div className="flex flex-col gap-1">
                            <Typography
                              color="white"
                              className="flex gap-12"
                              variant="h6"
                            >
                              {orderItem.product.category}
                              <Typography variant="paragraph" color="teal">
                                ₹{orderItem.product.price}
                              </Typography>
                            </Typography>

                            <Typography color="white">
                              Quantity:{orderItem.quantity}
                            </Typography>
                          </div>
                        </div>
                        <div className="w-full mt-5 lg:block hidden">
                          <div className="flex w-full">
                            <Typography
                              variant="h4"
                              color="teal"
                              className="w-96 "
                            >
                              {orderItem.product.name}
                              <Typography color="white">
                                {orderItem.product.category}
                              </Typography>
                            </Typography>
                            <Typography
                              className="w-full flex mr-5 justify-end"
                              variant="h4"
                              color="white"
                            >
                              ₹{orderItem.product.price}
                            </Typography>
                          </div>
                          <div>
                            <Typography color="white">
                              {orderItem.product.description}
                            </Typography>
                            <Typography variant="paragraph" color="white">
                              Quantity : {orderItem.quantity}
                            </Typography>
                          </div>
                        </div>
                      </motion.section>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
