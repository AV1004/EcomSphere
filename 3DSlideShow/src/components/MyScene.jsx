import React from "react";
import { Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";

export const MyScene = ({ mainColor, path, ...props }) => {
  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <Environment blur={0.8} background>
        <Sphere scale={15}>
          <meshBasicMaterial color={mainColor} side={THREE.BackSide} />
        </Sphere>
      </Environment>
    </>
  );
};
