import { CylinderGeometry, Group, MathUtils, Mesh, MeshPhongMaterial } from "three";
import { config } from "../../config";

export function createMinute() {
  let { degToRad } = MathUtils;
  let { width, height, color } = config.minute;
  let group = new Group();
  let geometry = new CylinderGeometry(width, 0.1, height, 12);
  let material = new MeshPhongMaterial({
    color,
  });
  const element = new Mesh(geometry, material);
  element.translateY(1.25);
  //   element.translateZ(1);

  const date = new Date();
  group.rotation.z = degToRad(-(date.getMinutes() * 6));
  group.add(element);
  let radianPerSec = degToRad(-0.1);
  group.tick = (delta) => {
    group.rotation.z += radianPerSec * delta;
  };

  return group;
}
