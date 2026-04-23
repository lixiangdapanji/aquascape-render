/**
 * Storybook stories for the Tank glass geometry component.
 *
 * Shows the tank at 60 × 40 × 30 cm on an ink-900 (#0A1F18) background
 * with an orbiting camera powered by drei's OrbitControls.
 *
 * Run: pnpm storybook
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Tank } from "../src/scene/Tank";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: "Scene/Tank",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "ink-900",
      values: [{ name: "ink-900", value: "#0A1F18" }],
    },
  },
};

export default meta;

// ---------------------------------------------------------------------------
// Scene wrapper — provides Canvas + lights + OrbitControls
// ---------------------------------------------------------------------------

const BG = new THREE.Color(0x0a1f18);

interface TankSceneProps {
  width: number;
  height: number;
  depth: number;
}

function TankScene({ width, height, depth }: TankSceneProps) {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0A1F18" }}>
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        camera={{
          position: [0.8, 0.5, 1.2],
          fov: 35,
          near: 0.01,
          far: 20,
        }}
        onCreated={({ scene }) => {
          scene.background = BG;
        }}
      >
        {/* OrbitControls — smooth damping for Storybook exploration */}
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          minDistance={0.2}
          maxDistance={5}
          target={[0, height / 2, 0]}
        />

        {/* Lighting rig: ambient wash + key overhead + fill from front */}
        <ambientLight color={0x0f2a20} intensity={0.4} />
        <directionalLight
          color={0xede7d9}
          intensity={1.0}
          position={[0, height * 2, 0]}
        />
        <directionalLight
          color={0xa7cfba}
          intensity={0.4}
          position={[0, height * 0.6, height * 2]}
        />

        {/* Tank at the requested dimensions in metres */}
        <Tank width={width} height={height} depth={depth} />
      </Canvas>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

type Story = StoryObj<typeof TankScene>;

/** Default: 60 × 40 × 30 cm aquarium (width × height × depth in metres). */
export const Default: Story = {
  render: () => <TankScene width={0.6} height={0.4} depth={0.3} />,
};

/** Nano cube: 30 × 30 × 30 cm. */
export const NanoCube: Story = {
  render: () => <TankScene width={0.3} height={0.3} depth={0.3} />,
};

/** Long shallow scape: 90 × 20 × 35 cm — typical iwagumi format. */
export const LongShallow: Story = {
  render: () => <TankScene width={0.9} height={0.2} depth={0.35} />,
};
