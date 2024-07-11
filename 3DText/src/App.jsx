import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
      <color attach="background" args={["#171720"]} />
      <fog attach={"fog"} args={["#171720", 10, 30]} />
      <Experience />
      <EffectComposer>
        <Bloom mipmapBlur intensity={1} />
      </EffectComposer>
    </Canvas>
  );
}

export default App;
