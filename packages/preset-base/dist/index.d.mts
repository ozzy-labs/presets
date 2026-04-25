//#region src/types.d.ts
interface Preset {
  name: string;
  files: Record<string, string>;
  merge: Record<string, unknown>;
  requires?: string[];
}
//#endregion
//#region src/index.d.ts
declare const presetBase: Preset;
//#endregion
export { type Preset, presetBase as default };