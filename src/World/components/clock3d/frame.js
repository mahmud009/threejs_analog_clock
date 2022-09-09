import { CylinderGeometry, EdgesGeometry, LineBasicMaterial, LineSegments, MathUtils } from "three";
import { config } from "../../config";

export function createFrame() {
  let { degToRad } = MathUtils;
  let { radius, depth, radialSegments, color } = config.frame;
  let geometry = new CylinderGeometry(radius, radius, depth, radialSegments);
  let edges = new EdgesGeometry(geometry);
  let material = new LineBasicMaterial({
    color,
    transparent: true,
    opacity: 1,
  });

  let line = new LineSegments(edges, material);
  line.rotateX(degToRad(90));
  return line;
}
