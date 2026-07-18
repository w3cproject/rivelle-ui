export type EffectSlug =
  | "gradient-mesh"
  | "text-scramble"
  | "magnetic-button"
  | "perspective-grid"
  | "ripple-grid"
  | "shimmer-button"
  | "tilt-card"
  | "compare-slider"
  | "direction-reveal"
  | "cursor-lens"
  | "draggable-stack";

export type EffectCategory =
  "Cursor" | "Background" | "Text" | "Button" | "3D" | "Media" | "Motion";

export type EffectDoc = {
  slug: EffectSlug;
  name: string;
  category: EffectCategory;
  description: string;
  client: true;
  interaction: string;
  usage: string;
};

export const effectDocs: EffectDoc[] = [
  {
    slug: "compare-slider",
    name: "Compare Slider",
    category: "Media",
    description:
      "A controlled or uncontrolled before-and-after stage with drag, hover and keyboard interaction.",
    client: true,
    interaction: "Drag the handle or use the arrow keys",
    usage: `import { CompareSlider } from "@/components/effects/compare-slider"

export function Demo() {
  return (
    <CompareSlider
      className="h-96"
      before={<BeforeView />}
      after={<AfterView />}
      mode="drag"
    />
  )
}`,
  },
  {
    slug: "direction-reveal",
    name: "Direction Reveal",
    category: "Motion",
    description:
      "A generic reveal surface whose overlay enters and exits from the actual pointer direction.",
    client: true,
    interaction: "Enter and leave from different edges",
    usage: `import { DirectionReveal } from "@/components/effects/direction-reveal"

export function Demo() {
  return (
    <DirectionReveal reveal={<div className="p-8">Revealed content</div>}>
      <div className="p-8">Resting content</div>
    </DirectionReveal>
  )
}`,
  },
  {
    slug: "cursor-lens",
    name: "Cursor Lens",
    category: "Media",
    description:
      "A circular magnifier for arbitrary React content with configurable lens size and zoom.",
    client: true,
    interaction: "Move across the details to inspect them",
    usage: `import { CursorLens } from "@/components/effects/cursor-lens"

export function Demo() {
  return (
    <CursorLens className="h-96" size={180} zoom={1.8}>
      <YourContent />
    </CursorLens>
  )
}`,
  },
  {
    slug: "draggable-stack",
    name: "Draggable Stack",
    category: "Motion",
    description:
      "A spring-driven stack that promotes the next card after the top card is dragged past a threshold.",
    client: true,
    interaction: "Throw the top card in any direction",
    usage: `import { DraggableStack } from "@/components/effects/draggable-stack"

export function Demo() {
  return (
    <DraggableStack>
      <CardOne />
      <CardTwo />
      <CardThree />
    </DraggableStack>
  )
}`,
  },
  {
    slug: "gradient-mesh",
    name: "Cursor Gradient",
    category: "Background",
    description:
      "An animated color mesh with a luminous field that follows the pointer in real time.",
    client: true,
    interaction: "Move to bend the light field",
    usage: `import { GradientMesh } from "@/components/effects/gradient-mesh"

export function Demo() {
  return <GradientMesh className="h-[420px]" followPointer />
}`,
  },
  {
    slug: "ripple-grid",
    name: "Ripple Grid",
    category: "Cursor",
    description:
      "A field of cells that contracts and illuminates in a delayed wave around the pointer.",
    client: true,
    interaction: "Draw waves across the cell field",
    usage: `import { RippleGrid } from "@/components/effects/ripple-grid"

export function Demo() {
  return <RippleGrid columns={12} rows={8} />
}`,
  },
  {
    slug: "tilt-card",
    name: "Tilt Card",
    category: "3D",
    description:
      "A perspective wrapper with pointer-driven rotation, dimensional content and a glare layer.",
    client: true,
    interaction: "Move over the card to change its angle",
    usage: `import { TiltCard } from "@/components/effects/tilt-card"

export function Demo() {
  return <TiltCard intensity={18}>Your content</TiltCard>
}`,
  },
  {
    slug: "perspective-grid",
    name: "Perspective Grid",
    category: "3D",
    description:
      "A reactive horizon grid whose perspective tilts toward the pointer without canvas or WebGL.",
    client: true,
    interaction: "Move horizontally and vertically",
    usage: `import { PerspectiveGrid } from "@/components/effects/perspective-grid"

export function Demo() {
  return <PerspectiveGrid className="h-[420px]" />
}`,
  },
  {
    slug: "text-scramble",
    name: "Text Scramble",
    category: "Text",
    description:
      "A decoding text animation that resolves random glyphs into an accessible final message.",
    client: true,
    interaction: "Hover to replay the decode",
    usage: `import { TextScramble } from "@/components/effects/text-scramble"

export function Demo() {
  return <TextScramble text="SYSTEM ONLINE" />
}`,
  },
  {
    slug: "magnetic-button",
    name: "Magnetic Button",
    category: "Button",
    description:
      "A tactile action that leans toward pointer intent and springs precisely back into place.",
    client: true,
    interaction: "Approach from different directions",
    usage: `import { MagneticButton } from "@/components/effects/magnetic-button"

export function Demo() {
  return <MagneticButton strength={24}>Explore</MagneticButton>
}`,
  },
  {
    slug: "shimmer-button",
    name: "Shimmer Button",
    category: "Button",
    description:
      "A luminous action with a looping shimmer and a second glow that follows the pointer.",
    client: true,
    interaction: "Hover and move across the light",
    usage: `import { ShimmerButton } from "@/components/effects/shimmer-button"

export function Demo() {
  return <ShimmerButton>Launch experience</ShimmerButton>
}`,
  },
];

export const effectCategories = [
  "All",
  "Cursor",
  "Background",
  "Text",
  "Button",
  "3D",
  "Media",
  "Motion",
] as const;

export function getEffectDoc(slug: string) {
  return effectDocs.find((effect) => effect.slug === slug);
}
