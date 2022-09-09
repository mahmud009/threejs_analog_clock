import {
  CylinderGeometry,
  EdgesGeometry,
  Group,
  LineSegments,
  MathUtils,
  Mesh,
  MeshPhongMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  SphereGeometry,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { config } from "../../config";
import { cities2 } from "./cities";
import cities from "cities.json";
import { createLine } from "../helper";

export function createEarth3d() {
  const { degToRad } = MathUtils;
  const { radius, color, landColor } = config.earth;
  const group = new Group();
  let geometry = new SphereGeometry(radius, 32, 32);
  let edges = new EdgesGeometry(geometry);
  let material = new MeshPhongMaterial({ color });
  let sphere = new Mesh(geometry, material);
  group.add(sphere);

  let { sin, cos } = Math;

  let r = radius + 1;
  for (let city of cities2) {
    let lat = degToRad(city.lng);
    let lng = degToRad(city.lat);
    let x = r * sin(lat) * cos(lng);
    let y = r * cos(lat);
    let z = r * sin(lat) * sin(lng);

    let line = createLine({
      from: { x: 0, y: 0, z: 0 },
      to: { x, y, z },
      color: "orange",
    });
    group.add(line);
  }

  //let r = radius + 1;
  // for (let th = 0; th <= 360; th += 20) {
  //   for (let az = 0; az <= 360; az += 20) {
  //     let lat = degToRad(th);
  //     let lng = degToRad(az);
  //     let x = r * sin(lat) * cos(lng);
  //     let y = r * cos(lat);
  //     let z = r * sin(lat) * sin(lng);

  //     let line = createLine({
  //       from: { x: 0, y: 0, z: 0 },
  //       to: { x, y, z },
  //       color: "orange",
  //     });
  //     group.add(line);
  //   }
  // }

  group.tick = () => {};
  return group;
}
