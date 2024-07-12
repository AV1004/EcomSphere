import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const HomePage = () => {
  return (
    <Canvas>
      {/* <color attach="background" args={["#171720"]} /> */}
      <OrbitControls />
      <fog attach={"fog"} args={["#171720", 10, 30]} />
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshBasicMaterial color={"red"} />
      </mesh>
    </Canvas>
  );
};
