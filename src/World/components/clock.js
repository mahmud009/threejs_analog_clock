import {
  BoxBufferGeometry,
  Group,
  Mesh,
  MeshPhongMaterial,
  MeshStandardMaterial,
  TetrahedronGeometry,
  EdgesGeometry,
  BufferGeometry,
  AmbientLight,
  DirectionalLight,
  MeshBasicMaterial,
  Clock,
  Vector3,
  CylinderGeometry,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshToonMaterial,
  MeshPhysicalMaterial,
  MeshMatcapMaterial,
  ConeGeometry,
  TubeGeometry,
  BoxGeometry,
  LineBasicMaterial,
  LineSegments,
  Line,
  SphereGeometry,
  Object3D,
  IcosahedronGeometry,
  MathUtils,
} from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import "three/examples/fonts/droid/droid_sans_regular.typeface.json";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
let { degToRad } = MathUtils;

let config = {
  frame: {
    radius: 5.5,
    depth: 2,
    radialSegments: 24,
    color: "#00FF7F",
  },

  numbers: {
    speardRadius: 4.5,
    fontColor: "#00FF7F",
    boxColor: "#00FF7F",
  },
};

function createBox() {
  let { radius, depth, radialSegments, color } = config.frame;
  let geometry = new CylinderGeometry(radius, radius, depth, radialSegments);
  // let geometry = new BoxBufferGeometry(width, height, depth);
  let edges = new EdgesGeometry(geometry);
  let material = new LineBasicMaterial({
    color,
    transparent: true,
    opacity: 1,
    flatShading: true,
  });

  let line = new LineSegments(edges, material);
  // let line = new Mesh(geometry, material);
  line.rotateX(degToRad(90));
  // line.translateZ(1);
  line.tick = () => {};
  return line;
}

function createIndicators() {
  let group = new Group();
  let radian = degToRad(6);
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
  group.tick = () => {};
  return group;
}

function createSecond() {
  let group = new Group();
  let geometry = new CylinderGeometry(0.02, 0.02, 3);
  let material = new MeshPhongMaterial({
    color: "#00FA9A",
  });
  const element = new Mesh(geometry, material);
  element.translateY(1.5);
  element.translateZ(1.2);

  const date = new Date();

  group.rotation.z = degToRad(-(date.getSeconds() * 6));
  group.add(element);
  let radianPerSec = degToRad(-6);
  group.tick = (delta) => {
    group.rotation.z += radianPerSec * delta;
  };

  return group;
}

function createMinute() {
  let group = new Group();
  let geometry = new CylinderGeometry(0.02, 0.1, 2.5, 12);
  let material = new MeshPhongMaterial({
    color: "#DC143C",
  });
  const element = new Mesh(geometry, material);
  element.translateY(1.25);
  element.translateZ(1);

  const date = new Date();
  group.rotation.z = degToRad(-(date.getMinutes() * 6));
  group.add(element);
  let radianPerSec = degToRad(-0.1);
  group.tick = (delta) => {
    group.rotation.z += radianPerSec * delta;
  };

  return group;
}

function createHour() {
  let group = new Group();
  let geometry = new CylinderGeometry(0.02, 0.1, 1.8, 12);
  let material = new MeshPhongMaterial({
    color: "#FF6347",
  });
  const element = new Mesh(geometry, material);
  element.translateY(0.9);
  element.translateZ(0.8);

  const date = new Date();
  const hours = date.getHours() + date.getMinutes() / 60;
  console.log(hours);
  group.rotation.z = degToRad(-(hours * 30));

  group.add(element);
  let radianPerSec = degToRad(-(0.1 / 60));
  group.tick = (delta) => {
    group.rotation.z += radianPerSec * delta;
  };

  return group;
}

function createNumbers(font) {
  let group = new Group();

  let { speardRadius, fontColor, boxColor } = config.numbers;
  let material = new MeshPhongMaterial({ color: fontColor });

  for (let i = 1; i <= 60; i++) {
    if (i % 5 == 0) {
      let box = new Mesh(
        // new CylinderGeometry(0.7, 0.7, 1, 32),
        // new TetrahedronGeometry(0.7, 4),
        // new BoxBufferGeometry(1, 1, 1),
        new IcosahedronGeometry(0.7, 0),
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

  group.tick = () => {};
  return group;
}

function createCenterSphere() {
  let group = new Group();

  let sphere = new Mesh(
    new CylinderGeometry(0.2, 0.2, 1, 32),
    new MeshPhongMaterial({ color: "#DCDCDC" })
  );
  sphere.rotation.x = degToRad(90);
  sphere.position.set(0, 0, 1);
  group.add(sphere);

  let box = new Mesh(
    new BoxBufferGeometry(0.6, 0.6, 1.2),
    new MeshPhongMaterial({
      color: "#00FF7F",
      transparent: true,
      opacity: 0.1,
    })
  );
  box.position.set(0, 0, 1);
  group.add(box);

  group.tick = () => {};
  return group;
}

function createParticles() {
  let group = new Group();
  let geometry = new TetrahedronGeometry(0.1, 0);
  let material = new MeshPhongMaterial({
    color: "#00FF7F",
    // flatShading: true,
  });

  for (let i = 0; i < 5000; i++) {
    let mesh = new Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
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

export function createClock3d() {
  let loader = new FontLoader();
  const group = new Group();
  const box = createBox();
  // const indicators = createIndicators();
  const second = createSecond();
  const minute = createMinute();
  const hour = createHour();
  const centerSphere = createCenterSphere();
  const particles = createParticles();
  loader.load("assets/fonts/Bungee_regular.json", (font) => {
    let numbers = createNumbers(font);
    group.add(numbers);
  });

  group.add(box, second, minute, hour, centerSphere, particles);

  let clock = new Clock();
  group.tick = () => {
    const delta = clock.getDelta();
    for (let child of group.children) {
      child.tick(delta);
    }
  };
  return group;
}
