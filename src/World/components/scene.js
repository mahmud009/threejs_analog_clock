import * as Three from "three";
import { createSphere } from "./sphere";

export function createScene() {
  const scene = new Three.Scene();
  scene.background = new Three.Color("black");
  return scene;
}
