import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

function NavItem({ label, to }) {
  return (
    <NavLink to={to}>
      <Typography as="li" color="white" className="p-1 font-medium ">
        {label}
      </Typography>
    </NavLink>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-3  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8 ">
      <>
        <NavItem label="Products" to={"/products"} />
        <NavItem label="Cart" to={"/cart"} />
        <NavItem label="Orders" to={"/orders"} />
        <NavItem label="Your Products" to={"/yourProducts"} />
      </>
    </ul>
  );
}

export const NavbarCom = ({ isAuthenticated }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <Navbar color="transparent" fullWidth>
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <NavLink to={"/"}>
          <Typography
            as="p"
            color="white"
            className="mr-4 cursor-pointer text-lg font-bold"
          >
            EComSphere
          </Typography>
        </NavLink>

        {isAuthenticated === true ? (
          <>
            <div className="hidden lg:block">
              <NavList isAuthenticated={isAuthenticated} />
            </div>
            <NavLink to={"/profile"}>
              <Button color="teal" className="hidden lg:inline-block">
                Profile
              </Button>
            </NavLink>
          </>
        ) : (
          <div className="flex gap-3">
            <NavLink to={"/signin"}>
              <Button color="teal" className="hidden lg:inline-block">
                Sign in
              </Button>
            </NavLink>
            <NavLink to={"/signup"}>
              <Button color="white" className="hidden lg:inline-block">
                Sign up
              </Button>
            </NavLink>
          </div>
        )}
        <IconButton
          size="sm"
          variant="text"
          color="blue-gray"
          onClick={handleOpen}
          className="ml-auto inline-block text-white lg:hidden"
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="mt-2 rounded-xl  flex flex-col items-center justify-center bg-[#171720] py-2">
          {isAuthenticated === true ? (
            <div>
              <NavList />
              <Button color="teal" className="mb-2">
                Profile
              </Button>
            </div>
          ) : (
            <div className="flex gap-5">
              <Button color="teal" className="mb-2">
                Sign in
              </Button>
              <Button color="white" className="mb-2">
                Sign up
              </Button>
            </div>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
};
