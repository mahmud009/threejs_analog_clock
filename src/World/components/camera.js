import { PerspectiveCamera } from "three";

export function createCamera() {
  const camera = new PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 100);
  camera.position.set(-20, 0, 40);

  return camera;
}
