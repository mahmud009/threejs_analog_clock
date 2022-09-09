import { CylinderGeometry, Group, MathUtils, Mesh, MeshPhongMaterial } from "three";
import { config } from "../../config";

export function createHour() {
  let { degToRad } = MathUtils;
  let { width, height, color } = config.hour;
  let group = new Group();
  let geometry = new CylinderGeometry(width, 0.1, height, 12);
  let material = new MeshPhongMaterial({
    color,
  });
  const element = new Mesh(geometry, material);
  element.translateY(0.9);
  //   element.translateZ(0.8);

  const date = new Date();
  const hours = date.getHours() + date.getMinutes() / 60;
  group.rotation.z = degToRad(-(hours * 30));
  group.add(element);
  let radianPerSec = degToRad(-(0.1 / 60));
  group.tick = (delta) => {
    group.rotation.z += radianPerSec * delta;
  };

  return group;
}
