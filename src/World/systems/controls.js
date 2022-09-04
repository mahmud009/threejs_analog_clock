import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { degToRad } from "three/src/math/mathutils";
export function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  //   controls.dampingFactor = "5";
  controls.enableDamping = true;
  // controls.autoRotate = true;
  controls.tick = (delta) => {
    controls.update();
  };

  return controls;
}
