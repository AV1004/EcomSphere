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
import { useAtom } from "jotai";
import { currentPageAtom } from "./UI";

function NavItem({ label, to }) {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  return (
    <NavLink
      to={to}
      onClick={() => {
        setCurrentPage("home");
      }}
    >
      <Typography as="li" color="white" className="p-1 font-medium ">
        <button>{label}</button>
      </Typography>
    </NavLink>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-3  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8 pointer-events-auto">
      <>
        <NavItem
          className="pointer-events-auto"
          label="Products"
          to={"/products"}
        />
        <NavItem className="pointer-events-auto" label="Cart" to={"/cart"} />
        <NavItem
          className="pointer-events-auto"
          label="Orders"
          to={"/orders"}
        />
        <NavItem
          className="pointer-events-auto"
          label="Your Products"
          to={"/yourProducts"}
        />
      </>
    </ul>
  );
}

export const NavbarCom = ({ isAuthenticated }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <section
        className={`flex w-full h-full flex-col items-center  duration-500`}
      >
        <Navbar color="transparent" fullWidth>
          <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
            <NavLink to={"/"}>
              <Typography
                as="button"
                color="white"
                className="mr-4 cursor-pointer text-lg font-bold pointer-events-auto"
                onClick={() => {
                  setCurrentPage("home");
                }}
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
                  <Button
                    color="teal"
                    className="hidden lg:inline-block pointer-events-auto"
                    onClick={() => {
                      setCurrentPage("home");
                    }}
                  >
                    Profile
                  </Button>
                </NavLink>
              </>
            ) : (
              <div className="flex gap-3">
                <NavLink to={"/signin"}>
                  <Button
                    color="teal"
                    className="hidden lg:inline-block pointer-events-auto"
                    onClick={() => {
                      setCurrentPage("home");
                    }}
                  >
                    Sign in
                  </Button>
                </NavLink>
                <NavLink to={"/signup"}>
                  <Button
                    color="white"
                    className="hidden lg:inline-block pointer-events-auto "
                    onClick={() => {
                      setCurrentPage("home");
                    }}
                  >
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
              className="ml-auto inline-block text-white lg:hidden pointer-events-auto"
            >
              {open ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
          <Collapse open={open} className="pointer-events-auto">
            <div className="mt-2 rounded-xl   flex flex-col items-center justify-center bg-[#171720] py-2">
              {isAuthenticated === true ? (
                <div>
                  <NavList />
                  <NavLink to={"/profile"}>
                    <Button
                      color="teal"
                      className="mb-2 pointer-events-auto "
                      onClick={() => {
                        setCurrentPage("home");
                      }}
                    >
                      Profile
                    </Button>
                  </NavLink>
                </div>
              ) : (
                <div className="flex gap-5">
                  <NavLink to={"/signin"}>
                    <Button
                      color="teal"
                      className="mb-2 pointer-events-auto "
                      onClick={() => {
                        setCurrentPage("home");
                      }}
                    >
                      Sign in
                    </Button>
                  </NavLink>
                  <NavLink to={"/signup"}>
                    <Button
                      color="white"
                      className="mb-2 pointer-events-auto "
                      onClick={() => {
                        setCurrentPage("home");
                      }}
                    >
                      Sign up
                    </Button>
                  </NavLink>
                </div>
              )}
            </div>
          </Collapse>
        </Navbar>
      </section>
    </div>
  );
};
