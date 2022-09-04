import { Group, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";

export function createWorld3d() {
  const group = new Group();

  let geometry = new RoundedBoxGeometry(20, 1, 20, 32, 0.25);
  let material = new MeshStandardMaterial({ color: "#00FA9A" });
  let plane = new Mesh(geometry, material);
  group.add(plane);
  return group;
}
