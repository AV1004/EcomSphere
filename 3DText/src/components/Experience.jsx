import {
  CameraControls,
  Environment,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  RenderTexture,
  Text,
} from "@react-three/drei";
import { HomeModel } from "./HomeModel";
import { degToRad } from "three/src/math/MathUtils.js";
import { useEffect, useRef } from "react";
import { Color } from "three";

const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.5);

export const Experience = () => {
  const controls = useRef();

  const intro = () => {
    controls.current.dolly(-22);
    controls.current.smoothTime = 1.6;
    controls.current.dolly(22, true);
  };

  useEffect(() => {
    intro();
  });
  return (
    <>
      <CameraControls ref={controls} />
      <Text
        font={"fonts/Poppins-Black.ttf"}
        position-x={-1.3}
        position-y={-0.5}
        position-z={1}
        lineHeight={0.8}
        textAlign="center"
        rotation-y={degToRad(30)}
        anchorY={"bottom"}
      >
        WELCOME TO{"\n"}ECOMSPHERE
        <meshBasicMaterial color={bloomColor} toneMapped={false}>
          <RenderTexture attach={"map"}>
            <color attach={"background"} args={["#fff"]} />
            {/* <Environment preset="sunset" /> */}
            <ambientLight />
            <Float floatIntensity={4} rotationIntensity={5}>
              <HomeModel
                scale={2}
                rotation-y={-degToRad(25)}
                rotation-x={degToRad(40)}
                position-y={-0.5}
              />
            </Float>
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
      <group
        rotation-y={degToRad(-25)}
        position-x={4.5}
        position-z={-1}
        position-y={-0.5}
      >
        <HomeModel scale={1.2} />
      </group>
      <mesh position-y={-0.48} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
        />
      </mesh>
      <Environment preset="sunset" />
      <ambientLight />
    </>
  );
};
