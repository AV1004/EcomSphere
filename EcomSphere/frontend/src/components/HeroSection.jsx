import {
  CameraControls,
  Environment,
  Float,
  MeshReflectorMaterial,
  RenderTexture,
  Text,
  useFont,
} from "@react-three/drei";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import { useEffect, useRef } from "react";
import { Color } from "three";
import { useAtom } from "jotai";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { currentPageAtom } from "./UI";
import { HomeModel } from "./HomeModel";

const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.5);

export const HeroSection = ({ isAuthenticated }) => {
  const controls = useRef();
  const meshFitCameraHome = useRef();
  const meshFitCameraStore = useRef();
  const textMaterial = useRef();

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  useFrame((_, delta) => {
    textMaterial.current.opacity = lerp(
      textMaterial.current.opacity,
      currentPage === "home" ? 1 : 0,
      delta * 1.5
    );
  });

  const intro = () => {
    controls.current.dolly(-22);
    controls.current.smoothTime = 1.6;
    fitCamera();
  };

  const fitCamera = async () => {
    if (currentPage === "store") {
      controls.current.fitToBox(meshFitCameraStore.current, true);
      controls.current.smoothTime = 0.8;
    } else {
      controls.current.smoothTime = 1.6;
      controls.current.fitToBox(meshFitCameraHome.current, true);
    }
  };

  useEffect(() => {
    intro();
    setTimeout(() => {
      setCurrentPage("home");
    }, 1200);
  }, []);

  useEffect(() => {
    fitCamera();
    window.addEventListener("resize", fitCamera);
    return () => window.removeEventListener("resize", fitCamera);
  }, [currentPage]);

  return (
    <>
      <CameraControls ref={controls} enabled={true} />
      <mesh ref={meshFitCameraHome} position-z={1.5} visible={false}>
        <boxGeometry args={[9.5, 2, 2]} />
        <meshBasicMaterial color={"orange"} transparent opacity={0.5} />
      </mesh>
      <motion.group
        animate={{
          rotateY: currentPage === "home" ? degToRad(30) : 0,
        }}
        transition={{
          duration: 1,
        }}
        position-x={-1.3}
        position-y={-0.5}
        position-z={1}
        // rotation-y={degToRad(30)}
      >
        <Text
          font={"fonts/Poppins-Black.ttf"}
          lineHeight={0.8}
          textAlign="center"
          anchorY={"bottom"}
        >
          WELCOME TO{"\n"}ECOMSPHERE
          <meshBasicMaterial
            color={bloomColor}
            toneMapped={false}
            ref={textMaterial}
          >
            <RenderTexture attach={"map"}>
              <color attach={"background"} args={["#fff"]} />
              <Environment preset="sunset" />
              {/* <ambientLight /> */}
              <Float floatIntensity={4} rotationIntensity={5}>
                <HomeModel
                  scale={2}
                  rotation-y={-degToRad(25)}
                  rotation-x={degToRad(40)}
                  position-y={-2}
                />
              </Float>
            </RenderTexture>
          </meshBasicMaterial>
        </Text>
      </motion.group>
      <motion.group
        animate={{
          rotateY: currentPage === "home" ? degToRad(-25) : 0,
        }}
        transition={{
          duration: 1,
        }}
        // rotation-y={}
        position-x={4.5}
        position-z={-1}
        position-y={-1.1}
      >
        <HomeModel scale={1.3} html isAuthenticated={isAuthenticated} />
        <mesh
          ref={meshFitCameraStore}
          position-x={-1}
          position-y={1.3}
          position-z={-2.3}
          visible={false}
        >
          <boxGeometry args={[5, 1, 2]} />
          <meshBasicMaterial color={"red"} transparent opacity={0.5} />
        </mesh>
      </motion.group>
      <mesh position-y={-0.48} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={1}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
        />
      </mesh>
      <Environment preset="sunset" />
    </>
  );
};

useFont.preload("fonts/Poppins-Black.ttf");
