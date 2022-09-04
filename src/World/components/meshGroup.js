import {
  BoxBufferGeometry,
  BoxGeometry,
  BufferGeometry,
  CylinderBufferGeometry,
  Group,
  Line,
  LineBasicMaterial,
  LineDashedMaterial,
  MathUtils,
  Mesh,
  MeshDepthMaterial,
  MeshStandardMaterial,
  RingBufferGeometry,
  SphereBufferGeometry,
  TextureLoader,
  Vector3,
  Path,
} from "three";
import { degToRad } from "three/src/math/mathutils";

export function createMeshGroup() {
  const group = new Group();

  // const geometry = new SphereBufferGeometry(1.5, 32, 32);
  // const textureLoader = new TextureLoader();
  // const texture = textureLoader.load("../../assets/textures/mars.jpg");
  // const material = new MeshStandardMaterial({ map: texture });
  // const protoSphere = new Mesh(geometry, material);
  // protoSphere.position.y = 2;

  let cubeGeometry = new SphereBufferGeometry(0.1);
  let cubeMaterial = new MeshStandardMaterial({ color: "indigo" });

  let points = [];
  for (let i = 0; i <= 1440; i++) {
    let x = i * 0.0055;
    let y = Math.cos(degToRad(i));
    let z = Math.sin(degToRad(i));
    points.push(new Vector3(x, y, z));
  }

  const geometry = new BufferGeometry().setFromPoints(points);
  const line = new Line(geometry, new LineBasicMaterial({ color: "orange" }));
  group.add(line);

  let radiansPerSecond = degToRad(2);

  let x = 0;
  group.tick = (delta) => {
    // x += 0.0055;
    // radiansPerSecond += degToRad(1);
    // let y = Math.cos(radiansPerSecond);
    // let z = Math.sin(radiansPerSecond);
    // let cube = new Mesh(cubeGeometry, cubeMaterial);
    // cube.position.set(x, y, z);
    // group.add(cube);
    // group.rotation.y -= delta * radiansPerSecond;
  };

  return group;
}
