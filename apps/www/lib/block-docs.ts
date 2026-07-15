export type BlockSlug =
  | "login-01"
  | "signup-01"
  | "dashboard-shell-01"
  | "sidebar-01"
  | "settings-01"
  | "empty-project-01"
  | "hero-01"
  | "pricing-01";

export type BlockDoc = {
  slug: BlockSlug;
  name: string;
  category: "Authentication" | "Application" | "Marketing";
  description: string;
};

export const blockDocs: BlockDoc[] = [
  {
    slug: "login-01",
    name: "Login",
    category: "Authentication",
    description: "Split-screen sign-in with social authentication.",
  },
  {
    slug: "signup-01",
    name: "Sign Up",
    category: "Authentication",
    description: "Account creation paired with a concise product pitch.",
  },
  {
    slug: "dashboard-shell-01",
    name: "Dashboard Shell",
    category: "Application",
    description:
      "Responsive shell with navigation, metrics and recent projects.",
  },
  {
    slug: "sidebar-01",
    name: "Sidebar Navigation",
    category: "Application",
    description:
      "Workspace navigation with search, usage and account controls.",
  },
  {
    slug: "settings-01",
    name: "Settings Form",
    category: "Application",
    description: "Account profile and notification preferences.",
  },
  {
    slug: "empty-project-01",
    name: "Empty Project State",
    category: "Application",
    description: "A refined first-run experience for a new workspace.",
  },
  {
    slug: "hero-01",
    name: "Hero",
    category: "Marketing",
    description:
      "Product navigation, atmospheric hero and focused calls to action.",
  },
  {
    slug: "pricing-01",
    name: "Pricing",
    category: "Marketing",
    description: "Three responsive tiers with a highlighted plan.",
  },
];

export function getBlockDoc(slug: string) {
  return blockDocs.find((block) => block.slug === slug);
}
