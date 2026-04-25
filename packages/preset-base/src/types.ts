// Shape of an external preset consumed by create-agentic-app.
// Mirrors the structural contract enforced by CAA's loader (CAA src/loader.ts).
//
// `files` maps target paths to literal text contents that the generator writes
// verbatim. `merge` maps target paths to deep-merge instructions applied on top
// of files produced by other presets.
export interface Preset {
  name: string;
  files: Record<string, string>;
  merge: Record<string, unknown>;
  requires?: string[];
}
