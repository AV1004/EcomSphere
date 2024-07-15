import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export default function ProductsPage() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <section className={`flex w-full h-full flex-col pt-20  duration-500`}>
        <div className="pointer-events-auto ml-36">
          <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            <MenuHandler>
              <Button color="white"> Menu</Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>Menu Item 1</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
              <MenuItem>Menu Item 3</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="mt-10 flex flex-wrap gap-36  mr-14 items-center w-full justify-center overflow-auto pointer-events-auto scrollbar-thin scrollbar-webkit">
          <Card className="w-96">
            <CardHeader floated={false} className="h-80">
              <img
                src="https://docs.material-tailwind.com/img/team-3.jpg"
                alt="profile-picture"
              />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                Natalie Paisley
              </Typography>
              <Typography
                color="blue-gray"
                className="font-medium"
                textGradient
              >
                CEO / Co-Founder
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
              <Tooltip content="Like">
                <Typography
                  as="a"
                  href="#facebook"
                  variant="lead"
                  color="blue"
                  textGradient
                >
                  <i className="fab fa-facebook" />
                </Typography>
              </Tooltip>
              <Tooltip content="Follow">
                <Typography
                  as="a"
                  href="#twitter"
                  variant="lead"
                  color="light-blue"
                  textGradient
                >
                  <i className="fab fa-twitter" />
                </Typography>
              </Tooltip>
              <Tooltip content="Follow">
                <Typography
                  as="a"
                  href="#instagram"
                  variant="lead"
                  color="purple"
                  textGradient
                >
                  <i className="fab fa-instagram" />
                </Typography>
              </Tooltip>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
