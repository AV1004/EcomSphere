import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function ProductsPage() {
  return (
    <Canvas shadows camera={{ position: [0, 2.5, 8.5], fov: 42 }}>
      <OrbitControls />
      <color attach={"background"} args={["#171720"]} />
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color={"red"} transparent opacity={0.5} />
      </mesh>
    </Canvas>
  );
}
