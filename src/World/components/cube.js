import {
  BoxBufferGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  TextureLoader,
} from "three";
import { degToRad } from "three/src/math/mathutils";

function createMaterial() {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load("../../assets/textures/mars.jpg");
  const material = new MeshStandardMaterial({
    map: texture,
    // color: "green",
  });

  return material;
}

export function createCube() {
  const geometry = new BoxBufferGeometry(1, 1, 1);
  const material = createMaterial();
  const cube = new Mesh(geometry, material);
  cube.rotation.set(degToRad(45), degToRad(45), degToRad(0));
  const radiansPerSecond = degToRad(30);

  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
    cube.rotation.z += radiansPerSecond * delta;
  };

  return cube;
}
