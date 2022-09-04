import {
  BufferGeometry,
  Color,
  GridHelper,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  Scene,
  Vector3,
} from "three";
import { createSphere } from "./sphere";

export function createScene() {
  const scene = new Scene();
  scene.background = new Color("black");

  return scene;
}
