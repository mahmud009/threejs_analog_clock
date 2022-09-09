import { CylinderGeometry, Group, MathUtils, Mesh, MeshPhongMaterial } from "three";
import { config } from "../../config";

export function createCenter() {
  let { color, width, height } = config.center;
  let group = new Group();

  let cylinder = new Mesh(
    new CylinderGeometry(0.01, width, height, 32),
    new MeshPhongMaterial({ color })
  );
  cylinder.rotation.x = MathUtils.degToRad(90);
  //   cylinder.position.set(0, 0, 1);
  group.add(cylinder);

  return group;
}
