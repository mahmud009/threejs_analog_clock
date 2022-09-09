import { CylinderGeometry, Mesh, MeshPhongMaterial, MathUtils, Group } from "three";
import { config } from "../../config";

export function createSecond() {
  let { width, height, color } = config.second;
  let { degToRad } = MathUtils;
  let group = new Group();
  let geometry = new CylinderGeometry(width, width, height);
  let material = new MeshPhongMaterial({
    color,
  });
  const element = new Mesh(geometry, material);
  element.translateY(height / 2);
  // element.translateZ(1.2);

  const date = new Date();

  group.rotation.z = degToRad(-(date.getSeconds() * 6));
  group.add(element);
  let radianPerSec = degToRad(-6);
  group.tick = (delta) => {
    group.rotation.z += radianPerSec * delta;
  };

  return group;
}
