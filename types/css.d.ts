// Ambient declarations for plain (non-module) stylesheet imports, e.g.
// `import "react-phone-number-input/style.css"`. Next.js only ships types for
// `*.module.css`, so side-effect CSS imports from packages/aliases are otherwise
// unresolvable to TypeScript.
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
