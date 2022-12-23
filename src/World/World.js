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
  AxesHelper,
} from "three";
import { Loop } from "./systems/Loop";
import { createControls } from "./systems/controls";
import { createSphere } from "./components/sphere";
import { createMeshGroup } from "./components/meshGroup";
import { createAxesHelper, createGridHelper } from "./components/helper";
import { createClock3d } from "./components/clock3d/clock3d";
import { createEarth3d } from "./components/earth3d/earth3d";
import { createParticles } from "./components/particles";

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
    const earth3d = createEarth3d();
    // const clock3d = createClock3d({ position: { x: 0, y: 0, z: 0 } });
    const particles = createParticles();
    const gridHelper = createAxesHelper();
    this.scene.add(lights, particles, earth3d, gridHelper);
    this.loop.updatables.push(controls, earth3d, particles);
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
