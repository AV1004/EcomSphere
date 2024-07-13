import React, { useState } from "react";
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
  Textarea,
} from "@material-tailwind/react";
import { CiAlignLeft } from "react-icons/ci";
import { Link } from "react-router-dom";

// Dummy Orders Table Data
const TABLE_HEAD = ["Id", "Status", "Order Date", "Total", ""];

const TABLE_ROWS = [
  {
    id: "1234567890",
    status: "Delivered",
    date: "23/04/18",
    total: 250,
  },
  {
    id: "1234567891",
    status: "Pending",
    date: "23/04/18",
    total: 1250,
  },
  {
    id: "1234567892",
    status: "Delivered",
    date: "19/09/17",
    total: 400,
  },
  {
    id: "1234567893",
    status: "Pending",
    date: "24/12/08",
    total: 4000,
  },
  {
    id: "1234567894",
    status: "Pending",
    date: "04/10/21",
    total: 1000,
  },
];

export const ProfilePage = () => {
  const isMoblie = window.innerWidth < 768;
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const [showContent, setShowContent] = useState("accountSettings");

  return (
    <>
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
            <Link to={"/"}>
              <Typography variant="h5" color="black" className="cursor-pointer">
                EcomSphere
              </Typography>
            </Link>
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
                setShowContent("accountSettings");
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
                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              Account Settings
            </ListItem>
            <ListItem
              className={` ${
                showContent === "myOrders" ? "text-black" : "text-white"
              }`}
              selected={showContent === "myOrders" ? true : false}
              onClick={() => {
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
                <Chip value="5" size="sm" className="rounded-full" />
              </ListItemSuffix>
            </ListItem>
            <ListItem
              className={` ${
                showContent === "address" ? "text-black" : "text-white"
              }`}
              selected={showContent === "address" ? true : false}
              onClick={() => {
                setShowContent("address");
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
                    d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              Address
            </ListItem>
            <ListItem
              className={` ${
                showContent === "legalNotice" ? "text-black" : "text-white"
              }`}
              selected={showContent === "legalNotice" ? true : false}
              onClick={() => {
                setShowContent("legalNotice");
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
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              Legal Notice
            </ListItem>
            <ListItem
              className={` ${
                showContent === "changePass" ? "text-black" : "text-white"
              }`}
              selected={showContent === "changePass" ? true : false}
              onClick={() => {
                setShowContent("changePass");
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
                    d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              Change Password
            </ListItem>
          </List>
        </Drawer>
        <div className="flex justify-center  items-center w-full">
          {/* Account Settings */}
          {showContent === "accountSettings" && (
            <Card className="w-full  lg:w-[70%]  m-10" color="blue-gray">
              <CardHeader
                variant="gradient"
                color="white"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant={isMoblie ? "h4" : "h3"} color="black">
                  Account Settings
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4 ">
                <Typography variant="h6" color="white">
                  Personal Information
                </Typography>
                <div className="lg:flex  lg:gap-2 space-y-4 lg:space-y-0">
                  <Input required label="Your Name" color="white" />
                  <Input required label="Mobile No" color="white" />
                </div>
                <div className="lg:w-[49.3%]">
                  <Input label="Password" required color="white" />
                </div>
              </CardBody>
              <CardFooter className="pt-0 w-full flex justify-center">
                <Button variant="gradient" color="white">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          )}
          {/* Recent Orders */}
          {showContent === "myOrders" && (
            <div className="lg:flex lg:flex-col w-full lg:items-center">
              <Typography
                color="white"
                className="underline underline-offset-8 flex items-center justify-center"
                variant="h3"
              >
                Recent Orders
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
                    {TABLE_ROWS.map(({ id, status, date, total }, index) => (
                      <tr key={id} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {id}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {status}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
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
                    ))}
                  </tbody>
                </table>
              </Card>
              <div className="flex justify-center items-center">
                <Link to={"/orders"}>
                  <Button color="white">Show More</Button>
                </Link>
              </div>
            </div>
          )}
          {/* Addresses */}
          {showContent === "address" && (
            <Card className="w-full  lg:w-[70%]  m-10" color="white">
              <CardHeader
                variant="gradient"
                color="blue-gray"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant={isMoblie ? "h4" : "h3"} color="white">
                  Your Addresses
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4 ">
                <div className="lg:flex  lg:gap-2 space-y-4 lg:space-y-0">
                  <Textarea label="Address 1" required />
                  <Textarea label="Address 2" />
                </div>
              </CardBody>
              <CardFooter className="pt-0 w-full flex justify-center">
                <Button variant="gradient" color="blue-gray">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          )}
          {/* Legal Notice */}
          {showContent === "legalNotice" && (
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
                  src="http://localhost:5173/images/notice.jpg"
                  alt="card-image"
                  className="w-full  object-cover"
                />
              </CardHeader>
              <CardBody className="overflow-scroll">
                <Typography
                  variant="h5"
                  color="white"
                  className="mb-4 uppercase"
                >
                  EcomSphere - 3D E-Commerce Platform
                  <br />
                  Effective Date: July 14, 2024
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Introduction
                </Typography>
                <Typography color="white" className="mb-8 font-normal">
                  Welcome to EcomSphere. By using our website, you agree to the
                  following terms and conditions.
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
                  EcomSphere is provided "as is" without warranties. We are not
                  liable for any damages from using our site.
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Governing Law
                </Typography>
                <Typography color="white" className="mb-8 font-normal">
                  This notice is governed by local laws. Disputes are subject to
                  the jurisdiction of local courts.
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
          )}
          {/* Change Password */}
          {showContent === "changePass" && (
            <Card className="w-full  lg:w-[70%]  m-10" color="white">
              <CardHeader
                variant="gradient"
                color="blue-gray"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  Change Password
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
          )}
        </div>
      </div>
    </>
  );
};
