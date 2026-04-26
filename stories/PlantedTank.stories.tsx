/**
 * Storybook stories for PlantedTank — a Tank with PlantSimple instances.
 *
 * Run: pnpm storybook
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { PlantedTank } from "../src/scene/PlantedTank";
import type { PlantEntry } from "../src/scene/PlantedTank";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: "Scene/PlantedTank",
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
// Scene wrapper
// ---------------------------------------------------------------------------

const BG = new THREE.Color(0x0a1f18);

/** Substrate top in metres (matches Tank.tsx 3 cm slab). */
const SUB_Y = 0.03;

interface PlantedTankSceneProps {
  width: number;
  height: number;
  depth: number;
  plants: PlantEntry[];
}

function PlantedTankScene({ width, height, depth, plants }: PlantedTankSceneProps) {
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
          position: [width * 1.3, height * 1.6, depth + width * 0.9],
          fov: 35,
          near: 0.01,
          far: 20,
        }}
        onCreated={({ scene }) => {
          scene.background = BG;
        }}
      >
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          minDistance={0.15}
          maxDistance={6}
          target={[0, height / 2, 0]}
        />

        {/* Lighting rig identical to Tank.stories.tsx */}
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

        <PlantedTank
          width={width}
          height={height}
          depth={depth}
          plants={plants}
        />
      </Canvas>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

type Story = StoryObj<typeof PlantedTankScene>;

/**
 * Standard60: 60 × 40 × 30 cm tank with 6 stem plants in a Dutch-style row
 * arrangement — tall background plants tapering to shorter foreground.
 */
export const Standard60: Story = {
  render: () => {
    const w = 0.6;
    const d = 0.3;

    const plants: PlantEntry[] = [
      // Back row — taller, spaced across the width
      { position: [-0.22, SUB_Y, -0.08], height: 0.28, color: "#2f6e55" },
      { position: [-0.08, SUB_Y, -0.10], height: 0.32, color: "#4e8c72" },
      { position: [0.07,  SUB_Y, -0.09], height: 0.30, color: "#2f6e55" },
      // Mid row — medium height
      { position: [0.18,  SUB_Y, -0.02], height: 0.20, color: "#6fae8e" },
      // Front row — shorter accent plants
      { position: [-0.18, SUB_Y,  0.05], height: 0.14, color: "#4e8c72" },
      { position: [0.00,  SUB_Y,  0.06], height: 0.12, color: "#6fae8e" },
    ];

    return (
      <PlantedTankScene
        width={w}
        height={0.4}
        depth={d}
        plants={plants}
      />
    );
  },
};

/**
 * NanoCube: 30 × 30 × 30 cm cube with 5 plants clustered toward the back.
 */
export const NanoCube: Story = {
  render: () => {
    const plants: PlantEntry[] = [
      { position: [-0.09, SUB_Y, -0.08], height: 0.22, color: "#2f6e55" },
      { position: [0.00,  SUB_Y, -0.09], height: 0.25, color: "#4e8c72" },
      { position: [0.09,  SUB_Y, -0.07], height: 0.20, color: "#2f6e55" },
      { position: [-0.05, SUB_Y, -0.01], height: 0.15, color: "#6fae8e" },
      { position: [0.05,  SUB_Y,  0.00], height: 0.12, color: "#4e8c72" },
    ];
    return (
      <PlantedTankScene
        width={0.3}
        height={0.3}
        depth={0.3}
        plants={plants}
      />
    );
  },
};
