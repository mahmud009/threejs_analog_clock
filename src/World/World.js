import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createCube } from "./components/cube";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { createLights } from "./components/lights";
import {
  BoxBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  GridHelper,
  Euler,
  SphereBufferGeometry,
  Group,
  DirectionalLightHelper,
} from "three";
import { degToRad } from "three/src/math/mathutils";
import { Loop } from "./systems/Loop";
import { createControls } from "./systems/controls";
import { createSphere } from "./components/sphere";
import { createMeshGroup } from "./components/meshGroup";
import { createAxesHelper, createGridHelper } from "./components/helper";
import { createClock3d } from "./components/clock";
import { createWorld3d } from "./components/world3d";

export class World {
  constructor(container) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    container.append(this.renderer.domElement);

    const controls = createControls(this.camera, this.renderer.domElement);
    controls.addEventListener("change", () => {
      this.render();
    });

    const lights = createLights();
    // const meshGroup = createMeshGroup();
    // const world3d = createWorld3d();
    const clock3d = createClock3d();
    this.scene.add(clock3d);

    this.scene.add(lights);
    this.loop.updatables.push(controls, clock3d);

    new Resizer(container, this.camera, this.renderer);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}
