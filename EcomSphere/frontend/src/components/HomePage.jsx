import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import React, { Suspense } from "react";
import { UI } from "./UI";
import { HeroSection } from "./HeroSection";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

export const HomePage = () => {
  const isAuthenticated = useIsAuthenticated();
  const isMoblie = window.innerWidth < 768;
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: isMoblie ? undefined : 42 }}
      >
        <color attach={"background"} args={["#171720"]} />
        <fog attach={"fog"} args={["#171720", 10, 30]} />
        <Suspense>
          <HeroSection isAuthenticated={isAuthenticated} />
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={1} />
        </EffectComposer>
      </Canvas>
      <UI />
    </>
  );
};
