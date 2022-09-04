import {
  DirectionalLight,
  AmbientLight,
  HemisphereLight,
  Group,
  Fog,
  Color,
  SpotLight,
} from "three";

export function createLights() {
  const group = new Group();

  const ambientLight = new HemisphereLight("white", "darkslategray");
  const mainLight = new DirectionalLight("white", 5);
  mainLight.position.set(10, 10, 10);

  group.add(ambientLight, mainLight);

  return group;
}
