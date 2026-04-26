# aquascape-render

**Owner**: render-agent  
**Publishes**: `@aquascape/render` → GitHub Packages  
**Stack**: Three.js r170+ / React Three Fiber / WebGL2

## Layout

```
aquascape-render/
├── src/
│   ├── index.ts
│   ├── Aquarium.tsx         # top-level scene component
│   ├── scene/               # Tank, Substrate, WaterVolume, Hardscape, Lighting
│   ├── plants/              # PlantInstance, morphologies/, growth.ts
│   ├── shaders/             # caustics.frag, water.frag, plantSway.vert, etc.
│   ├── editor/              # HardscapeEditor, PlantBrush, SaveFormat
│   └── stream/
│       └── simBridge.ts     # subscribes to sim worker, applies frames
├── stories/                 # Storybook
├── dist/
├── tsconfig.build.json
└── package.json
```

## Path note

Agent definitions reference `packages/render/` — the actual root is `aquascape-render/`. All paths relative to this directory.

## Key commands

```bash
pnpm build          # tsc via tsconfig.build.json
pnpm storybook      # visual dev
pnpm test
pnpm bench          # fps benchmark
```

## Contracts

- Consumes `SimFrame` from aquascape-sim (schema in sim's types.ts — do not mutate without orchestrator PR)
- `three` and `@react-three/fiber` are peerDependencies — never bundle them
- Exposes `<Aquarium>` component as public API; app-agent wraps it
