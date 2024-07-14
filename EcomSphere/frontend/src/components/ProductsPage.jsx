import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { Products3DScene } from "./Products3DScene";
import { Overlay } from "./Overlay";
import { Leva } from "leva";

export default function ProductsPage() {
  return (
    <>
      <Leva hidden />
      <Overlay />
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
        <color attach="background" args={["#171720"]} />
        <Products3DScene />
      </Canvas>
      <div className="fixed inset-0 pointer-events-none">
        <section className={`flex w-[10%]  m-20  flex-col    duration-500`}>
          <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            <MenuHandler>
              <Button className="pointer-events-auto"> All Products</Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>Menu Item 1</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
              <MenuItem>Menu Item 3</MenuItem>
            </MenuList>
          </Menu>
        </section>
      </div>
    </>
  );
}
