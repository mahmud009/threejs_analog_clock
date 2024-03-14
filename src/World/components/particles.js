import { Group, Mesh, MeshPhongMaterial, TetrahedronGeometry } from "three";
import * as Three from "three";

export function createParticles() {
  let group = new Group();
  // let geometry = new TetrahedronGeometry(0.1, 0);
  let geometry = new Three.SphereGeometry(0.04);
  let material = new MeshPhongMaterial({
    color: "#ffffff",
  });

  for (let i = 0; i < 5000; i++) {
    let mesh = new Mesh(geometry, material);
    mesh.position.set(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    );
    mesh.position.multiplyScalar(90 + Math.random() * 700);
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    group.add(mesh);
  }
  group.position.set(0, 0, 0);

  group.tick = () => {
    group.rotation.x += 0.0;
    group.rotation.y -= 0.004;
  };
  return group;
}
