import React, { Suspense, useEffect, useState } from "react";
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
import {
  deleteImageFromCloud,
  deleteProduct,
  getDeleteTokenForCloud,
  getuserProducts,
} from "../https/shop";
import MessageDilog from "./MessageDilog";

export default function UserProds() {
  const [products, setProducts] = useState([]);
  const [openDilog, setOpenDilog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [productForDilog, setProductForDilog] = useState(products[0]);
  const [showFallBackText, setShowFallBackText] = useState(false);
  const authHeader = useAuthHeader();

  const [openDilogMessage, setOpenDilogMessage] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const destroyImage = async (imgId) => {
    // Getting Delete Token
    const deleteToken = await getDeleteTokenForCloud(imgId, authHeader);

    let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    let resourceType = "image";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`;
    const formData = new FormData();
    formData.append("public_id", imgId);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    formData.append("signature", deleteToken.signature);
    formData.append("timestamp", deleteToken.timestamp);

    const resDataOfDestroyImg = await deleteImageFromCloud(api, formData);

    return resDataOfDestroyImg;
  };

  useEffect(() => {
    const giveUserProds = async () => {
      const userProdData = await getuserProducts(authHeader);
      setProducts(userProdData.products);
      setShowFallBackText(true);
    };
    giveUserProds();
  }, [openDilog, openDilogMessage]);

  const deleteHandler = async (prodId, imgId) => {
    const resdeleteImgData = await destroyImage(imgId);
    if (resdeleteImgData.result === "ok") {
      const resDeleteProdData = await deleteProduct(prodId, authHeader);
      if (resDeleteProdData.success === true) {
        setValidationMessage(resDeleteProdData.message);
        setOpenDilogMessage(true);
      } else {
        setValidationMessage(resDeleteProdData.message);
        setOpenDilogMessage(true);
      }
    } else {
      {
        setValidationMessage("Can't delete product!");
        setOpenDilogMessage(true);
      }
    }
  };

  return (
    <>
      <MessageDilog
        openDilog={openDilogMessage}
        setOpenDilog={setOpenDilogMessage}
        validationMessage={validationMessage}
        color={"black"}
      />
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
            {products.length === 0 && showFallBackText === true ? (
              <Typography color="white" className="lg:text-3xl text-xl">
                You did not add any product yet!
              </Typography>
            ) : (
              products.map((product, index) => {
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
                          {product.category}
                        </Typography>
                        <div className="flex items-center justify-center mt-3">
                          <Typography variant="h3" color="black">
                            ₹{product.price}
                          </Typography>
                        </div>
                        <div className="flex gap-2 justify-center items-center mt-3">
                          <Button
                            color="teal"
                            onClick={() => {
                              deleteHandler(
                                product._id,
                                product.imageUrl.public_id
                              );
                            }}
                            size="sm"
                            className="flex gap-2"
                          >
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
              })
            )}
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
