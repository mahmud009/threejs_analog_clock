import { WebGLRenderer } from "three";

export function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.physicallyCorrectLights = true;
  renderer.setClearColor("#000000", 0);
  return renderer;
}
