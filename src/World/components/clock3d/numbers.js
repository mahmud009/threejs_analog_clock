import {
  Group,
  MeshPhongMaterial,
  BoxBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  MathUtils,
} from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { config } from "../../config";
import { bungeeFont } from "../fonts/bungee";
import { Font } from "three/examples/jsm/loaders/FontLoader";

export function createNumbers() {
  let { degToRad } = MathUtils;
  let { speardRadius, fontColor, boxColor } = config.numbers;
  const font = new Font(bungeeFont);
  let group = new Group();
  let material = new MeshPhongMaterial({ color: fontColor });

  for (let i = 1; i <= 60; i++) {
    if (i % 5 == 0) {
      let box = new Mesh(
        // new CylinderGeometry(0.7, 0.7, 1, 32),
        // new TetrahedronGeometry(0.7, 4),
        new BoxBufferGeometry(1, 1, 1),
        // new IcosahedronGeometry(0.7, 0),
        new MeshStandardMaterial({
          transparent: true,
          opacity: 0.1,
          color: boxColor,
          // flatShading: true,
        })
      );

      let geometry = new TextGeometry((i / 5).toString(), {
        font: font,
        size: 0.5,
        height: 0.2,
      });
      geometry.center();

      let text = new Mesh(geometry, material);
      box.position.x = Math.sin(degToRad(i * 6)) * speardRadius;
      box.position.y = Math.cos(degToRad(i * 6)) * speardRadius;
      // box.position.z = 1;
      text.rotateX(degToRad(-90));

      // box.rotateZ(-degToRad(i * 6));
      box.rotateX(degToRad(90));
      box.add(text);
      group.add(box);
    }
  }
  return group;
}
