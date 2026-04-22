/**
 * @aquascape/render — Phase 1 scene primitives.
 *
 * Full Phase-1 public surface: palette + types, individual scene primitives
 * (Tank, Lighting, WaterVolume, Rock, Plant), and the top-level <Aquarium>
 * composition.
 */

export * from "./palette.js";
export * from "./types.js";
export { Tank } from "./scene/Tank.js";
export { Lighting } from "./scene/Lighting.js";
export { WaterVolume } from "./scene/WaterVolume.js";
export { Rock } from "./scene/Rock.js";
export { Plant } from "./scene/Plant.js";
export { Aquarium } from "./Aquarium.js";
