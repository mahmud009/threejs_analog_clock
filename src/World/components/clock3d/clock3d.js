import { Group, Clock } from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { bungeeFont } from "../fonts/bungee";
import { createFrame } from "./frame";
import { createSecond } from "./second";
import { createMinute } from "./minute";
import { createHour } from "./hour";
import { createNumbers } from "./numbers";
import { createCenter } from "./center";

export function createClock3d() {
  const group = new Group();
  const frame = createFrame();
  const second = createSecond();
  const minute = createMinute();
  const hour = createHour();
  const center = createCenter();
  const numbers = createNumbers();
  group.add(frame, second, minute, hour, center, numbers);

  let clock = new Clock();
  group.tick = () => {
    const delta = clock.getDelta();
    for (let child of group.children) {
      child.tick && child.tick(delta);
    }
  };
  return group;
}
