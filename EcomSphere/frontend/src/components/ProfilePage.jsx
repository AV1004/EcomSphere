import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import { CiAlignLeft } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FaRegAddressBook } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { TbPasswordFingerprint } from "react-icons/tb";
import { motion } from "framer-motion";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { changeAddress, fetchUser, updateMobileAndName } from "../https/shop";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import MessageDilog from "./MessageDilog";

// Dummy Orders Table Data
const TABLE_HEAD = ["Id", "Order Date", "Total", ""];

// const TABLE_ROWS = [
//   {
//     id: "1234567890",
//     status: "Delivered",
//     date: "23/04/18",
//     total: 250,
//   },
//   {
//     id: "1234567891",
//     status: "Pending",
//     date: "23/04/18",
//     total: 1250,
//   },
//   {
//     id: "1234567892",
//     status: "Delivered",
//     date: "19/09/17",
//     total: 400,
//   },
//   {
//     id: "1234567893",
//     status: "Pending",
//     date: "24/12/08",
//     total: 4000,
//   },
//   {
//     id: "1234567894",
//     status: "Pending",
//     date: "04/10/21",
//     total: 1000,
//   },
// ];

export const ProfilePage = () => {
  const isMoblie = window.innerWidth < 768;
  const [validationMessage, setValidationMessage] = useState("");
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  const [showDilog, setShowDilog] = useState(false);
  const [changesInValues, setChangesInValues] = useState(false);
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const navigate = useNavigate();

  const signOut = useSignOut();

  const authHeader = useAuthHeader();

  const [showContent, setShowContent] = useState("accountSettings");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const resUserData = await fetchUser(authHeader);
      // console.log(resUserData.user.orders);
      setTABLE_ROWS(resUserData.user.orders);
      setUserInfo(resUserData.user);
    };
    fetchUserData();
    if (userInfo.address === undefined && userInfo.mobile === undefined) {
      setValidationMessage("Please complete your profile first!");
    }
    if (userInfo.address !== undefined && userInfo.mobile !== undefined) {
      setValidationMessage("");
    }
  }, [validationMessage, changesInValues]);

  const handleHomePageClick = () => {
    if (
      validationMessage === "" ||
      (userInfo.address !== undefined && userInfo.mobile !== undefined)
    ) {
      navigate("/");
    } else {
      setShowDilog(true);
    }
  };

  const handleAddMobile = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (data.mobile.length !== 0 && data.name.length !== 0) {
      const resUpdateMobileData = await updateMobileAndName(
        data.mobile,
        data.name,
        authHeader
      );
      // console.log(resUpdateMobileData);
      if (resUpdateMobileData.success === true) {
        setChangesInValues(!changesInValues);
      }
    }
  };

  const handleAddressSubmit = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (
      data.line1.length !== 0 &&
      data.line2.length !== 0 &&
      data.city.length !== 0 &&
      data.state.length !== 0 &&
      data.postalCode.length !== 0 &&
      data.country.length !== 0
    ) {
      const address = {
        line1: data.line1,
        line2: data.line2,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      };

      const resAddressData = await changeAddress(address, authHeader);
      if (resAddressData.success === true) {
        setChangesInValues(!changesInValues);
      }
    }
  };

  return (
    <>
      {validationMessage !== "" ? (
        <MessageDilog
          openDilog={showDilog}
          setOpenDilog={setShowDilog}
          validationMessage={validationMessage}
          color={"black"}
        />
      ) : (
        ""
      )}
      {isMoblie ? (
        <Button className="m-3" color="blue-gray" onClick={openDrawer}>
          <CiAlignLeft size={20} />
        </Button>
      ) : (
        ""
      )}
      <div className="flex">
        <Drawer
          open={isMoblie ? open : true}
          overlay={false}
          className={` ${isMoblie ? "" : "sticky"} bg-blue-gray-300 `}
          onClose={isMoblie ? closeDrawer : undefined}
        >
          <div className="mb-2 flex items-center justify-between p-4 ">
            <Button
              onClick={handleHomePageClick}
              size="lg"
              color="teal"
              className="cursor-pointer"
            >
              Go to Home Page
            </Button>
            {isMoblie ? (
              <IconButton variant="text" color="black" onClick={closeDrawer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            ) : (
              ""
            )}
          </div>
          <List>
            <ListItem
              className={` ${
                showContent === "accountSettings" ? "text-black" : "text-white"
              }`}
              selected={showContent === "accountSettings" ? true : false}
              onClick={() => {
                if (isMoblie) {
                  closeDrawer();
                }
                setShowContent("accountSettings");
              }}
            >
              <ListItemPrefix>
                <MdAccountCircle size={20} />
              </ListItemPrefix>
              Account Settings
            </ListItem>
            <ListItem
              className={` ${
                showContent === "address" ? "text-black" : "text-white"
              }`}
              selected={showContent === "address" ? true : false}
              onClick={() => {
                if (isMoblie) {
                  closeDrawer();
                }
                setShowContent("address");
              }}
            >
              <ListItemPrefix>
                <FaRegAddressBook size={20} />
              </ListItemPrefix>
              Address
            </ListItem>
            <ListItem
              className={` ${
                showContent === "myOrders" ? "text-black" : "text-white"
              }`}
              selected={showContent === "myOrders" ? true : false}
              onClick={() => {
                if (isMoblie) {
                  closeDrawer();
                }
                setShowContent("myOrders");
              }}
            >
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              My Orders
              <ListItemSuffix>
                <Chip
                  value={TABLE_ROWS.length}
                  size="sm"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem
              className={` ${
                showContent === "legalNotice" ? "text-black" : "text-white"
              }`}
              selected={showContent === "legalNotice" ? true : false}
              onClick={() => {
                if (isMoblie) {
                  closeDrawer();
                }
                setShowContent("legalNotice");
              }}
            >
              <ListItemPrefix>
                <RiPagesFill size={20} />
              </ListItemPrefix>
              Legal Notice
            </ListItem>
            <ListItem
              className={` ${
                showContent === "changePass" ? "text-black" : "text-white"
              }`}
              selected={showContent === "changePass" ? true : false}
              onClick={() => {
                if (isMoblie) {
                  closeDrawer();
                }
                setShowContent("changePass");
              }}
            >
              <ListItemPrefix>
                <TbPasswordFingerprint size={20} />
              </ListItemPrefix>
              Change Password
            </ListItem>
            <ListItem
              className={` ${
                showContent === "changePass" ? "text-black" : "text-white"
              }`}
              onClick={() => {
                // setIsAuthenticated(false);              //Logout here
                signOut();
                navigate("/");
              }}
            >
              <ListItemPrefix>
                <CiLogout size={20} />
              </ListItemPrefix>
              Logout
            </ListItem>
          </List>
        </Drawer>

        <div className="flex justify-center items-center w-full">
          {/* Account Settings */}
          {showContent === "accountSettings" && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 1.3,
              }}
              className="justify-center items-center w-full flex"
            >
              <Card className="w-full lg:w-[70%] m-10" color="blue-gray">
                <CardHeader
                  variant="gradient"
                  color="white"
                  className="mb-4 grid h-28 place-items-center"
                >
                  <Typography variant={isMoblie ? "h4" : "h3"} color="black">
                    <motion.p
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 1.8,
                      }}
                    >
                      Account Settings
                    </motion.p>
                  </Typography>
                </CardHeader>
                <form onSubmit={handleAddMobile}>
                  <CardBody className="flex flex-col gap-4 ">
                    <Typography variant="h6" color="white">
                      Personal Information
                    </Typography>

                    <div className="lg:flex  lg:gap-2 space-y-4 lg:space-y-0">
                      <Input
                        label="Your Name"
                        // value={userInfo.name}
                        name="name"
                        defaultValue={userInfo.name}
                        color="white"
                        required
                      />
                      <Input
                        label="Mobile No"
                        defaultValue={userInfo.mobile ? userInfo.mobile : ""}
                        name="mobile"
                        color="white"
                        required
                      />
                    </div>
                    {/* <div className="lg:w-[49.3%]">
                    <Input
                      label="Password"
                      type="password"
                      defaultValue={userInfo.password}
                      color="white"
                    />
                  </div> */}
                  </CardBody>
                  <CardFooter className="pt-0 w-full flex justify-center">
                    <Button variant="gradient" type="submit" color="white">
                      Save Changes
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          )}
          {/* Recent Orders */}
          {showContent === "myOrders" && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 1.3,
              }}
              className="lg:flex lg:flex-col w-full lg:items-center"
            >
              <Typography
                color="white"
                className="underline underline-offset-8 flex items-center justify-center"
                variant="h3"
              >
                <motion.p
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 1.8,
                  }}
                >
                  Recent Orders
                </motion.p>
              </Typography>
              <Card
                className="m-10  lg:h-[60%] lg:w-[60%]  overflow-scroll lg:overflow-hidden"
                color="blue-gray"
              >
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.slice(0, 5).map(
                      ({ _id, createdAt, total }, index) => (
                        <tr key={_id} className="even:bg-blue-gray-50/50">
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {_id}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {createdAt}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {total}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              Get Invoice
                            </Typography>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </Card>
              <div className="flex justify-center items-center">
                <Link to={"/orders"}>
                  <Button color="white">Show More</Button>
                </Link>
              </div>
            </motion.div>
          )}
          {/* Addresses */}
          {showContent === "address" && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 1.3,
              }}
              className="justify-center  items-center w-full flex"
            >
              <Card className="w-full  lg:w-[70%]  m-10" color="white">
                <CardHeader
                  variant="gradient"
                  color="blue-gray"
                  className="mb-4 grid h-28 place-items-center"
                >
                  <Typography variant={isMoblie ? "h4" : "h3"} color="white">
                    <motion.p
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 1.8,
                      }}
                    >
                      Your Address
                    </motion.p>
                  </Typography>
                </CardHeader>
                <form onSubmit={handleAddressSubmit}>
                  <CardBody className="flex flex-col gap-4 ">
                    <div className="lg:flex lg:flex-col lg:gap-2 space-y-4 lg:space-y-0">
                      {/* <Textarea label="Type your address here" /> */}
                      {/* <Textarea label="Address 2" /> */}
                      <div className="flex  lg:flex-row flex-col gap-3">
                        <Input
                          label="Address Line 1"
                          defaultValue={
                            userInfo.address ? userInfo.address.line1 : ""
                          }
                          name="line1"
                          color="black"
                          required
                        />
                        <Input
                          label="Address Line 2"
                          defaultValue={
                            userInfo.address ? userInfo.address.line2 : ""
                          }
                          name="line2"
                          color="black"
                          required
                        />
                      </div>
                      <div className="flex lg:flex-row flex-col gap-3">
                        <Input
                          label="City"
                          defaultValue={
                            userInfo.address ? userInfo.address.city : ""
                          }
                          name="city"
                          color="black"
                          required
                        />
                        <Input
                          label="State"
                          defaultValue={
                            userInfo.address ? userInfo.address.state : ""
                          }
                          name="state"
                          color="black"
                          required
                        />
                      </div>
                      <div className="flex lg:flex-row flex-col gap-3">
                        <Input
                          label="Postal Code"
                          defaultValue={
                            userInfo.address ? userInfo.address.postalCode : ""
                          }
                          name="postalCode"
                          color="black"
                          required
                        />
                        <Input
                          label="Country"
                          defaultValue={
                            userInfo.address ? userInfo.address.country : ""
                          }
                          name="country"
                          color="black"
                          required
                        />
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0 w-full flex justify-center">
                    <Button variant="gradient" type="submit" color="blue-gray">
                      Save Changes
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          )}
          {/* Legal Notice */}
          {showContent === "legalNotice" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.3,
              }}
              className="justify-center  items-center w-full flex"
            >
              <Card
                className=" m-10 w-full max-w-[48rem] h-96 flex-row"
                color="blue-gray"
              >
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="m-0 w-2/5 shrink-0 flex justify-center items-center rounded-r-none"
                >
                  <img
                    src="https://ecom-sphere.vercel.app/images/notice.jpg"
                    alt="card-image"
                    className="w-full  object-cover"
                  />
                </CardHeader>
                <CardBody className="overflow-auto scrollbar-thin scrollbar-webkit">
                  <Typography
                    variant="h5"
                    color="white"
                    className="mb-4 uppercase"
                  >
                    <motion.p
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 1.8,
                      }}
                    >
                      EcomSphere E-Commerce Platform
                      <br />
                      Effective Date: July 14, 2024
                    </motion.p>
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Introduction
                  </Typography>
                  <Typography color="white" className="mb-8 font-normal">
                    Welcome to EcomSphere. By using our website, you agree to
                    the following terms and conditions.
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Intellectual Property
                  </Typography>
                  <Typography color="white" className="mb-8 font-normal">
                    All content on EcomSphere is owned by its respective owners.
                    Unauthorized use is prohibited.
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    User Conduct
                  </Typography>
                  <Typography color="white" className="mb-8 font-normal">
                    Users must act responsibly. Any abusive or illegal activity
                    will result in termination of access.
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Disclaimer
                  </Typography>
                  <Typography color="white" className="mb-8 font-normal">
                    EcomSphere is provided "as is" without warranties. We are
                    not liable for any damages from using our site.
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Governing Law
                  </Typography>
                  <Typography color="white" className="mb-8 font-normal">
                    This notice is governed by local laws. Disputes are subject
                    to the jurisdiction of local courts.
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Contact
                  </Typography>
                  <Typography color="white" className="mb-8 font-normal">
                    For questions, email us at{" "}
                    <a href="mailto:support@ecomsphere.com">
                      support@ecomsphere.com.
                    </a>
                  </Typography>
                </CardBody>
              </Card>
            </motion.div>
          )}
          {/* Change Password */}
          {showContent === "changePass" && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 1.3,
              }}
              className="justify-center  items-center w-full flex"
            >
              <Card className="w-full  lg:w-[70%]  m-10" color="white">
                <CardHeader
                  variant="gradient"
                  color="blue-gray"
                  className="mb-4 grid h-28 place-items-center"
                >
                  <Typography variant={isMoblie ? "h4" : "h3"} color="white">
                    <motion.p
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 1.8,
                      }}
                    >
                      Change Password
                    </motion.p>
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                  <Input required label="Old Password" size="lg" />
                  <Input required label="New Password" size="lg" />
                  <Input required label="Confirm New Password" size="lg" />
                </CardBody>
                <CardFooter className="pt-0 flex justify-center">
                  <Button variant="gradient" color="blue-gray">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};
