import { PerspectiveCamera } from "three";
import { degToRad } from "three/src/math/mathutils";

export function createCamera() {
  const camera = new PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 100);
  camera.position.set(-20, 0, 40);

  return camera;
}
