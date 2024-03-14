import * as Three from "three";
import { Font as ThreeFont } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry as ThreeTextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { bungeeFont } from "../fonts/bungee";
import { clockTheme, config } from "../../config";
import { createLine } from "../helper";

export function createFrame() {
  let { degToRad } = Three.MathUtils;
  let { radius, depth, radialSegments, color } = config.frame;
  let group = new Three.Group();
  let geometry = new Three.CylinderGeometry(3, 3, 0.7, radialSegments);
  let edges = new Three.EdgesGeometry(geometry);
  let material = new Three.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 1,
  });

  let line = new Three.LineSegments(edges, material);
  line.rotateX(degToRad(90));
  return line;
}

export function createHour() {
  let { degToRad } = Three.MathUtils;
  let { width, height, color } = config.hour;
  let group = new Three.Group();
  let geometry = new Three.CylinderGeometry(width, width, height);
  let material = new Three.MeshPhongMaterial({
    color: clockTheme.colors.primary,
  });
  const element = new Three.Mesh(geometry, material);
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

export function createMinute() {
  let { degToRad } = Three.MathUtils;
  let { width, height, color } = config.minute;
  let group = new Three.Group();
  let geometry = new Three.CylinderGeometry(width, width, height);
  let material = new Three.MeshPhongMaterial({
    color: clockTheme.colors.primary,
  });
  const element = new Three.Mesh(geometry, material);
  element.translateY(height / 2);
  // element.translateY(1.25);
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

export function createNumbers() {
  let { degToRad } = Three.MathUtils;
  let { speardRadius, fontColor, boxColor } = config.numbers;
  const font = new ThreeFont(bungeeFont);
  let group = new Three.Group();
  let material = new Three.MeshPhongMaterial({ color: fontColor });
  for (let i = 1; i <= 60; i++) {
    if (i % 5 == 0) {
      let box = new Three.Mesh(
        new Three.BoxBufferGeometry(1, 1, 1),
        new Three.MeshStandardMaterial({
          transparent: true,
          opacity: 0.1,
          color: boxColor,
        })
      );
      let geometry = new ThreeTextGeometry((i / 5).toString(), {
        font: font,
        size: 0.5,
        height: 0.2,
      });
      geometry.center();
      let text = new Three.Mesh(geometry, material);
      box.position.x = Math.sin(degToRad(i * 6)) * speardRadius;
      box.position.y = Math.cos(degToRad(i * 6)) * speardRadius;
      text.rotateX(degToRad(-90));
      box.rotateX(degToRad(90));
      box.add(text);
      group.add(box);
    }
  }
  return group;
}

export function createIndicators() {
  let group = new Three.Group();
  let radian = Three.MathUtils.degToRad(6);
  let geometry = new Three.CylinderGeometry(0.04, 0.04, 2);
  let material = new Three.MeshPhongMaterial({ color: "#7FFFD4" });

  for (let i = 1; i <= 60; i++) {
    let cylinder = new Three.Mesh(geometry, material);
    cylinder.position.set(Math.sin(radian) * 3.5, Math.cos(radian) * 3.5, 1, 0);
    cylinder.rotateZ(-radian);
    cylinder.rotateX(degToRad(90));
    group.add(cylinder);
    radian += degToRad(6);
  }
  return group;
}

export function createCenterLine() {
  let group = new Three.Group();
  let line = createLine({
    from: new Three.Vector3(0, 0, -10),
    to: new Three.Vector3(0, 0, 10),
    color: clockTheme.colors.primary,
  });
  group.add(line);
  return group;
}

export function createSecond() {
  let { width, height, color } = config.second;
  let { degToRad } = Three.MathUtils;
  let group = new Three.Group();
  let geometry = new Three.CylinderGeometry(0.007, 0.007, height);
  let material = new Three.LineDashedMaterial({
    color: clockTheme.colors.primary,
    linewidth: 1,
    scale: 1,
    dashSize: 3,
    gapSize: 1,
  });
  const element = new Three.Mesh(geometry, material);
  element.translateY(height / 2);
  const date = new Date();
  group.rotation.z = degToRad(-(date.getSeconds() * 6));
  group.add(element);
  let radianPerSec = degToRad(-6);
  group.tick = (delta) => {
    group.rotation.z += radianPerSec * delta;
  };
  return group;
}

export function createClock3d({ position: { x, y, z } }) {
  const group = new Three.Group();
  const frame = createFrame();
  const second = createSecond();
  const minute = createMinute();
  const hour = createHour();
  const center = createCenterLine();
  const numbers = createNumbers();
  group.add(frame, second, minute, hour, numbers);
  group.position.set(x, y, z);

  let clock = new Three.Clock();
  group.tick = () => {
    const delta = clock.getDelta();
    for (let child of group.children) {
      child.tick && child.tick(delta);
    }
  };
  return group;
}
