import React, { Suspense, useEffect, useState } from "react";
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
import { motion } from "framer-motion";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {
  addProductToCart,
  decreaseFromCart,
  getCartItems,
  reomveProdFromCart,
} from "../https/shop";

import emptyCart from "/images/emptyCart.png";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { server } from "../https/auth";

const TABLE_HEAD = ["Products", "Quantity", "Subtotal"];

// const TABLE_ROWS = [
//   {
//     img: "https://docs.material-tailwind.com/img/team-3.jpg",
//     name: "Spotify",
//     category: "Furniture",
//     price: 123,
//     total: 2500,
//     quantity: 2,
//   },
//   {
//     img: "https://docs.material-tailwind.com/img/team-3.jpg",
//     name: "Spotify",
//     category: "Footwear",
//     price: 123,
//     total: 2500,
//     quantity: 1,
//   },
//   {
//     img: "https://docs.material-tailwind.com/img/team-3.jpg",
//     name: "Spotify",
//     category: "Clothing",
//     price: 123,
//     total: 2500,
//     quantity: 5,
//   },
// ];

export default function Cart() {
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  const [changesInItem, setchangesInItem] = useState(false);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [showFallBackText, setShowFallBackText] = useState(false);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const getUserCart = async () => {
      let total = 0;
      const resGetCartData = await getCartItems(authHeader);
      // console.log(resGetCartData.cart.items);
      if (resGetCartData.cart.items.length === 0) {
        setShowFallBackText(true);
      }
      setTABLE_ROWS(resGetCartData.cart.items);
      resGetCartData.cart.items.map((item) => {
        total = total + item.productId.price * item.quantity;
      });
      setTotalCartValue(total);
      if (changesInItem === true) {
        setchangesInItem(false);
      }
    };
    getUserCart();
  }, [changesInItem]);

  const handleAddOneMore = async (prodId) => {
    const resAddToCartData = await addProductToCart(prodId, authHeader);
    // console.log(resAddToCartData);
    if (resAddToCartData.success === true) {
      setchangesInItem(true);
    }
  };

  const handleDecreaseByOne = async (prodId) => {
    const resDecreaseByOneData = await decreaseFromCart(prodId, authHeader);
    if (resDecreaseByOneData.success === true) {
      setchangesInItem(true);
    }
  };

  const removeProdCart = async (prodId) => {
    const resRemoveProdFromCart = await reomveProdFromCart(prodId, authHeader);
    if (resRemoveProdFromCart.success === true) {
      setchangesInItem(true);
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    // console.log(TABLE_ROWS);
    const body = {
      products: TABLE_ROWS,
    };

    const headers = {
      Authorization: authHeader,
      "Content-type": "application/json",
    };

    const response = await fetch(`${server}/shop/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    
    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      <section
        className={`flex w-full h-full flex-col lg:pt-12 pt-16 duration-500 overflow-auto scrollbar-thin scrollbar-webkit`}
      >
        {TABLE_ROWS.length === 0 && showFallBackText === true ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="pointer-events-auto  flex flex-col gap-3 justify-center items-center h-full"
          >
            <img
              src={emptyCart}
              alt={"emptyCart"}
              className="lg:h-96 lg:w-96 h-80 w-80"
            />
            <Typography color="white" className="lg:tex-4xl text-xl">
              EMPTY CART
            </Typography>
            <Link to={"/products"}>
              <Button color="teal">Explore Products</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="pointer-events-auto  flex justify-center items-center lg:justify-start lg:items-start">
            {TABLE_ROWS.length !== 0 && showFallBackText !== true ? (
              <Card className="h-full w-full overflow-hidden bg-[#171720] lg:mx-20 ">
                <CardBody className="px-0 lg:h-[30.9rem] h-[42rem] overflow-auto scrollbar-thin scrollbar-webkit">
                  <table className="w-full min-w-max lg:table-auto table-fixed text-left">
                    <motion.thead
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.3 }}
                    >
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
                    </motion.thead>
                    <tbody className="border-0">
                      {TABLE_ROWS.map(
                        (
                          // { img, name, price, total, quantity, category },
                          item,
                          index
                        ) => {
                          return (
                            <motion.tr
                              key={index}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 1,
                                delay: 1 + index * 0.2,
                              }}
                            >
                              <td className="p-4">
                                <div className="flex lg:flex-row flex-col items-center gap-3">
                                  <img
                                    src={item.productId.imageUrl.url}
                                    alt={item.productId.name}
                                    className="lg:h-24 lg:w-24 h-16 w-16"
                                  />
                                  <div className="flex flex-col gap-2 justify-start">
                                    <Typography
                                      variant="h6"
                                      color="white"
                                      className="font-bold flex lg:flex-row flex-col gap-2"
                                    >
                                      {item.productId.name}
                                      <Typography
                                        variant="small"
                                        color="white"
                                        className="font-bold"
                                      >
                                        ({item.productId.category})
                                      </Typography>
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      color="white"
                                      className="font-bold"
                                    >
                                      Price:${item.productId.price}
                                    </Typography>
                                    <button
                                      className="text-teal-700 w-16 font-semibold"
                                      onClick={() => {
                                        removeProdCart(item.productId._id);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-4">
                                  <button
                                    className="flex items-center justify-center"
                                    onClick={() => {
                                      handleDecreaseByOne(item.productId._id);
                                    }}
                                  >
                                    <FaMinus
                                      color="white"
                                      className="cursor-pointer"
                                      size={13}
                                    />
                                  </button>
                                  <Typography color="white">
                                    {item.quantity}
                                  </Typography>
                                  <button
                                    className="flex items-center justify-center"
                                    onClick={() => {
                                      handleAddOneMore(item.productId._id);
                                    }}
                                  >
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
                                  ${item.productId.price * item.quantity}
                                </Typography>
                              </td>
                            </motion.tr>
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
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 1 }}
                    className="border-t lg:w-[30%] w-full  flex flex-col  border-white"
                  >
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
                              {TABLE_ROWS.length}
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
                              ${totalCartValue}
                            </Typography>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          color="teal"
                          className="flex justify-center items-center text-md font-light gap-2"
                          onClick={makePayment}
                        >
                          Proceed to Checkout
                          <IoBagCheckOutline size={24} className="mb-2" />
                        </Button>
                      </CardBody>
                    </Card>
                  </motion.div>
                </CardFooter>
              </Card>
            ) : (
              ""
            )}
          </div>
        )}
      </section>
    </div>
  );
}
