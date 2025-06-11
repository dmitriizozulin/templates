

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BbL6jpOP.js","_app/immutable/chunks/xti9a0Lr.js","_app/immutable/chunks/BpRoCxXF.js"];
export const stylesheets = [];
export const fonts = [];
