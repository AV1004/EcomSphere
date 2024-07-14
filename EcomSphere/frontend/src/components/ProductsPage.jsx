import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Scroll } from "@react-three/drei";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export default function ProductsPage() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Canvas shadows camera={{ position: [0, 2.5, 8.5], fov: 42 }}>
        <OrbitControls />
        <color attach={"background"} args={["#171720"]} />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color={"red"} transparent opacity={0.5} />
        </mesh>
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
              <Button> All Products</Button>
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
