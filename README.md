# @aquascape/render

React Three Fiber scene for aquascape-studio. Draws a tank + hardscape + plants
+ water volume in the ink-green palette, with 1 draw call for the water surface
(custom ShaderMaterial, no refraction/caustics yet — phase 3).

## Entry points

```tsx
import { Aquarium } from "@aquascape/render";

<Aquarium sizeCm={[60, 30, 36]} plants={placements} hardscape={rocks} />
```

## Local dev

```bash
pnpm install
pnpm typecheck
pnpm build
```

## Owner

render-agent.
