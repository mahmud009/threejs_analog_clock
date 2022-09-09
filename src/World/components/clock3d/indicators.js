import { CylinderGeometry, Group, MathUtils, Mesh, MeshPhongMaterial } from "three";

export function createIndicators() {
  let group = new Group();
  let radian = MathUtils.degToRad(6);
  let geometry = new CylinderGeometry(0.04, 0.04, 2);
  let material = new MeshPhongMaterial({ color: "#7FFFD4" });

  for (let i = 1; i <= 60; i++) {
    let cylinder = new Mesh(geometry, material);
    cylinder.position.set(Math.sin(radian) * 3.5, Math.cos(radian) * 3.5, 1, 0);
    cylinder.rotateZ(-radian);
    cylinder.rotateX(degToRad(90));
    group.add(cylinder);
    radian += degToRad(6);
  }
  return group;
}
